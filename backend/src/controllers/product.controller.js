import Product from "../models/Product.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find({}).select("name slug variants").lean();
  const list = products.map((p) => ({
    _id: p._id,
    name: p.name,
    slug: p.slug,
    variantCount: p.variants?.length || 0,
    thumbnail: p.variants?.[0]?.imageUrl || null,
  }));
  res.json({ success: true, data: list });
};

export const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).lean();
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, data: product });
};
