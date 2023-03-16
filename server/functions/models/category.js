class FoodCourt {
    constructor(id, name, urlImage, createdAt, createdBy,isActive, isDeleted) {
        this.id = id;
        this.name = name;
        this.urlImage = urlImage;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
    }
  }
  
  module.exports = FoodCourt;