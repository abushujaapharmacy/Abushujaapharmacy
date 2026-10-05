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

  Fields:
    name        – product name shown to customers
    category    – Medicine | Cosmetics & Personal Care | Baby & Family Care |
                  Vitamins & Supplements | Medical Devices | General
    price       – current selling price in SAR
    discount    – percentage off, 0 if none
    info        – short factual line (currently blank — add if useful)
    rx          – true if a prescription is required, false otherwise
    qty         – stock count at time of import (for your reference)
*/

const PRODUCTS = [
  { id: 786, name: "Panadol Extra", category: "General", price: 7.72, discount: 0, info: "", rx: false, qty: 50,
  image:"assets/products/Panadol Extra.jpg"},
  { id: 788, name: "Panadol Sinus", category: "General", price: 13.02, discount: 0, info: "", rx: false, qty: 5,
  image:"assets/products/Panadol Sinus.png"},
];
