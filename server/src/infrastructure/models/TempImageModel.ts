import { Schema, model } from 'mongoose';

const TempImageSchema = new Schema({
  id: {type: String, required: true},
  path: {type: String, required: true}
});

const TempImageModel = model("TempImage", TempImageSchema);

export { TempImageModel };
