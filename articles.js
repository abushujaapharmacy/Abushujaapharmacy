/*
  ABU SHUJAA PHARMACY — HEALTH TIPS ARTICLES
  -------------------------------------------
  General, educational content only — no dosing instructions or
  personalized medical advice. Each article ends with a line
  encouraging the reader to ask the pharmacist for anything specific
  to them. Edit freely; add new articles by copying the same shape.

  Fields:
    id       – unique slug, used to open the right article
    tag      – short season/topic label shown on the card
    title    – article title
    teaser   – one-line summary shown on the card
    body     – array of paragraphs/headings; each item is either
               a plain string (paragraph) or { heading: "..." }
*/

const ARTICLES = [
  {
    id: "riyadh-heat",
    tag: "Summer",
    title: "Beating the Riyadh Heat",
    teaser: "Simple ways to avoid heat exhaustion and dehydration during the hottest months.",
    body: [
      "Riyadh summers regularly pass 45°C, and heat-related illness is one of the most common — and most preventable — health issues we see at the pharmacy during these months.",
      { heading: "Stay ahead of dehydration" },
      "Don't wait until you feel thirsty. Sip water steadily through the day, and increase intake further if you're outdoors, fasting, or active. Oral rehydration salts can help replace lost electrolytes during periods of heavy sweating.",
      { heading: "Limit outdoor exposure" },
      "Try to avoid being outside between 11 AM and 4 PM, when the heat is most intense. If you must go out, light-colored, loose clothing and a hat make a real difference.",
      { heading: "Watch for warning signs" },
      "Heavy sweating, dizziness, nausea, headache, or muscle cramps can signal heat exhaustion. Move to a cool area, hydrate, and rest. If someone stops sweating, becomes confused, or loses consciousness, this is a medical emergency — seek help immediately.",
      { heading: "Who should take extra care" },
      "Children, older adults, outdoor workers, and people managing chronic conditions like diabetes or heart disease are more vulnerable to heat stress and should take extra precautions.",
      "This is general information, not a substitute for personal medical advice. If you have a condition that affects your fluid balance or are on medication that affects how your body handles heat, ask us — we're happy to help."
    ]
  },
  {
    id: "hajj-umrah-health",
    tag: "Hajj & Umrah",
    title: "Staying Healthy During Hajj & Umrah",
    teaser: "Practical health preparation for pilgrims — before you go and while you're there.",
    body: [
      "Hajj and Umrah bring large crowds, long hours of walking, and exposure to heat — all of which make a little preparation go a long way.",
      { heading: "Before you travel" },
      "Make sure routine vaccinations are up to date, and check whether the meningitis vaccine is required for your Hajj visa category. If you take regular medication, bring enough for the full trip, plus a few extra days, in its original packaging.",
      { heading: "Managing the crowds and walking" },
      "Comfortable, well-worn shoes matter more than most pilgrims expect — blisters and foot strain are extremely common. Consider supportive insoles and moisture-wicking socks.",
      { heading: "Heat and hydration" },
      "The same heat precautions apply here as any Riyadh summer, but intensified by physical exertion. Carry a small water bottle, use the water stations, and rest in shaded areas when you can.",
      { heading: "Respiratory precautions" },
      "Close crowds mean higher chances of catching a cold or flu. A basic mask, hand sanitizer, and avoiding touching your face can meaningfully reduce your risk.",
      "Come see us before you travel — we can help put together a simple travel health kit suited to your own medical history."
    ]
  },
  {
    id: "flu-season",
    tag: "Winter",
    title: "Cold & Flu Season: Prevention Basics",
    teaser: "Everyday habits that lower your chances of catching — or spreading — seasonal illness.",
    body: [
      "Cold and flu cases rise noticeably during Riyadh's cooler months, partly due to indoor crowding and air conditioning shifts.",
      { heading: "The basics still work best" },
      "Regular handwashing, avoiding close contact with visibly unwell people, and not touching your face are still the most effective everyday defenses — simple, but genuinely effective.",
      { heading: "Support your immune system" },
      "Adequate sleep, regular meals, and staying hydrated all play a real role in how well your body handles seasonal viruses.",
      { heading: "Know the difference" },
      "A common cold usually comes on gradually with a runny nose and mild symptoms. Flu tends to hit harder and faster — fever, body aches, and fatigue are more pronounced. Either way, rest and fluids are the first step.",
      { heading: "When to seek care" },
      "See a doctor if fever is high or lasts more than a few days, if breathing becomes difficult, or if symptoms improve and then suddenly worsen.",
      "We stock a full range of cold and flu relief options — come by and we'll help you find what suits your symptoms."
    ]
  },
  {
    id: "ramadan-medications",
    tag: "Ramadan",
    title: "Ramadan & Your Medications",
    teaser: "General awareness on adjusting medication routines around fasting hours.",
    body: [
      "Fasting during Ramadan changes the timing of meals and daily routines — and for many people on regular medication, this raises questions about when and how to take their doses.",
      { heading: "Don't guess — ask first" },
      "Never stop or reschedule a prescribed medication on your own, especially for conditions like diabetes, high blood pressure, or heart disease. Many medication schedules can be safely adjusted around Suhoor and Iftar, but this needs to be done properly, on a case-by-case basis.",
      { heading: "Some general patterns" },
      "Once-daily medications are often shifted to Iftar or Suhoor depending on how they work. Multiple-times-daily medications usually need a revised schedule fitted into the non-fasting hours. The right approach depends entirely on the specific medication and your health condition.",
      { heading: "Certain groups need extra caution" },
      "People with diabetes on insulin or specific oral medications, and anyone with a condition that requires precise dosing intervals, should speak with their doctor or pharmacist before Ramadan begins — not after symptoms appear.",
      "This is general awareness only, not a substitute for a proper medication review. Bring your prescriptions in before Ramadan and we'll go through your specific schedule together."
    ]
  },
  {
    id: "dust-allergy-season",
    tag: "Dust Season",
    title: "Managing Dust & Allergy Season",
    teaser: "Riyadh's dust storms and dry air can trigger allergies — here's how to reduce the impact.",
    body: [
      "Riyadh's dust storms and generally dry, dusty air are a common trigger for allergy symptoms and respiratory irritation, especially for people with asthma or existing allergies.",
      { heading: "Reduce your exposure" },
      "Keep windows closed during dust storms, and consider an indoor air purifier if allergies are a recurring issue for your household. Rinsing your face and hands after being outdoors can also help.",
      { heading: "Recognize the symptoms" },
      "Sneezing, itchy or watery eyes, a scratchy throat, and nasal congestion are the most common signs of dust-related allergies. These can look similar to a cold, but tend to clear up faster once away from the trigger.",
      { heading: "For asthma sufferers" },
      "Dust and poor air quality can trigger asthma flare-ups. Make sure any prescribed inhalers are on hand and not expired, particularly during dustier months.",
      "If symptoms are new, worsening, or affecting your breathing, please don't self-manage for too long — come in and let's talk through it."
    ]
  }
];
