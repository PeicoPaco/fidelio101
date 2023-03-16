class Clients {
    constructor(id, name, legalRepresentative, phone, email, legalAddress, ruc, locationType, createdAt, createdBy, isActive, isDeleted) {
      this.id = id;
      this.name = name;
      this.legalRepresentative = legalRepresentative;
      this.phone = phone;
      this.email = email;
      this.legalAddress = legalAddress;
      this.ruc = ruc;
      this.locationType = locationType;
      this.createdAt = createdAt;
      this.createdBy = createdBy;
      this.isActive = isActive;
      this.isDeleted = isDeleted;
    }
}
  
module.exports = Clients;