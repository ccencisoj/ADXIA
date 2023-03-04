# Actualizar un pedido

**URL**: `/api/order`

**Metodo**: `PUT`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Entradas obligatorias: orderId, clientId, products

Entradas opcionales: deliveredAt

## Respuesta exitosa

orderId: debe ser proporcionado por url
clientId: debe ser proporcionado en el cuerpo de la petición
products: deben ser los identificadores de los productos

```http
PUT http://localhost:4000/api/order?orderId=5d7b08a6-1fbc-4899-b770-206e83b466aa
Content-Type: application/json

{
  "clientId": "5d7b08a6-1fbc-4899-b770-206e83b466ff",
  "products": [
    "5d7b08a6-1fbc-4899-b770-206e83b466bb",
    "5d7b08a6-1fbc-4899-b770-206e83b466dd"
  ]
}
```

Si todo va bien devuelve:

```json
{
  "clientId": "5d7b08a6-1fbc-4899-b770-206e83b466ff",
  "products": [
    "5d7b08a6-1fbc-4899-b770-206e83b466bb",
    "5d7b08a6-1fbc-4899-b770-206e83b466dd"
  ]
}
```