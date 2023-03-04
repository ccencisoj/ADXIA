# Obtener empleado por id

**URL**: `/api/employee`

**Metodo**: `GET`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Se debe proporcionar las siguientes entradas: employeeId

## Respuesta exitosa

```http
GET http://localhost:4000/api/employee?employeeId=997879c8-fdac-4544-a7de-68755840d979
```

## Respuesta mala

El employeeId debe ser valido. La siguiente petición arrojara un error:

```http
GET http://localhost:4000/api/employee?employeeId=1234
```
