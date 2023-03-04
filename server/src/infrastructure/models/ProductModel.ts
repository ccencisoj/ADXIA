import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  brand: {type: String, required: true},
  avaliableQuantity: {type: Number, required: true},
  price: {type: Number, required: true},
  imageURL: {type: String, required: true},
  description: {type: String, required: false},
  grammage: {type: Number, required: true},
  deleted: {type: Boolean, required: true}
});

const ProductModel = model("Product", ProductSchema);

export { ProductModel };
