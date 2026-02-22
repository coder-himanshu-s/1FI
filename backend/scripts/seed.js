import "dotenv/config";
import mongoose from "mongoose";
import Product from "../src/models/Product.js";

const defaultEmiPlans = [
  { monthlyAmount: 44967, tenureMonths: 3, interestRate: 0, cashback: 7500 },
  { monthlyAmount: 22483, tenureMonths: 6, interestRate: 0, cashback: 7500 },
  { monthlyAmount: 11242, tenureMonths: 12, interestRate: 0, cashback: 7500 },
  { monthlyAmount: 5621, tenureMonths: 24, interestRate: 0, cashback: 7500 },
  { monthlyAmount: 4297, tenureMonths: 36, interestRate: 10.5, cashback: 7500 },
  { monthlyAmount: 3385, tenureMonths: 48, interestRate: 10.5, cashback: 7500 },
  { monthlyAmount: 2842, tenureMonths: 60, interestRate: 10.5, cashback: 7500 },
];

const emiPlans6 = [
  { monthlyAmount: 41666, tenureMonths: 3, interestRate: 0, cashback: 5000 },
  { monthlyAmount: 20833, tenureMonths: 6, interestRate: 0, cashback: 5000 },
  { monthlyAmount: 10417, tenureMonths: 12, interestRate: 0, cashback: 5000 },
  { monthlyAmount: 5208, tenureMonths: 24, interestRate: 0, cashback: 5000 },
  { monthlyAmount: 3972, tenureMonths: 36, interestRate: 10.5, cashback: 5000 },
  { monthlyAmount: 3125, tenureMonths: 48, interestRate: 10.5, cashback: 5000 },
];

const emiPlans5 = [
  { monthlyAmount: 33333, tenureMonths: 3, interestRate: 0, cashback: 6000 },
  { monthlyAmount: 16667, tenureMonths: 6, interestRate: 0, cashback: 6000 },
  { monthlyAmount: 8333, tenureMonths: 12, interestRate: 0, cashback: 6000 },
  { monthlyAmount: 4167, tenureMonths: 24, interestRate: 0, cashback: 6000 },
  { monthlyAmount: 3182, tenureMonths: 36, interestRate: 10.5, cashback: 6000 },
];

const emiPlansMid = [
  { monthlyAmount: 16666, tenureMonths: 3, interestRate: 0, cashback: 3000 },
  { monthlyAmount: 8333, tenureMonths: 6, interestRate: 0, cashback: 3000 },
  { monthlyAmount: 4167, tenureMonths: 12, interestRate: 0, cashback: 3000 },
  { monthlyAmount: 2083, tenureMonths: 24, interestRate: 0, cashback: 3000 },
  { monthlyAmount: 1590, tenureMonths: 36, interestRate: 10.5, cashback: 3000 },
];

const emiPlansBudget = [
  { monthlyAmount: 4999, tenureMonths: 3, interestRate: 0, cashback: 1500 },
  { monthlyAmount: 2500, tenureMonths: 6, interestRate: 0, cashback: 1500 },
  { monthlyAmount: 1250, tenureMonths: 12, interestRate: 0, cashback: 1500 },
  { monthlyAmount: 833, tenureMonths: 18, interestRate: 0, cashback: 1500 },
  { monthlyAmount: 625, tenureMonths: 24, interestRate: 10.5, cashback: 1500 },
];

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    tagline: "EMI plans backed by mutual funds",
    isNew: true,
    variants: [
      { variantLabel: "256GB", finishName: "Orange", mrp: 134900, currentPrice: 127400, imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600", emiPlans: defaultEmiPlans },
      { variantLabel: "256GB", finishName: "Blue", mrp: 134900, currentPrice: 127400, imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600", emiPlans: defaultEmiPlans },
      { variantLabel: "256GB", finishName: "Natural Titanium", mrp: 134900, currentPrice: 127400, imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600", emiPlans: defaultEmiPlans },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-s24-ultra",
    tagline: "EMI plans backed by mutual funds",
    isNew: true,
    variants: [
      { variantLabel: "512GB", finishName: "Titanium Black", mrp: 134999, currentPrice: 124999, imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600", emiPlans: emiPlans6 },
      { variantLabel: "512GB", finishName: "Titanium Gray", mrp: 134999, currentPrice: 124999, imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600", emiPlans: emiPlans6 },
    ],
  },
  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    tagline: "EMI plans backed by mutual funds",
    isNew: false,
    variants: [
      { variantLabel: "256GB", finishName: "Obsidian", mrp: 106999, currentPrice: 99999, imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600", emiPlans: emiPlans5 },
      { variantLabel: "256GB", finishName: "Porcelain", mrp: 106999, currentPrice: 99999, imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600", emiPlans: emiPlans5 },
    ],
  },
  {
    name: "OnePlus 13",
    slug: "oneplus-13",
    tagline: "EMI plans backed by mutual funds",
    isNew: true,
    variants: [
      { variantLabel: "256GB", finishName: "Silicium Black", mrp: 69999, currentPrice: 64999, imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600", emiPlans: emiPlansMid },
      { variantLabel: "256GB", finishName: "Flowing Emerald", mrp: 69999, currentPrice: 64999, imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600", emiPlans: emiPlansMid },
      { variantLabel: "512GB", finishName: "Silicium Black", mrp: 74999, currentPrice: 69999, imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600", emiPlans: emiPlansMid },
    ],
  },
  {
    name: "Nothing Phone (2)",
    slug: "nothing-phone-2",
    tagline: "EMI plans backed by mutual funds",
    isNew: false,
    variants: [
      { variantLabel: "256GB", finishName: "White", mrp: 44999, currentPrice: 41999, imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600", emiPlans: emiPlansBudget },
      { variantLabel: "256GB", finishName: "Dark Grey", mrp: 44999, currentPrice: 41999, imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600", emiPlans: emiPlansBudget },
    ],
  },
  {
    name: "Xiaomi 14",
    slug: "xiaomi-14",
    tagline: "EMI plans backed by mutual funds",
    isNew: true,
    variants: [
      { variantLabel: "256GB", finishName: "Black", mrp: 59999, currentPrice: 54999, imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600", emiPlans: emiPlansMid },
      { variantLabel: "256GB", finishName: "Jade Green", mrp: 59999, currentPrice: 54999, imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600", emiPlans: emiPlansMid },
    ],
  },
  {
    name: "Vivo X100 Pro",
    slug: "vivo-x100-pro",
    tagline: "EMI plans backed by mutual funds",
    isNew: true,
    variants: [
      { variantLabel: "256GB", finishName: "Stargaze Blue", mrp: 89999, currentPrice: 84999, imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600", emiPlans: emiPlans5 },
      { variantLabel: "256GB", finishName: "Sunset Orange", mrp: 89999, currentPrice: 84999, imageUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600", emiPlans: emiPlans5 },
    ],
  },
  {
    name: "Samsung Galaxy Z Flip 6",
    slug: "samsung-galaxy-z-flip-6",
    tagline: "EMI plans backed by mutual funds",
    isNew: true,
    variants: [
      { variantLabel: "256GB", finishName: "Silver Shadow", mrp: 109999, currentPrice: 104999, imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600", emiPlans: emiPlans5 },
      { variantLabel: "256GB", finishName: "Mint", mrp: 109999, currentPrice: 104999, imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600", emiPlans: emiPlans5 },
      { variantLabel: "256GB", finishName: "Graphite", mrp: 109999, currentPrice: 104999, imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600", emiPlans: emiPlans5 },
    ],
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seed completed. Products inserted:", products.length);
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();
