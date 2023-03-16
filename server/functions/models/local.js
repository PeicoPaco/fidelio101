class Local {
    constructor(id, name, address, startsAt, endsAt, image, locationId, nameLocation, clientId, nameClient, createdAt, createdBy, isActive, isDeleted) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
        this.image = image;
        this.locationId = locationId;
        this.nameLocation = nameLocation;
        this.clientId = clientId;
        this.nameClient = nameClient;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
    }
}

module.exports = Local;