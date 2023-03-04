# Eliminar un empleado

**URL**: `/api/employee`

**Metodo**: `DELETE`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Se debe proporcionar las siguientes entradas: employeeId

## Respuesta exitosa

```http
DELETE http://localhost:4000/api/employee?employeeId=997879c8-fdac-4544-a7de-68755840d979
```

## Respuesta mala

Debe ingresar un employeeId valido. La siguiente petición arrojara un error:

```http
DELETE http://localhost:4000/api/employee?employeeId=1234
```
