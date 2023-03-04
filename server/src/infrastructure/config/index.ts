import 'dotenv/config';

export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  SERVICE_TEMP_IMAGE_URI: process.env.SERVICE_TEMP_IMAGE_URI
}
