import mongoose from 'mongoose';

const ProductOptionSchema = new mongoose.Schema({
  amount: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    fullDescription: { type: String, required: true },
    images: { type: [String], default: [] },
    optionLabel: { type: String },
    options: { type: [ProductOptionSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
