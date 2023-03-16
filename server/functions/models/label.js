class Label {
    constructor(id, name, displayName, clientId, dishes, createdBy, createdAt, isActive, isDeleted) {
        this.id = id;
        this.name = name;
        this.displayName = displayName;
        this.clientId = clientId;
        this.dishes = dishes;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
    }
}

module.exports = Label;