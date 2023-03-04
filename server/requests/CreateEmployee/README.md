# Crear un empleado

**URL**: `/api/employee`

**Metodo**: `POST`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Se debe proporcionar las siguientes entradas: name, surname, email, nroDocument y birthDate

## Respuesta exitosa

```http
POST http://localhost:4000/api/employee
Content-Type: application/json

{
  "name": "Carlos",
  "surname": "Martinez",
  "email": "pedro@gmail.com",
  "nroDocument": "1002223322",
  "birthDate": "02/10/2021 00:00"
}
```

## Respuesta mala

Debe ingresar todas las entradas mencionadas. La siguiente petición arrojara un error:

```http
POST http://localhost:4000/api/employee
Content-Type: application/json

{
  "name": "Carlos",
  "surname": "Martinez"
}
```

La entreda birthDate debe tener la siguiente estructura "fecha hora". La siguiente petición arrojara un error:

```http
POST http://localhost:4000/api/employee
Content-Type: application/json

{
  "birthDate": "02/10/2021"
}
```
