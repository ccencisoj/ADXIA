# Obtener cliente por id

**URL**: `/api/client`

**Metodo**: `GET`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Se debe proporcionar las siguientes entradas: clientId

## Respuesta exitosa

```http
GET http://localhost:4000/api/client?clientId=997879c8-fdac-4544-a7de-68755840d979
```

## Respuesta mala

El clientId debe ser valido. La siguiente petición arrojara un error:

```http
GET http://localhost:4000/api/client?clientId=1234
```
