"use strict"

const {
  addData, 
  getData, 
  getAllData,
  getAllActivedData,
  getAllNoDeletedData, 
  updateData,
  deleteLogicData,
  deleteData} = require('../common-core/constConsume')

let collectionName = "category";

const addCategory = async (req, res) => {
  addData(req, res, collectionName);
}

const getAllNoDeletedCategory = async (req, res) => {
  getAllNoDeletedData(req, res, collectionName);
}

const getAllActiveCategory = async (req, res) => {
  getAllActivedData(req, res, collectionName);
}

const getAllCategory = async (req, res) => {
  getAllData(req, res, collectionName);
}

const getCategory = async (req, res) => {
  getData(req, res, collectionName);
}

const updateCategory = async (req, res) => {
  updateData(req, res, collectionName);
}

const deleteLogicCategory = async (req, res) => {
  deleteLogicData(req, res, collectionName);
}

const deleteCategory = async (req, res) => {
  deleteData(req, res, collectionName);
}

module.exports = {
    addCategory,
    getAllNoDeletedCategory,
    getAllActiveCategory,
    getAllCategory,
    getCategory,
    updateCategory,
    deleteLogicCategory,
    deleteCategory,
}