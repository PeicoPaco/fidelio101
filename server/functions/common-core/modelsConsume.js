"use strict"

const User = require('../models/user');
const Client = require('../models/clients');
const Local = require('../models/local');
const Category = require('../models/category');
const Staff = require('../models/staff');
const Dish = require('../models/dish');
const Label = require('../models/label');
const StaffFidelio = require('../models/staffFidelio');
const Location = require('../models/location');

const makeModel = (model, doc) => {
    switch (model) {
        case 'staffFidelio':
            const staffFidelio = new StaffFidelio(
                doc.id,
                doc.data().name,
                doc.data().lastName,
                doc.data().dni,
                doc.data().email,
                doc.data().profile,
                doc.data().createdBy,
                doc.data().lastLogin,
                doc.data().fidelioTeam,
                doc.data().createdAt,
                doc.data().giveAccessAt,
                doc.data().giveAccessBy,
                doc.data().removeAccessAt,
                doc.data().removeAccessBy,
                doc.data().role,
                doc.data().isActive,
                doc.data().isDeleted
            );
            return staffFidelio;
        case 'users':
            const user = new User(
                doc.id,
                doc.data().name,
                doc.data().account,
                doc.data().email,
                doc.data().timestamp,
                doc.data().isActive,
                doc.data().isDeleted
            );
            return user;
        case 'dish':
            const dish = new Dish(
                doc.id,
                doc.data().name,
                doc.data().price,
                doc.data().description,
                doc.data().url,
                doc.data().clientId,
                doc.data().createdBy,
                doc.data().createdAt,
                doc.data().isActive,
                doc.data().isDeleted
              );
            return dish;
        case 'staff':
            const staff = new Staff(
                doc.id,
                doc.data().name,
                doc.data().lastName,
                doc.data().email,
                doc.data().profile,
                doc.data().createdBy,
                doc.data().createdAt,
                doc.data().lastLogin,
                doc.data().giveAccessAt,
                doc.data().giveAccessBy,
                doc.data().removeAccessAt,
                doc.data().removeAccessBy,
                doc.data().role,
                doc.data().idLocal,
                doc.data().nameLocal,
                doc.data().clientId,
                doc.data().nameClient,
                doc.data().isActive,
                doc.data().isDeleted
            );
            return staff;
        case 'clients':
            const client = new Client(
                doc.id,
                doc.data().name,
                doc.data().legalRepresentative,
                doc.data().phone,
                doc.data().email,
                doc.data().legalAddress,
                doc.data().ruc,
                doc.data().locationType,
                doc.data().createdAt,
                doc.data().createdBy,
                doc.data().isActive,
                doc.data().isDeleted
            );
            return client;
        case 'local':
            const local = new Local(
                doc.id,
                doc.data().name,
                doc.data().address,
                doc.data().startsAt,
                doc.data().endsAt,
                doc.data().image,
                doc.data().locationId,
                doc.data().nameLocation,
                doc.data().clientId,
                doc.data().nameClient,
                doc.data().createdAt,
                doc.data().createdBy,
                doc.data().isActive,
                doc.data().isDeleted
            );
          return local;
        case 'category':
            const category = new Category(
                doc.id,
                doc.data().name,
                doc.data().urlImage,
                doc.data().createdAt,
                doc.data().createdBy,
                doc.data().isActive,
                doc.data().isDeleted
            );
            return category;
        case 'label':
            const label = new Label(
                doc.id,
                doc.data().name,
                doc.data().displayName,
                doc.data().clientId,
                doc.data().dishes,
                doc.data().createdBy,
                doc.data().createdAt,
                doc.data().isActive,
                doc.data().isDeleted
            );
            return label;
        case 'location':
            const location = new Location(
                doc.id,
                doc.data().name,
                doc.data().address,
                doc.data().startsAt,
                doc.data().endsAt,
                doc.data().latitud,
                doc.data().longitud,
                doc.data().radio,
                doc.data().locationType,
                doc.data().createdAt,
                doc.data().createdBy,
                doc.data().isActive,
                doc.data().isDeleted
            );
            return location
        default:
            console.log('No model found');
            return null;
      }
}

const addModel = (model, data) =>{
    switch (model) {
        case 'staffFidelio':
            const staffFidelio = {
                name: data.name,
                dni: data.dni,
                lastName: data.lastName,
                email: data.email,
                profile: [],
                createdBy: data.createdBy,
                fidelioTeam: data.fidelioTeam,
                createdAt: new Date(),
                lastLogin: " ",
                giveAccessAt: " ",
                giveAccessBy: " ",
                removeAccessAt: " ",
                removeAccessBy: " ",
                role: data.role,
                isActive: true,
                isDeleted: false,
            };
            return staffFidelio;
        case 'users':
            const user = {
                email: data.email,
                name: data.name,
                account: data.account,
                timestamp: new Date(),
                createdBy: data.createdBy,
                isDeleted: false,
                isActive: true,
              };
            return user;
        case 'dish':
            const dish = {
                name: data.name,
                price: data.price,
                description: data.description,
                url: data.url,
                clientId: data.clientId,
                createdAt: new Date(),
                createdBy: data.createdBy,
                isActive: true,
                isDeleted: false
              };
            return dish;
        case 'staff':
            const staff = {
                name: data.name,
                lastName: data.lastName,
                email: data.email,
                profile: [],
                createdAt: new Date(),
                createdBy: data.createdBy,
                lastLogin: " ",
                giveAccessAt: " ",
                giveAccessBy: " ",
                removeAccessAt: " ",
                removeAccessBy: " ",
                role: data.role,
                idLocal: data.idLocal,
                nameLocal: data.nameLocal,
                clientId: data.clientId,
                nameClient: data.nameClient,
                isActive: true,
                isDeleted: false,
            };
            return staff;
        case 'local':
            const local = {
                name: data.name,
                address: data.address,
                startsAt: data.startsAt,
                endsAt: data.endsAt,
                image: data.image,
                locationId: data.locationId,
                nameLocation: data.nameLocation,
                clientId: data.clientId,
                nameClient: data.nameClient,
                createdAt: new Date(),
                createdBy: data.createdBy,
                isActive: true,
                isDeleted: false
            };
            return local;
        case 'clients':
            const clients = {
                name: data.name,
                legalRepresentative: data.legalRepresentative,
                phone: data.phone,
                email: data.email,
                legalAddress: data.legalAddress,
                ruc: data.ruc,
                locationType: data.locationType,
                createdAt: new Date(),
                createdBy: data.createdBy,
                isActive: true,
                isDeleted: false
            };
            return clients;
        case 'category':
            const category = {
                name: data.name,
                urlImage: data.urlImage,
                createdAt: new Date(),
                createdBy: data.createdBy,
                isActive: true,
                isDeleted: false,
            };
            return category;
        case 'label':
            const label = {
                name: data.name,
                displayName: data.displayName,
                clientId: data.clientId,
                dishes: data.dishes,
                createdAt: new Date(),
                createdBy: data.createdBy,
                isActive: true,
                isDeleted: false,
            };
            return label;
        case 'location':
                const location = {
                    name: data.name,
                    address: data.address,
                    startsAt: data.startsAt,
                    endsAt: data.endsAt,
                    latitud: data.latitud,
                    longitud: data.longitud,
                    radio: data.radio,
                    locationType: data.locationType,
                    createdAt: new Date(),
                    createdBy: data.createdBy,
                    isActive: true,
                    isDeleted: false,
                };
                return location;
        default:
            console.log('No model found');
            return null;
    }

}

module.exports = {makeModel,addModel};