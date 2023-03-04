# Eliminar un cliente

**URL**: `/api/client`

**Metodo**: `DELETE`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Se debe proporcionar las siguientes entradas: clientId

## Respuesta exitosa

```http
DELETE http://localhost:4000/api/client?clientId=997879c8-fdac-4544-a7de-68755840d979
```

## Respuesta mala

Debe ingresar un clientId valido. La siguiente petición arrojara un error:

```http
DELETE http://localhost:4000/api/client?clientId=1234
```
