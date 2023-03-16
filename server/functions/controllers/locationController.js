"use strict"

const {
  addData, 
  getData, 
  getAllData, 
  getAllNoDeletedData, 
  getAllActivedData,
  updateData,
  deleteData} = require('../common-core/constConsume')

let collectionName = "location";

const addLocation = async (req, res) => {
  addData(req, res, collectionName);
}

const getAllNoDeletedLocation = async (req, res) => {
  getAllNoDeletedData(req, res, collectionName);
}

const getAllActivedLocation = async (req, res) => {
  getAllActivedData(req, res, collectionName);
}

const getAllLocation = async (req, res) => {
  getAllData(req, res, collectionName);
}

const getLocation = async (req, res) => {
  getData(req, res, collectionName);
}

const updateLocation = async (req, res) => {
  updateData(req, res, collectionName);
}

const deleteLocation = async (req, res) => {
  deleteData(req, res, collectionName);
}

module.exports = {
    addLocation,
    getAllNoDeletedLocation,
    getAllActivedLocation,
    getAllLocation,
    getLocation,
    updateLocation,
    deleteLocation,
}