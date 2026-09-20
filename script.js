// ABU SHUJAA PHARMACY — site behaviour
// Reads the PRODUCTS array from products.js and renders the catalog,
// with search + category filtering, a shopping cart, a combined
// WhatsApp checkout message, and multi-language support (EN/AR/UR/BN).

const WHATSAPP_NUMBER = "966571208336"; // international format, no + or spaces
const CART_KEY = "abu-shujaa-cart";
const LANG_KEY = "abu-shujaa-lang";
const RTL_LANGS = ["ar", "ur"];

let currentLang = localStorage.getItem(LANG_KEY) || "en";

function t(key) {
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  return dict[key] || TRANSLATIONS.en[key] || key;
}

function tFormat(key, vars) {
  let str = t(key);
  Object.entries(vars).forEach(([k, v]) => {
    str = str.replace(`{${k}}`, v);
  });
  return str;
}

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatPrice(n) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function discountedPrice(product) {
  if (!product.discount) return product.price;
  return +(product.price * (1 - product.discount / 100)).toFixed(2);
}

function findProduct(name) {
  return PRODUCTS.find((p) => p.name === name);
}

/* ============================================================
   LANGUAGE SWITCHING
   ============================================================ */

function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  document.getElementById("lang-switch").value = lang;

  applyStaticTranslations();
  renderCatalog(currentResults, { reset: false });
  renderCart();
  renderArticles();
}

function initLanguage() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = RTL_LANGS.includes(currentLang) ? "rtl" : "ltr";
  document.getElementById("lang-switch").value = currentLang;
  applyStaticTranslations();

  document.getElementById("lang-switch").addEventListener("change", (e) => {
    setLanguage(e.target.value);
  });
}

/* ============================================================
   CART STATE (persisted in localStorage so it survives a refresh)
   Shape: { "Product Name": quantity, ... }
   ============================================================ */

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(name) {
  const cart = getCart();
  cart[name] = (cart[name] || 0) + 1;
  saveCart(cart);
  renderCart();
  pulseCartBadge();
}

function changeQty(name, delta) {
  const cart = getCart();
  if (!cart[name]) return;
  cart[name] += delta;
  if (cart[name] <= 0) delete cart[name];
  saveCart(cart);
  renderCart();
}

function removeFromCart(name) {
  const cart = getCart();
  delete cart[name];
  saveCart(cart);
  renderCart();
}

function cartCount(cart) {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

function cartTotal(cart) {
  return Object.entries(cart).reduce((sum, [name, qty]) => {
    const product = findProduct(name);
    if (!product) return sum;
    return sum + discountedPrice(product) * qty;
  }, 0);
}

function pulseCartBadge() {
  const badge = document.getElementById("cart-count");
  badge.classList.remove("pulse");
  void badge.offsetWidth; // restart animation
  badge.classList.add("pulse");
}

/* ============================================================
   PRODUCT CARDS
   ============================================================ */

const PAGE_SIZE = 30;
let currentResults = PRODUCTS;
let visibleCount = PAGE_SIZE;

function productCard(product) {
  const finalPrice = discountedPrice(product);
  const hasDiscount = product.discount > 0;

  const priceHTML = hasDiscount
    ? `<span class="price-now">${formatPrice(finalPrice)} SAR</span>
       <span class="price-was">${formatPrice(product.price)} SAR</span>
       <span class="discount-tag">-${product.discount}%</span>`
    : `<span class="price-now">${formatPrice(product.price)} SAR</span>`;

  const rxBadge = product.rx
    ? `<span class="rx-badge">${t("rx_badge")}</span>`
    : "";

  const infoHTML = product.info ? `<p class="info">${product.info}</p>` : "";

  const mediaHTML = product.image
    ? `<div class="product-media"><img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.closest('.product-media').classList.add('media-fallback'); this.remove();" /></div>`
    : `<div class="product-media media-fallback"></div>`;

  return `
    <article class="product-card" data-category="${product.category}" data-name="${product.name.toLowerCase()}">
      ${mediaHTML}
      <div class="product-top">
        <span class="product-category">${product.category}</span>
        ${rxBadge}
      </div>
      <h3>${product.name}</h3>
      ${infoHTML}
      <div class="price-row">${priceHTML}</div>
      <button class="btn btn-secondary btn-small" data-add-to-cart="${product.name}">
        ${t("add_to_cart")}
      </button>
    </article>
  `;
}

function renderCatalog(products, { reset = true } = {}) {
  const grid = document.getElementById("product-grid");
  const empty = document.getElementById("empty-state");
  const loadMoreWrap = document.getElementById("load-more-wrap");
  const resultsCount = document.getElementById("results-count");

  currentResults = products;
  if (reset) visibleCount = PAGE_SIZE;

  if (!products.length) {
    grid.innerHTML = "";
    empty.style.display = "block";
    loadMoreWrap.style.display = "none";
    return;
  }
  empty.style.display = "none";

  const slice = products.slice(0, visibleCount);
  grid.innerHTML = slice.map(productCard).join("");

  grid.querySelectorAll("[data-add-to-cart]").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(btn.dataset.addToCart));
  });

  const remaining = products.length - slice.length;
  if (remaining > 0) {
    loadMoreWrap.style.display = "block";
    document.getElementById("load-more").style.display = "inline-flex";
    resultsCount.textContent = tFormat("showing_partial", { shown: slice.length, total: products.length });
  } else if (products.length > PAGE_SIZE) {
    loadMoreWrap.style.display = "block";
    document.getElementById("load-more").style.display = "none";
    resultsCount.textContent = tFormat("showing_all", { total: products.length });
  } else {
    loadMoreWrap.style.display = "none";
  }
}

function applyFilters() {
  const query = document.getElementById("search-input").value.trim().toLowerCase();
  const activePill = document.querySelector(".filter-pill.active");
  const category = activePill ? activePill.dataset.category : "All";

  const filtered = PRODUCTS.filter((p) => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesQuery = !query || p.name.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  renderCatalog(filtered, { reset: true });
}

function initCatalog() {
  renderCatalog(PRODUCTS, { reset: true });

  document.getElementById("search-input").addEventListener("input", applyFilters);

  document.getElementById("load-more").addEventListener("click", () => {
    visibleCount += PAGE_SIZE;
    renderCatalog(currentResults, { reset: false });
  });

  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      applyFilters();
    });
  });
}

/* ============================================================
   CART DRAWER
   ============================================================ */

function cartRow(name, qty) {
  const product = findProduct(name);
  if (!product) return "";
  const lineTotal = discountedPrice(product) * qty;

  return `
    <div class="cart-row">
      <div class="cart-row-main">
        <strong>${product.name}</strong>
        ${product.rx ? `<span class="rx-badge">${t("rx_badge")}</span>` : ""}
        <span class="cart-row-price">${formatPrice(discountedPrice(product))} SAR ${t("each_suffix")}</span>
      </div>
      <div class="cart-row-controls">
        <div class="qty-stepper">
          <button data-qty-decrease="${name}" aria-label="Decrease quantity">–</button>
          <span>${qty}</span>
          <button data-qty-increase="${name}" aria-label="Increase quantity">+</button>
        </div>
        <span class="cart-row-total">${formatPrice(lineTotal)} SAR</span>
        <button class="cart-remove" data-remove="${name}" aria-label="Remove ${product.name}">✕</button>
      </div>
    </div>
  `;
}

function renderCart() {
  const cart = getCart();
  const names = Object.keys(cart);
  const count = cartCount(cart);
  const total = cartTotal(cart);

  document.getElementById("cart-count").textContent = count;
  document.getElementById("cart-count").style.display = count > 0 ? "flex" : "none";

  const body = document.getElementById("cart-body");
  const footer = document.getElementById("cart-footer");

  if (!names.length) {
    body.innerHTML = `<p class="cart-empty">${t("cart_empty")}</p>`;
    footer.style.display = "none";
    return;
  }

  footer.style.display = "block";
  body.innerHTML = names.map((name) => cartRow(name, cart[name])).join("");
  document.getElementById("cart-total").textContent = `${formatPrice(total)} SAR`;

  body.querySelectorAll("[data-qty-increase]").forEach((btn) => {
    btn.addEventListener("click", () => changeQty(btn.dataset.qtyIncrease, 1));
  });
  body.querySelectorAll("[data-qty-decrease]").forEach((btn) => {
    btn.addEventListener("click", () => changeQty(btn.dataset.qtyDecrease, -1));
  });
  body.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.remove));
  });
}

function buildCheckoutMessage() {
  const cart = getCart();
  const names = Object.keys(cart);
  if (!names.length) return "";

  const lines = names.map((name) => {
    const product = findProduct(name);
    const qty = cart[name];
    const lineTotal = discountedPrice(product) * qty;
    return `${qty}x ${product.name} - ${formatPrice(lineTotal)} SAR`;
  });

  const needsRx = names.some((name) => findProduct(name)?.rx);
  const total = cartTotal(cart);

  let message = "Assalamu alaikum, Abu Shujaa Pharmacy\nOrder:\n";
  message += lines.join("\n");
  message += `\nTotal: ${formatPrice(total)} SAR`;
  if (needsRx) message += "\n\nI have a prescription ready for the prescription item(s) above.";
  message += "\n\nMy location: ";

  return message;
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function initCart() {
  renderCart();

  document.getElementById("cart-toggle").addEventListener("click", openCart);
  document.getElementById("cart-close").addEventListener("click", closeCart);
  document.getElementById("cart-overlay").addEventListener("click", closeCart);

  document.getElementById("cart-checkout").addEventListener("click", () => {
    const message = buildCheckoutMessage();
    if (!message) return;
    window.open(waLink(message), "_blank", "noopener");
  });
}

/* ============================================================
   HEALTH TIPS ARTICLES
   ============================================================ */

function articleCard(article) {
  return `
    <article class="article-card" data-open-article="${article.id}">
      <span class="article-tag">${article.tag}</span>
      <h3>${article.title}</h3>
      <p>${article.teaser}</p>
      <span class="article-read-more">${t("read_more")} →</span>
    </article>
  `;
}

function renderArticles() {
  const grid = document.getElementById("article-grid");
  if (!grid) return;
  grid.innerHTML = ARTICLES.map(articleCard).join("");
  grid.querySelectorAll("[data-open-article]").forEach((card) => {
    card.addEventListener("click", () => openArticle(card.dataset.openArticle));
  });
}

function articleBodyHTML(article) {
  const parts = article.body.map((block) => {
    if (typeof block === "string") return `<p>${block}</p>`;
    if (block.heading) return `<h3>${block.heading}</h3>`;
    return "";
  });
  return `
    <span class="article-tag">${article.tag}</span>
    <h2>${article.title}</h2>
    ${parts.join("")}
  `;
}

function openArticle(id) {
  const article = ARTICLES.find((a) => a.id === id);
  if (!article) return;
  document.getElementById("article-modal-body").innerHTML = articleBodyHTML(article);
  document.getElementById("article-modal").classList.add("open");
  document.getElementById("article-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeArticle() {
  document.getElementById("article-modal").classList.remove("open");
  document.getElementById("article-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function initArticles() {
  renderArticles();
  document.getElementById("article-close").addEventListener("click", closeArticle);
  document.getElementById("article-overlay").addEventListener("click", closeArticle);
}

/* ============================================================
   GENERAL WHATSAPP LINKS (header CTA, footer, floating button)
   ============================================================ */

function initWhatsAppLinks() {
  document.querySelectorAll("[data-wa-message]").forEach((el) => {
    el.href = waLink(el.dataset.waMessage);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initLanguage();
  initCatalog();
  initCart();
  initArticles();
  initWhatsAppLinks();
});
