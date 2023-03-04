# Crear un pedido

**URL**: `/api/order`

**Metodo**: `POST`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

## Respuesta exitosa
```http
POST http://localhost:4000/api/order
```

## Respuesta mala

Debe ingresar un clientId valido. La siguiente petición arrojara un error:

```http
POST http://localhost:4000/api/order
Content-Type: application/json
```
