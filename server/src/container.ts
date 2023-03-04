// Import UseCases
import {
  CreateClientUseCase,
  CreateEmployeeUseCase,
  CreateOrderUseCase,
  CreateProductUseCase,
  DeleteClientUseCase,
  DeleteEmployeeUseCase,
  DeleteOrderUseCase,
  DeleteProductUseCase,
  GetClientByIdUseCase,
  GetClientsUseCase,
  GetEmployeeByIdUseCase,
  GetEmployeesUseCase,
  GetOrdersUseCase,
  GetProductsUseCase,
  UpdateClientUseCase,
  UpdateEmployeeUseCase,
  UpdateProductUseCase,
  SaveTempImageUseCase,
  GetTempImageByIdUseCase,
  UpdateOrderUseCase,
  GetOrderProductsUseCase,
  LoginEmployeeUseCase,
  GetCurrentEmployeeUseCase,
  GetProductByIdUseCase,
  GetOrdersClientsUseCase,
  GetOrderByIdUseCase
} from './application';

// Import Models
import {
  ClientModel,
  EmployeeModel,
  OrderModel,
  OrderProductModel,
  ProductModel,
  TempImageModel
} from './infrastructure';

// Import Repositories
import {
  ClientRepository,
  EmployeeRepository,
  OrderProductRepository,
  OrderRepository,
  ProductRepository,
  TempImageRepository
} from './infrastructure';

// Import services
import {
  ImageService,
  HashService,
  EmployeeTokenService
} from './infrastructure'

// Import ErrorHandlers
import {
  ControllerErrorHandler,
  MiddlewareErrorHandler
} from './infrastructure';

// Import Middlewares
import {
  UploadImageMiddleware
} from './infrastructure';

// Import Controllers
import {
  CreateClientController,
  CreateEmployeeController,
  CreateOrderController,
  CreateProductController,
  DeleteClientController,
  DeleteEmployeeController,
  DeleteOrderController,
  DeleteProductController,
  GetClientByIdController,
  GetClientsController,
  GetEmployeeByIdController,
  GetEmployeesController,
  GetOrdersController,
  GetProductsController,
  UpdateClientController,
  UpdateEmployeeController,
  UpdateProductController,
  SaveTempImageController,
  GetTempImageByIdController,
  UpdateOrderController,
  GetOrderProductsController,
  LoginEmployeeController,
  LogoutEmployeeController,
  GetCurrentEmployeeController,
  GetProductByIdController,
  GetOrdersClientsController,
  GetOrderByIdController
} from './infrastructure';

// Repositories
const clientRepository = new ClientRepository(ClientModel);
const employeeRepository = new EmployeeRepository(EmployeeModel);
const orderProductRepository = new OrderProductRepository(OrderProductModel);
const orderRepository = new OrderRepository(OrderModel);
const productRepository = new ProductRepository(ProductModel);
const tempImageRepository = new TempImageRepository(TempImageModel);

// Services
const imageService = new ImageService({tempImageRepository});
const hashService = new HashService();
const employeeTokenService = new EmployeeTokenService();

// UseCases
const createClientUseCase = new CreateClientUseCase({clientRepository, employeeTokenService});
const createEmployeeUseCase = new CreateEmployeeUseCase({employeeRepository, hashService, employeeTokenService});
const createOrderUseCase = new CreateOrderUseCase({clientRepository, orderRepository, employeeTokenService, productRepository, orderProductRepository});
const createProductUseCase = new CreateProductUseCase({productRepository, employeeTokenService});
const deleteClientUseCase = new DeleteClientUseCase({clientRepository, employeeTokenService, orderRepository});
const deleteEmployeeUseCase = new DeleteEmployeeUseCase({employeeRepository, employeeTokenService});
const deleteOrderUseCase = new DeleteOrderUseCase({clientRepository, orderRepository, employeeTokenService, orderProductRepository, productRepository});
const deleteProductUseCase = new DeleteProductUseCase({productRepository, employeeTokenService});
const getClientByIdUseCase = new GetClientByIdUseCase({clientRepository, employeeTokenService});
const getClientsUseCase = new GetClientsUseCase({clientRepository, employeeTokenService});
const getEmployeeByIdUseCase = new GetEmployeeByIdUseCase({employeeRepository, employeeTokenService});
const getEmployeesUseCase = new GetEmployeesUseCase({employeeRepository, employeeTokenService});
const getOrdersUseCase = new GetOrdersUseCase({orderRepository, employeeTokenService, clientRepository});
const getProductsUseCase = new GetProductsUseCase({productRepository, employeeTokenService});
const updateClientUseCase = new UpdateClientUseCase({clientRepository, employeeTokenService});
const updateEmployeeUseCase = new UpdateEmployeeUseCase({employeeRepository, hashService, employeeTokenService});
const updateProductUseCase = new UpdateProductUseCase({productRepository, employeeTokenService});
const saveTempImageUseCase = new SaveTempImageUseCase({imageService, employeeTokenService});
const getTempImageByIdUseCase = new GetTempImageByIdUseCase({imageService, employeeTokenService});
const updateOrderUseCase = new UpdateOrderUseCase({orderRepository, orderProductRepository, productRepository, employeeTokenService});
const getOrderProductsUseCase = new GetOrderProductsUseCase({orderRepository, orderProductRepository, employeeTokenService});
const loginEmployeeUseCase = new LoginEmployeeUseCase({employeeRepository, hashService, employeeTokenService});
const getCurrentEmployeeUseCase = new GetCurrentEmployeeUseCase({employeeRepository, employeeTokenService});
const getProductByIdUseCase = new GetProductByIdUseCase({employeeTokenService, productRepository});
const getOrdersClientsUseCase = new GetOrdersClientsUseCase({orderRepository, clientRepository, employeeTokenService});
const getOrderByIdUseCase = new GetOrderByIdUseCase({employeeTokenService, orderRepository});

// Error Handlers
const controllerErrorHandler = new ControllerErrorHandler();
const middlewareErrorHandler = new MiddlewareErrorHandler();

// Middlewares
const uploadImageMiddleware = new UploadImageMiddleware({middlewareErrorHandler});

// Controllers
const createClientController = new CreateClientController({createClientUseCase, controllerErrorHandler});
const createEmployeeController = new CreateEmployeeController({createEmployeeUseCase, controllerErrorHandler});
const createOrderController = new CreateOrderController({createOrderUseCase, controllerErrorHandler});
const createProductController = new CreateProductController({createProductUseCase, controllerErrorHandler});
const deleteClientController = new DeleteClientController({deleteClientUseCase, controllerErrorHandler});
const deleteEmployeeController = new DeleteEmployeeController({deleteEmployeeUseCase, controllerErrorHandler});
const deleteOrderController = new DeleteOrderController({deleteOrderUseCase, controllerErrorHandler});
const deleteProductController = new DeleteProductController({deleteProductUseCase, controllerErrorHandler});
const getClientByIdController = new GetClientByIdController({getClientByIdUseCase, controllerErrorHandler});
const getClientsController = new GetClientsController({getClientsUseCase, controllerErrorHandler});
const getEmployeeByIdController = new GetEmployeeByIdController({getEmployeeByIdUseCase, controllerErrorHandler});
const getEmployeesController = new GetEmployeesController({getEmployeesUseCase, controllerErrorHandler});
const getOrdersController = new GetOrdersController({getOrdersUseCase, controllerErrorHandler});
const getProductsController = new GetProductsController({getProductsUseCase, controllerErrorHandler});
const updateClientController = new UpdateClientController({updateClientUseCase, controllerErrorHandler});
const updateEmployeeController = new UpdateEmployeeController({updateEmployeeUseCase, controllerErrorHandler});
const updateProductController = new UpdateProductController({updateProductUseCase, controllerErrorHandler});
const saveTempImageController = new SaveTempImageController({saveTempImageUseCase, controllerErrorHandler});
const getTempImageByIdController = new GetTempImageByIdController({getTempImageByIdUseCase, controllerErrorHandler});
const updateOrderController = new UpdateOrderController({updateOrderUseCase, controllerErrorHandler});
const getOrderProductsController = new GetOrderProductsController({getOrderProductsUseCase, controllerErrorHandler});
const loginEmployeeController = new LoginEmployeeController({loginEmployeeUseCase, controllerErrorHandler});
const logoutEmployeeController = new LogoutEmployeeController({controllerErrorHandler});
const getCurrentEmployeeController = new GetCurrentEmployeeController({getCurrentEmployeeUseCase, controllerErrorHandler});
const getProductByIdController = new GetProductByIdController({controllerErrorHandler, getProductByIdUseCase});
const getOrdersClientsController = new GetOrdersClientsController({controllerErrorHandler, getOrdersClientsUseCase});
const getOrderByIdController = new GetOrderByIdController({controllerErrorHandler, getOrderByIdUseCase});

export {
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
};
