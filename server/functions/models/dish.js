class Dish {
  constructor(id, name, price, description, url, clientId, createdAt, createdBy, isActive, isDeleted) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.url = url;
    this.clientId = clientId;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.isActive = isActive;
    this.isDeleted = isDeleted;
  }
}

module.exports = Dish;