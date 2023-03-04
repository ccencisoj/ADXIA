# Crear un pedido

**URL**: `/api/product`

**Metodo**: `POST`

**Autenticación requerida**: Si

**Permisos requeridos**: Ninguno

Se debe proporcionar las siguientes entradas: name, brand, avaliableQuantity, price y imageURL

## Respuesta exitosa

Realizamos la siguiente petición
```http
POST http://localhost:4000/api/product
Content-Type: application/json

{
  "name": "Producto 4",
  "brand": "Nestle",
  "avaliableQuantity": 20,
  "price": 2500,
  "imageURL": "http://localhost:4000/api/tempImage/d006cdc0-77af-47dd-aff3-5eb66ecbc7df",
  "description": "un producto",
  "grammage": "x250"
}
```

Obtenemos:
```json
{
  "product": {
    "id": "bb0a5242-359d-42c1-88d9-d424a772f3ec",
    "name": "Producto 4",
    "brand": "Nestle",
    "avaliableQuantity": 20,
    "price": 2500,
    "imageURL": "http://localhost:4000/api/tempImage/d006cdc0-77af-47dd-aff3-5eb66ecbc7df",
    "description": "un producto",
    "grammage": "x250"
  }
}
```
