import mongoose from "mongoose";

const emiPlanSchema = new mongoose.Schema({
  monthlyAmount: { type: Number, required: true },
  tenureMonths: { type: Number, required: true },
  interestRate: { type: Number, required: true, default: 0 },
  cashback: { type: Number, required: true, default: 0 },
});

const variantSchema = new mongoose.Schema({
  variantLabel: { type: String, required: true },
  finishName: { type: String, required: true },
  mrp: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  emiPlans: [emiPlanSchema],
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tagline: { type: String, default: "EMI plans backed by mutual funds" },
  isNew: { type: Boolean, default: false },
  variants: [variantSchema],
}, { timestamps: true });

productSchema.index({ slug: 1 });

export default mongoose.model("Product", productSchema);
