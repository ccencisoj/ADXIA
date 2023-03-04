export class Order {
  constructor(data) {
    this.id = data.id;
    this.clientId = data.clientId,
    this.employeeId = data.employeeId;
    this.createdAt = data.createdAt;
    this.deliveredAt = data.deliveredAt;
  }
}
