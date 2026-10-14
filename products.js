/*
  ABU SHUJAA PHARMACY — INVENTORY DATA
  -------------------------------------
  Manually maintained from here on (the old 1,079-item bulk import and
  the barcode-scanner system have both been removed).

  To add a product: copy one of the lines below and edit it.
  Fields:
    id        – just needs to be unique, increment by one each time
    name      – product name shown to customers
    category  – Medicine | Cosmetics & Personal Care | Baby & Family Care |
                Vitamins & Supplements | Medical Devices | General
    price     – selling price in SAR
    discount  – percentage off, 0 if none
    info      – short factual line (what it is / what it's for / form)
    rx        – true if a prescription is required, false otherwise
    qty       – stock count (for your own reference)
    image     – path to a product photo, e.g. "assets/products/1.jpg" (optional)
*/

const PRODUCTS = [
  { id: 1, name: "Jalra M 50mg/1000mg", category: "Medicine", price: 98.70, discount: 0, info: "Vildagliptin and metformin hydrochloride film-coated tablets for type 2 diabetes. 60 tablets.", rx: false, qty: 1,
 image: "assets/products/galra-m-50-1000.jpg" },
  { id: 2, name: "Glucovance 500mg/5mg", category: "Medicine", price: 23.45, discount: 0, info: "Metformin hydrochloride and glibenclamide film-coated tablets for type 2 diabetes. 30 tablets.", rx: false, qty: 1,
 image: "assets/products/glucovance-500-5.jpg" },
  { id: 3, name: "Glucovance 500mg/2.5mg", category: "Medicine", price: 16.50, discount: 0, info: "Metformin hydrochloride and glibenclamide film-coated tablets for type 2 diabetes. 30 tablets.", rx: false, qty: 1,
 image: "assets/products/glucovance-500-2.5.jpg" },
  { id: 4, name: "Amaglime 2mg", category: "Medicine", price: 13.70, discount: 0, info: "Glimepiride 2mg tablets for type 2 diabetes. 30 tablets.", rx: false, qty: 1, 
image: "assets/products/amaglime-2mg.jpg" },
  { id: 5, name: "Amaglime 3mg", category: "Medicine", price: 23.60, discount: 0, info: "Glimepiride 3mg tablets for type 2 diabetes. 30 tablets.", rx: false, qty: 1, 
image: "assets/products/amaglime-3mg.jpg" },
 { id: 6, name: "Glim 1mg", category: "Medicine", price: 19.75, discount: 0, info: "Glimepiride 1mg tablets for type 2 diabetes. 30 tablets.", rx: false, qty: 1, 
image: "assets/products/Glim-1mg.jpg" },
{ id: 7, name: "Glim 2mg", category: "Medicine", price: 32.20, discount: 0, info: "Glimepiride 2mg tablets for type 2 diabetes. 30 tablets.", rx: false, qty: 1, 
image: "assets/products/Glim-2mg.jpg" },
{ id: 8, name: "Glim 3mg", category: "Medicine", price: 44.80, discount: 0, info: "Glimepiride 3mg tablets for type 2 diabetes. 30 tablets.", rx: false, qty: 1, 
image: "assets/products/Glim-3mg.jpg" },
{ id: 9, name: "Glim 4mg", category: "Medicine", price: 47.25, discount: 0, info: "Glimepiride 4mg tablets for type 2 diabetes. 30 tablets.", rx: false, qty: 1, 
image: "assets/products/Glim-4mg.jpg" },
{ id: 10, name: "Panadol Extra", category: "Medicine", price: 8, discount: 0, info: "  Paracetamol - Caffeine, 24 tablets.", rx: false, qty: 1, 
image: "assets/products/Panadol-Extra.jpg" },

];
