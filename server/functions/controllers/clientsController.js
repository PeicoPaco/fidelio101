"use strict"

const {
    addData, 
    getData,
    getAllData, 
    getAllNoDeletedData, 
    getAllActivedData,
    updateData, 
    deleteLogicData,
    deleteData} = require('../common-core/constConsume')

const {db} = require('../fb');

let collectionName = "clients";

const addClient = async (req, res) => {
    addData(req, res, collectionName);
}

const getAllNoDeletedClients = async (req, res) => {
    getAllNoDeletedData(req, res, collectionName);
}

const getAllActivedClients = async (req, res) => {
    getAllActivedData(req, res, collectionName);
}

const getAllClients = async (req, res) => {
    getAllData(req, res, collectionName);
}

const getClient = async (req, res) => {
    getData(req, res, collectionName);
}

const updateClient = async (req, res) => {
    console.log(req.body)
    updateData(req, res, collectionName);
}

const deleteLogicClient = async (req, res) => {
    const id = req.params.id;
    const dataRef = db.collection(collectionName).doc(id);
    const data = await dataRef.get();
    if(data.exists == false) {
        res.status(404).json({"code": "BF-2","message": `No ${collectionName} record found`});
    } else if (data.data().isDeleted == true) {
        res.status(404).json({"code":"BF-6","message": `${collectionName} is already deleted`});
    } else {
        await dataRef.update({isDeleted: true,isActive: false});
        res.status(200).json({"code":"BF-7","message":`${collectionName} deleted successfuly`});
    }
}

const deleteClient = async (req, res) => {
    deleteData(req, res, collectionName);
}

module.exports = {
    addClient,
    getAllNoDeletedClients,
    getAllActivedClients,
    getAllClients,
    getClient,
    updateClient,
    deleteLogicClient,
    deleteClient
}