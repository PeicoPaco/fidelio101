"use strict"

const {db} = require('../fb');
const {addDataByEmail, getData, getAllData, updateData, deleteData} = require('../common-core/constConsume')
const {makeModel} = require('../common-core/modelsConsume')

let collectionName = "users";

const addUser = async (req, res) => {
    addDataByEmail(req, res, collectionName);
}

const getAllNoDeletedUsers = async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const amount = parseInt(req.params.amount);
    const lastIdObj = req.params.lastIdObj;
    const usersArray = [];
    if (index == 1) {
      const users = await db.collection(collectionName).where('isDeleted', '==', false)
          .orderBy('name', 'desc');
      const data = await users.limit(amount).get();
      if(data.empty) {
        res.status(404).send('No users record found');
      } else {
        data.forEach(doc => {
          const model = makeModel(collectionName,doc);
          usersArray.push(model);
        });
        res.send(usersArray);
      }
    } else {
      await db.collection(collectionName).doc(lastIdObj).get().then(doc => {
        const users = db.collection(collectionName).where('isDeleted', '==', false)
            .orderBy('name', 'desc').startAfter(doc.data().name);
        users.limit(amount).get().then(data => {
          if(data.empty) {
            res.status(404).send('No users record found');
          } else {
            data.forEach(doc => {
              const model = makeModel(collectionName,doc);
              usersArray.push(model);
              });
            }    
          res.send(usersArray);
        });
      });
    }
  } catch (error) {
      res.status(400).send(error.message);
  }
}

const getAllUsers = async (req, res) => {
  getAllData(req, res, collectionName);
}

const getUser = async (req, res) => {
  getData(req, res, collectionName);
}

const updateUser = async (req, res) => {
  updateData(req, res, collectionName);
}

const deleteUser = async (req, res, next) => {
  deleteData(req, res, collectionName);
}

module.exports = {
  getAllUsers,
  getAllNoDeletedUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
}