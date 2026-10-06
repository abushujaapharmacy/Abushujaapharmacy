/*
  ABU SHUJAA PHARMACY — INVENTORY DATA
  -------------------------------------
  Imported from the pharmacy's stock spreadsheet (1,079 items).
  Categories were auto-assigned from keywords in each item's name —
  review and correct any that look wrong.

  IMPORTANT: "rx" is set to false for every item by default. Please
  go through and set "rx": true for anything that legally requires
  a prescription — this wasn't in the spreadsheet and needs a
  pharmacist's review, not a guess.

  ADDING PHOTOS: each item has a stable "id" number matching the
  order in product-photo-checklist.csv. Photograph items in that
  order, name the files 1.jpg, 2.jpg, 3.jpg... and send them back —
  they'll be matched to the right product automatically by number.
  You can also set "image" manually below, e.g.:
    image: "assets/products/1.jpg"

  Fields:
    id          – stable reference number (matches the photo checklist)
    name        – product name shown to customers
    category    – Medicine | Cosmetics & Personal Care | Baby & Family Care |
                  Vitamins & Supplements | Medical Devices | General
    price       – current selling price in SAR
    discount    – percentage off, 0 if none
    info        – short factual line (currently blank — add if useful)
    rx          – true if a prescription is required, false otherwise
    qty         – stock count at time of import (for your reference)
    image       – path to a product photo, e.g. "assets/products/1.jpg" (optional)
*/

const PRODUCTS = [
  { name: "Panadol Extra", category: "General", price: 8.0, discount: 0, info: "Panadol Extra is an analgesic", rx: false, qty: 1 },
];
