export class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.brand = data.brand;
    this.avaliableQuantity = data.avaliableQuantity;
    this.price = data.price;
    this.imageURL = data.imageURL;
  }
}
