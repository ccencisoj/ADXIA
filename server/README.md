# Descripción general

Para el desarrollo de esta API se aplicaron algunos conceptos de DDD (Domain Driven Design), separando las responsabilidades en tres capa: dominio, aplicación y infrastructura. En la capa de dominio se ha ubicado las entidades, objetos de valor, eventos y algunas interfaces comunes. En la capa de aplicacion se han definido los repositorios, servicios, errores y casos de uso (encargados de orquestar la logica del dominio). En la capa de infrastructura se ha implementado los controladores (que reciben la solicitud y adaptan las entradas para los casos de usos), los repositorios (como fachada para la persistencia de datos), mappers (como adaptores entre dominio y dtos), servicios (donde se implementa la logica de los servicios definidos en la capa de aplicación) y, por ultimo, la configuración.

# Documentación de la API

## Clientes
- [Crear un cliente][CreateClient]: `POST /api/client`
- [Eliminar un cliente][DeleteClient]: `DELETE /api/client`
- [Actualizar un cliente][UpdateClient]: `PUT /api/client`
- [Obtener un cliente por id][GetClientById]: `GET /api/client`
- [Obtener listado de clientes][GetClients]: `GET /api/clients`

## Empleados
- [Crear un empleado][CreateEmployee]: `POST /api/employee`
- [Eliminar un empleado][DeleteEmployee]: `DELETE /api/employee`
- [Actualizar un empleado][UpdateEmployee]: `PUT /api/employee`
- [Obtener un empleado por id][GetEmployeeById]: `GET /api/employee`
- [Obtener listado de empleados][GetEmployees]: `GET /api/employees`

## Productos
- [Crear un producto][CreateProduct]: `POST /api/product`
- [Eliminar un producto][DeleteProduct]: `DELETE /api/product`
- [Actualizar un producto][UpdateProduct]: `PUT /api/product`
- [Obtener un producto por id][GetProductById]: `GET /api/product`
- [Obtener listado de productos][GetProducts]: `GET /api/products`

## Pedidos
- [Crear un pedido][CreateOrder]: `POST /api/order`
- [Eliminar un pedido][DeleteOrder]: `DELETE /api/order`
- [Obtener listado de pedidos][GetOrders]: `GET /api/orders`
- [Agregar un producto a un pedido][AddProductToOrder]: `POST /api/order/product`
- [Eliminar un producto de un pedido][DeleteProductFromOrder]: `DELETE /api/order/product`

[AddProductToOrder]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/AddProductToOrder/README.md
[CreateClient]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/CreateClient/README.md
[CreateEmployee]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/CreateEmployee/README.md
[CreateOrder]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/CreateOrder/README.md
[CreateProduct]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/CreateProduct/README.md
[DeleteClient]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/DeleteClient/README.md
[DeleteEmployee]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/DeleteEmployee/README.md
[DeleteOrder]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/DeleteOrder/README.md
[DeleteProduct]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/DeleteProduct/README.md
[DeleteProductFromOrder]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/DeleteProductFromOrder/README.md
[GetClientById]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/GetClientById/README.md
[GetClients]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/GetClients/README.md
[GetEmployeeById]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/GetEmployeeById/README.md
[GetEmployees]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/GetEmployees/README.md
[GetOrders]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/GetOrders/README.md
[GetProductById]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/GetProductById/README.md
[GetProducts]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/GetProducts/README.md
[UpdateClient]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/UpdateClient/README.md
[UpdateEmployee]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/UpdateEmployee/README.md
[UpdateProduct]: https://github.com/ccencisoj/distrilida4/blob/main/server/requests/UpdateProduct/README.md
