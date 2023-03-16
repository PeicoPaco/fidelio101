class  StaffFidelio {

    constructor(id, name, lastName, dni, email, profile, createdBy, lastLogin, fidelioTeam, createdAt, giveAccessAt, giveAccessBy, removeAccessAt, removeAccessBy, role, isActive, isDeleted) {

        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.dni = dni;
        this.email = email;
        this.profile = profile;
        this.createdBy = createdBy;
        this.lastLogin = lastLogin;
        this.fidelioTeam = fidelioTeam;
        this.createdAt = createdAt;
        this.giveAccessAt = giveAccessAt;
        this.giveAccessBy = giveAccessBy;
        this.removeAccessAt = removeAccessAt;
        this.removeAccessBy = removeAccessBy;
        this.role = role;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
    }
}

module.exports = StaffFidelio;