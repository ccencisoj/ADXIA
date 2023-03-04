import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  id: {type: String, required: true},
  clientId: {type: String, required: false},
  employeeId: {type: String, required: true},
  createdAt: {type: String, required: true},
  deliveredAt: {type: String, required: false},
  deliveryState: {type: String, required: true},
  total: {type: Number, required: true},
  deleted: {type: Boolean, required: true}
});

const OrderModel = model("Order", OrderSchema);

export { OrderModel };
