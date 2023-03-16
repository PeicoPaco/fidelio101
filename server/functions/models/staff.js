class Staff {
    constructor(dni, name, lastName, email, profile, createdBy, createdAt, lastLogin, giveAccessAt, giveAccessBy, removeAccessAt, removeAccessBy, role, idLocal, nameLocal, clientId, nameClient, isActive, isDeleted) {
        this.dni = dni;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.profile = profile;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.lastLogin = lastLogin;
        this.giveAccessAt = giveAccessAt;
        this.giveAccessBy = giveAccessBy;
        this.removeAccessAt = removeAccessAt;
        this.removeAccessBy = removeAccessBy;
        this.role = role;
        this.idLocal = idLocal;
        this.nameLocal = nameLocal;
        this.clientId = clientId;
        this.nameClient = nameClient;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
    }
}

module.exports = Staff;