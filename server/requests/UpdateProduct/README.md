# Actualizar un producto

**URL**: `/api/product`

**Metodo**: `PUT`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Entradas obligatorias: productId

Entradas opcionales: name, brand, avaliableQuantity, price y imageURL

## Respuesta exitosa

Actualizando el nombre y la marca del producto

```http
PUT http://localhost:4000/api/product
Content-Type: application/json

{
  "name": "Producto increible",
  "brand": "Nestle Plus"
}
```

## Respuesta mala

Debe ingresar un nombre con longitud mayor a 2 caracteres. La siguiente petición arroja un error:

```http
PUT http://localhost:4000/api/product
Content-Type: application/json

{
  "name": "a",
}
```

Las entradas avaliableQuantity y price deben ser mayor o igual a 0. La siguiente petición arroja un error:

```http
PUT http://localhost:4000/api/product
Content-Type: application/json

{
  "avaliableQuantity": -4,
  "price": -2
}
```
