# Actualizar un empleado

**URL**: `/api/employee`

**Metodo**: `PUT`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Entradas obligatorias: employeeId

Entradas opcionales: name, surname, email, nroDocument y birthDate

## Respuesta exitosa

Actualizando el nombre de un empleado

```http
PUT http://localhost:4000/api/employee?employeeId=3e3cee98-5594-4e95-9476-54e00f0710ea
Content-Type: application/json

{
  "name": "Carlos"
}
```

## Respuesta mala

La entreda birthDate debe tener la siguiente estructura "fecha hora". La siguiente petición arrojara un error:

```http
PUT http://localhost:4000/api/employee
Content-Type: application/json

{
  "birthDate": "02/10/2021"
}
```
