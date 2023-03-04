// @ts-nocheck
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import express, { Router } from 'express';
import { config } from './infrastructure';
import MongoStore from 'connect-mongo';
import {
  createClientController,
  createEmployeeController,
  createOrderController,
  createProductController,
  deleteClientController,
  deleteEmployeeController,
  deleteOrderController,
  deleteProductController,
  getClientByIdController,
  getClientsController,
  getEmployeeByIdController,
  getEmployeesController,
  getOrdersController,
  getProductsController,
  updateClientController,
  updateEmployeeController,
  updateProductController,
  saveTempImageController,
  getTempImageByIdController,
  uploadImageMiddleware,
  updateOrderController,
  getOrderProductsController,
  loginEmployeeController,
  logoutEmployeeController,
  getCurrentEmployeeController,
  getProductByIdController,
  getOrdersClientsController,
  getOrderByIdController
} from './container';

const PORT = config.PORT;
const NODE_ENV = config.NODE_ENV;
const MONGO_URI = config.MONGO_URI;
const SESSION_SECRET = config.SESSION_SECRET;

const isProduction = NODE_ENV === "production";

(async ()=> {
  const server = express();

  const apiRouter = Router();

  // Middlewares
  server.use(cors({
    credentials: true,
    origin: isProduction ? [
      "http://adxia.online",
      "https://adxia.online",
      "http://www.adxia.online",
      "https://www.adxia.online"
    ] 
    :
    [
      "http://localhost:3000",
      "http://192.168.100.6:3000",
    ] 
  }));

  server.use(express.json());
  server.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    store: MongoStore.create({mongoUrl: MONGO_URI})
  }));

  // Order Routes
  apiRouter.get(getOrdersController.route, getOrdersController.execute);
  apiRouter.get(getOrderByIdController.route, getOrderByIdController.execute);
  apiRouter.post(createOrderController.route, createOrderController.execute);
  apiRouter.delete(deleteOrderController.route, deleteOrderController.execute);
  apiRouter.put(updateOrderController.route, updateOrderController.execute);
  apiRouter.get(getOrderProductsController.route, getOrderProductsController.execute);
  apiRouter.get(getOrdersClientsController.route, getOrdersClientsController.execute);

  // Employee Routes
  apiRouter.get(getEmployeeByIdController.route, getEmployeeByIdController.execute);
  apiRouter.get(getEmployeesController.route, getEmployeesController.execute);
  apiRouter.post(createEmployeeController.route, createEmployeeController.execute);
  apiRouter.delete(deleteEmployeeController.route, deleteEmployeeController.execute);
  apiRouter.put(updateEmployeeController.route, updateEmployeeController.execute);
  apiRouter.post(loginEmployeeController.route, loginEmployeeController.execute);
  apiRouter.post(logoutEmployeeController.route, logoutEmployeeController.execute);
  apiRouter.get(getCurrentEmployeeController.route, getCurrentEmployeeController.execute);
  
  // Client Routes
  apiRouter.get(getClientByIdController.route, getClientByIdController.execute);
  apiRouter.get(getClientsController.route, getClientsController.execute);
  apiRouter.post(createClientController.route, createClientController.execute);
  apiRouter.delete(deleteClientController.route, deleteClientController.execute);
  apiRouter.put(updateClientController.route, updateClientController.execute);

  // Product Routes
  apiRouter.get(getProductsController.route, getProductsController.execute);
  apiRouter.get(getProductByIdController.route, getProductByIdController.execute);
  apiRouter.post(createProductController.route, createProductController.execute);
  apiRouter.delete(deleteProductController.route, deleteProductController.execute);
  apiRouter.put(updateProductController.route, updateProductController.execute);

  // Image routes
  apiRouter.post(saveTempImageController.route, uploadImageMiddleware.execute, saveTempImageController.execute);
  apiRouter.get(getTempImageByIdController.route, getTempImageByIdController.execute);

  server.use("/api", apiRouter);

  // Database connection
  await mongoose.connect(MONGO_URI);

  server.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`);
  });
})();
