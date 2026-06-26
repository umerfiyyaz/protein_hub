// ============================================================
// PROTEIN HUB — PRODUCTS DATA (Shared across all pages)
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Crunch",
    category: "classic",
    emoji: "🥜",
    tagline: "The OG. Bold peanut flavour with satisfying crunch.",
    description:
      "Our bestselling Classic Crunch is made from 100% dry-roasted peanuts with no added sugar, no palm oil. Just pure, honest peanut butter with a satisfying crunch in every bite. Perfect for toast, smoothies, or straight from the spoon.",
    price: 1299,
    oldPrice: 1599,
    weight: "500g",
    protein: "28g",
    calories: "190 kcal",
    fat: "15g",
    carbs: "7g",
    badge: "Bestseller",
    badgeType: "hot",
    rating: 4.9,
    reviews: 312,
    stock: 45,
    features: ["No Added Sugar", "No Palm Oil", "High Protein", "Gluten Free"],
    ingredients: "Dry-Roasted Peanuts (100%)",
  },
  {
    id: 2,
    name: "Smooth Velvet",
    category: "classic",
    emoji: "✨",
    tagline: "Silky smooth. Zero grit. Pure peanut luxury.",
    description:
      "For those who love the creamy side of life. Smooth Velvet is slow-ground to a silky consistency that spreads like a dream. Same high protein, same clean ingredients — just without the crunch.",
    price: 1299,
    oldPrice: null,
    weight: "500g",
    protein: "26g",
    calories: "188 kcal",
    fat: "14g",
    carbs: "7g",
    badge: null,
    badgeType: null,
    rating: 4.7,
    reviews: 189,
    stock: 32,
    features: ["Ultra Smooth", "No Added Sugar", "High Protein", "Vegan"],
    ingredients: "Dry-Roasted Peanuts (100%)",
  },
  {
    id: 3,
    name: "Chocolate Whey Crunch",
    category: "whey",
    emoji: "🍫",
    tagline: "Chocolate + Protein. Your cheat meal just got healthy.",
    description:
      "We mixed our signature crunchy peanut butter with premium whey protein isolate and real cocoa for a post-workout treat that feels like a dessert. 32g of protein per serving means you never have to choose between taste and gains.",
    price: 1799,
    oldPrice: 2099,
    weight: "500g",
    protein: "32g",
    calories: "210 kcal",
    fat: "12g",
    carbs: "10g",
    badge: "New",
    badgeType: "new",
    rating: 4.8,
    reviews: 97,
    stock: 18,
    features: [
      "32g Protein",
      "Real Cocoa",
      "Whey Isolate",
      "No Artificial Sweeteners",
    ],
    ingredients:
      "Dry-Roasted Peanuts, Whey Protein Isolate, Cocoa Powder, Stevia",
  },
  {
    id: 4,
    name: "Vanilla Whey Smooth",
    category: "whey",
    emoji: "🍦",
    tagline: "Light. Creamy. Packed with gains.",
    description:
      "A smooth peanut butter infused with whey protein and a hint of real vanilla. Tastes like a protein shake in a jar. Add it to oatmeal, blend it into shakes, or eat it with a spoon — all roads lead to 30g of protein.",
    price: 1799,
    oldPrice: null,
    weight: "500g",
    protein: "30g",
    calories: "205 kcal",
    fat: "12g",
    carbs: "9g",
    badge: null,
    badgeType: null,
    rating: 4.6,
    reviews: 74,
    stock: 26,
    features: ["30g Protein", "Real Vanilla", "Whey Blend", "Keto Friendly"],
    ingredients:
      "Dry-Roasted Peanuts, Whey Protein Blend, Vanilla Extract, Stevia",
  },
  {
    id: 5,
    name: "Honey Almond Twist",
    category: "flavoured",
    emoji: "🍯",
    tagline: "A golden twist of honey and almonds.",
    description:
      "We added real Pakistani honey and crunchy almond pieces to our classic peanut butter for a sweet-savoury combo that's absolutely addictive. A natural sweetness with no refined sugar added.",
    price: 1499,
    oldPrice: 1699,
    weight: "500g",
    protein: "24g",
    calories: "215 kcal",
    fat: "14g",
    carbs: "12g",
    badge: "Popular",
    badgeType: "hot",
    rating: 4.8,
    reviews: 156,
    stock: 40,
    features: [
      "Real Honey",
      "Almond Pieces",
      "Natural Sweetener",
      "No Refined Sugar",
    ],
    ingredients: "Dry-Roasted Peanuts, Raw Honey, Roasted Almond Pieces, Salt",
  },
  {
    id: 6,
    name: "Spicy Sriracha Crunch",
    category: "flavoured",
    emoji: "🌶️",
    tagline: "For the bold. Sweet heat in every bite.",
    description:
      "Not your average peanut butter. We blended our crunchy PB with sriracha chili sauce for a sweet, tangy, fiery kick. Mind-blowing in Asian noodles, satay sauce, or dipping fresh veggies.",
    price: 1399,
    oldPrice: null,
    weight: "350g",
    protein: "22g",
    calories: "185 kcal",
    fat: "14g",
    carbs: "9g",
    badge: "New",
    badgeType: "new",
    rating: 4.5,
    reviews: 42,
    stock: 15,
    features: [
      "Real Sriracha",
      "Spicy & Sweet",
      "Unique Flavour",
      "Gluten Free",
    ],
    ingredients:
      "Dry-Roasted Peanuts, Sriracha Sauce (Chili, Vinegar, Garlic), Salt",
  },
  {
    id: 7,
    name: "Gym Bundle Pack",
    category: "classic",
    emoji: "💪",
    tagline: "4 jars. Unstoppable gains. Maximum savings.",
    description:
      "The ultimate value pack for serious athletes. Get 4 jars of our Classic Crunch at a massive discount. Stock your pantry, never run out of fuel. Each jar ships fresh and sealed.",
    price: 3999,
    oldPrice: 5196,
    weight: "4 × 500g",
    protein: "28g/serving",
    calories: "190 kcal",
    fat: "15g",
    carbs: "7g",
    badge: "Save 23%",
    badgeType: "hot",
    rating: 5.0,
    reviews: 64,
    stock: 12,
    features: ["4 Jar Bundle", "Best Value", "Free Shipping", "Great Gift"],
    ingredients: "Dry-Roasted Peanuts (100%)",
  },
  {
    id: 8,
    name: "Dark Cocoa Smooth",
    category: "flavoured",
    emoji: "🖤",
    tagline: "Rich. Dark. Indulgent. Guilt-free.",
    description:
      "Inspired by dark chocolate lovers — this smooth peanut butter is blended with premium 70% cocoa for an intense, bittersweet flavour. Low sugar, high protein, and deeply satisfying.",
    price: 1549,
    oldPrice: 1799,
    weight: "500g",
    protein: "25g",
    calories: "200 kcal",
    fat: "13g",
    carbs: "9g",
    badge: null,
    badgeType: null,
    rating: 4.7,
    reviews: 88,
    stock: 22,
    features: [
      "70% Dark Cocoa",
      "Low Sugar",
      "Smooth Texture",
      "Antioxidant Rich",
    ],
    ingredients: "Dry-Roasted Peanuts, 70% Cocoa Powder, Stevia, Salt",
  },
];

// Save to localStorage for admin access
function syncProductsToStorage() {
  const stored = localStorage.getItem("ph_products");
  if (!stored) {
    localStorage.setItem("ph_products", JSON.stringify(PRODUCTS));
  }
}

function getProducts() {
  const stored = localStorage.getItem("ph_products");
  return stored ? JSON.parse(stored) : PRODUCTS;
}

function saveProducts(products) {
  localStorage.setItem("ph_products", JSON.stringify(products));
}

syncProductsToStorage();
