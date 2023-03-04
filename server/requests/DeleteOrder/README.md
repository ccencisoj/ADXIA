# Eliminar un pedido

**URL**: `/api/order`

**Metodo**: `DELETE`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Se debe proporcionar las siguientes entradas: orderId

## Respuesta exitosa

```http
DELETE http://localhost:4000/api/order?orderId=997879c8-fdac-4544-a7de-68755840d979
```

## Respuesta mala

Debe ingresar un orderId valido. La siguiente petición arrojara un error:

```http
DELETE http://localhost:4000/api/order?orderId=1234
```
