class Location {
  constructor(id, name, address, startsAt, endsAt, latitud, longitud, radio, locationType, createdAt, createdBy,isActive, isDeleted) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.startsAt = startsAt;
      this.endsAt = endsAt;
      this.latitud = latitud;
      this.longitud = longitud;
      this.radio = radio;
      this.locationType = locationType;
      this.createdAt = createdAt;
      this.createdBy = createdBy;
      this.isActive = isActive;
      this.isDeleted = isDeleted;
  }
}

module.exports = Location;