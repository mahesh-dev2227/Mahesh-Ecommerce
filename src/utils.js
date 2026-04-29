export const PRODUCTS = [
  { id: 1, name: "Obsidian Chronograph", category: "Watches", price: 289, rating: 4.8, reviews: 142, badge: "Bestseller", image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=400&fit=crop", desc: "Swiss movement, sapphire crystal, 50m water resistance.", tags: ["watches", "luxury"] },
  { id: 2, name: "Velvet Noir Tote", category: "Bags", price: 159, rating: 4.6, reviews: 87, badge: "New", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", desc: "Full-grain leather with brass hardware. Fits 15\" laptop.", tags: ["bags", "leather"] },
  { id: 3, name: "Altitude Sneakers", category: "Footwear", price: 119, rating: 4.9, reviews: 310, badge: "Hot", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", desc: "Memory foam insole, breathable mesh upper, rubber sole.", tags: ["footwear", "sneakers"] },
  { id: 4, name: "Drift Sunglasses", category: "Accessories", price: 89, rating: 4.5, reviews: 65, badge: null, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop", desc: "UV400 polarized lenses, lightweight titanium frame.", tags: ["accessories", "eyewear"] },
  { id: 5, name: "Merino Cocoon Coat", category: "Clothing", price: 349, rating: 4.7, reviews: 54, badge: "Limited", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop", desc: "100% merino wool, oversized silhouette, dry clean.", tags: ["clothing", "outerwear"] },
  { id: 6, name: "Signal Backpack", category: "Bags", price: 139, rating: 4.6, reviews: 201, badge: null, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", desc: "Waterproof 30L capacity, padded laptop sleeve, USB port.", tags: ["bags", "backpack"] },
  { id: 7, name: "Apex Running Shoe", category: "Footwear", price: 145, rating: 4.8, reviews: 428, badge: "Bestseller", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop", desc: "Carbon plate, responsive foam, reflective detailing.", tags: ["footwear", "running"] },
  { id: 8, name: "Cascade Silk Shirt", category: "Clothing", price: 195, rating: 4.4, reviews: 33, badge: "New", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop", desc: "100% mulberry silk, mother-of-pearl buttons.", tags: ["clothing", "tops"] },
  { id: 9, name: "Meridian Wallet", category: "Accessories", price: 65, rating: 4.7, reviews: 189, badge: null, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop", desc: "RFID-blocking slim cardholder, Italian vegetable-tanned leather.", tags: ["accessories", "leather"] },
  { id: 10, name: "Eclipse Perfume", category: "Beauty", price: 220, rating: 4.9, reviews: 76, badge: "Limited", image: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=400&h=400&fit=crop", desc: "Oud, amber, bergamot. 50ml EDP. Lasts 12+ hours.", tags: ["beauty", "fragrance"] },
  { id: 11, name: "Linen Blazer", category: "Clothing", price: 280, rating: 4.6, reviews: 41, badge: null, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=400&fit=crop", desc: "Unstructured 100% linen, 2-button closure, patch pockets.", tags: ["clothing", "blazer"] },
  { id: 12, name: "Storm Diver Watch", category: "Watches", price: 420, rating: 4.8, reviews: 92, badge: "New", image: "https://images.unsplash.com/photo-1594576722512-582bcd5df8af?w=400&h=400&fit=crop", desc: "300m water resistance, helium escape valve, ceramic bezel.", tags: ["watches", "sport"] },
];

export const CATEGORIES = ["All", "Watches", "Bags", "Footwear", "Accessories", "Clothing", "Beauty"];

export const SORT_OPTIONS = ["Featured", "Price: Low to High", "Price: High to Low", "Highest Rated", "Most Reviewed"];

export const BADGE_COLORS = {
  Bestseller: { bg: "#1a1a2e", color: "#e8d5b7" },
  New: { bg: "#0d3b2e", color: "#a8e6cf" },
  Hot: { bg: "#3b0d0d", color: "#f4a6a6" },
  Limited: { bg: "#2e1a3b", color: "#d4b8e8" },
};