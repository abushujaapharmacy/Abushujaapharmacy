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
  
  { name: "Accu Chek Instant Glucometer", category: "Medical Devices", price: 200.0, 
discount: 0, info: "", rx: false, qty: 3, image:"assets/products/Accu Chek Instant Glucometer.png" },
  { name: "Accu Chek Instant Strip", category: "General", price: 70.0, discount: 0, info: "", rx: false, qty: 16,
image:"assets/products/Accu Chek Instant Strip.jpg" },
  { name: "Accucheck Machine", category: "General", price: 140.0, discount: 0, info: "", rx: false, qty: 1 },
  { name: "Acetab 25MG TAB", category: "Medicine", price: 20.25, discount: 0, info: "", rx: false, qty: 1, 
image:"assets/products/Acetab 25mg Tab.jpg" },
  { name: "Acical Plus Chew TAB", category: "Medicine", price: 7.0, discount: 0, info: "", rx: false, qty: 3, 
image:"assets/products/Acical Plus Chew TAB.jpg"},
  { name: "Aciloc 20MG 14CAP", category: "Medicine", price: 45.95, discount: 0, info: "", rx: false, qty: 7, 
image:"assets/products/Aciloc 20MG 14CAP.jpg"},
  { name: "Aciloc 40MG 14TAB", category: "Medicine", price: 61.0, discount: 0, info: "", rx: false, qty: 15,
 image:"assets/products/Aciloc 40MG 14TAB.jpg"},
  { name: "Acretin 0.05% Cream", category: "Medicine", price: 19.25, discount: 0, info: "", rx: false, qty: 6,
 image:"assets/products/Acretin 0.05% Cream.jpg"},
  { name: "Acretin 0.25% Cream", category: "Medicine", price: 18.85, discount: 0, info: "", rx: false, qty: 2,
  "assets/products/Acretin 0.25% Cream.jpg"},
  
