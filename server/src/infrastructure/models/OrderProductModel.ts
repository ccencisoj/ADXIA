import { Schema, model } from 'mongoose';

const OrderProductSchema = new Schema({
  id: {type: String, required: true},
  orderId: {type: String, required: true},
  productId: {type: String, required: true},
  name: {type: String, required: true},
  brand: {type: String, required: true},
  quantity: {type: Number, required: true},
  price: {type: Number, required: true},
  imageURL: {type: String, required: true},
  grammage: {type: Number, required: true},
  deleted: {type: Boolean, required: true}
});

const OrderProductModel = model("OrderProduct", OrderProductSchema);

export { OrderProductModel };
