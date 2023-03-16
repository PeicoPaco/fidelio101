class User {
  constructor(id, name, account, email, timestamp, createBy, isActive, isDeleted) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.account = account;
    this.timestamp = timestamp;
    this.createBy = createBy;
    this.isActive = isActive;
    this.isDeleted = isDeleted;
  }
}

module.exports = User;