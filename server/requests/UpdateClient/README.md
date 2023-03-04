# Actualizar un cliente

**URL**: `/api/client`

**Metodo**: `PUT`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Entradas obligatorias: clientId

Entradas opcionales: name, surname, nroDocument y phoneNumber

## Respuesta exitosa

```http
PUT http://localhost:4000/api/client?clientId=3e3cee98-5594-4e95-9476-54e00f0710ea
Content-Type: application/json

{
  "name": "andres",
  "surname": "enciso",
  "nroDocument": "1006692258",
  "phoneNumber": "+57 3116537527"
}
```

## Respuesta mala

Las entradas no deben ser vacias. La siguiente petición arrojara un error:

```http
PUT http://localhost:4000/api/client?clientId=3e3cee98-5594-4e95-9476-54e00f0710ea
Content-Type: application/json

{
  "name": ""
}
```

El nombre y el surname deben tener un longitud minima de 2 caracteres. La siguiente petición arrojara un error:

```http
PUT http://localhost:4000/api/client?clientId=3e3cee98-5594-4e95-9476-54e00f0710ea
Content-Type: application/json

{
  "name": "a",
  "surname": "b"
}
```
