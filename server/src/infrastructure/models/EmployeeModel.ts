import { Schema, model } from 'mongoose';

const EmployeeSchema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, required: true},
  nroDocument: {type: String, required: true},
  birthDate: {type: String, required: true},
  imageURL: {type: String, required: true},
  type: {type: String, required: true},
  phone: {type: String, required: true},
  accessCode: {type: String, required: true},
  deleted: {type: Boolean, required: true}
});

const EmployeeModel = model("Employee", EmployeeSchema);

export { EmployeeModel };
