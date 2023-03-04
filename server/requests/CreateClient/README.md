# Crear un cliente

**URL**: `/api/client`

**Metodo**: `POST`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Se debe proporcionar las siguientes entradas: name, surname, nroDocument y phoneNumber

## Respuesta exitosa
```http
POST http://localhost:4000/api/client
Content-Type: application/json

{
  "name": "andres",
  "surname": "enciso",
  "nroDocument": "1006692258",
  "phoneNumber": "+57 3116537527"
}
```

## Respuesta mala

Debe ingresar todas las entradas mencionadas. La siguiente petición arrojara un error:

```http
POST http://localhost:4000/api/client
Content-Type: application/json

{
  "name": "andres",
  "surname": "enciso"
}
```

Las entradas no deben ser vacias. La siguiente petición arrojara un error:

```http
POST http://localhost:4000/api/client
Content-Type: application/json

{
  "name": "",
  "surname": "",
  "nroDocument": "",
  "phoneNumber": ""
}
```

El nombre y el surname deben tener un longitud minima de 2 caracteres. La siguiente petición arrojara un error:

```http
POST http://localhost:4000/api/client
Content-Type: application/json

{
  "name": "a",
  "surname": "b",
  "nroDocument": "1006692259",
  "phoneNumber": "+57 3116537527"
}
```

El numero de telefono debe tener la siguiente estructura "code numero" La siguiente petición arrojara un error:

```http
POST http://localhost:4000/api/client
Content-Type: application/json

{
  "phoneNumber": "3116537527"
}
```
