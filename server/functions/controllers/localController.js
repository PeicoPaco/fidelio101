"use strict"

const {
  addData, 
  getData, 
  getAllData, 
  getAllNoDeletedData, 
  getAllActivedData,
  updateData,
  deleteLogicData} = require('../common-core/constConsume')
const {addModel} = require('../common-core/modelsConsume')
const {db} = require('../fb');

let collectionName = "local";

const addLocal = async (req, res) => {
  const reData = req.body;
  const nameLocation = reData.nameLocation;
  const nameClient = reData.nameClient;
  const locationRef = db.collection('location').where('name', '==', nameLocation)
  let locationId = " ";
  await locationRef.get().then(async (querySnapshot) => {
    querySnapshot.forEach(async (doc) => {
      locationId = doc.id;
    });
  })
  const clientRef = db.collection('clients').where('name', '==', nameClient)
  let clientId = " ";
  await clientRef.get().then(async (querySnapshot) => {
    querySnapshot.forEach(async (doc) => {
      clientId = doc.id;
    });
  });
   console.log(locationId +"//"+ clientId);
  const data = {
    name: reData.name,
    address: reData.address,
    startsAt: reData.startsAt,
    endsAt: reData.endsAt,
    image: reData.image,
    nameLocation: nameLocation,
    locationId:locationId,
    clientId: clientId,
    nameClient:nameClient,
    createdBy: reData.createdBy,
  }
  const modelAdd = addModel(collectionName, data);
  await db.collection(collectionName).add(modelAdd)
  res.send(`${collectionName} saved successfuly`);
}

const getAllNoDeletedLocals = async (req, res) => {
  getAllNoDeletedData(req, res, collectionName);
}

const getAllActivedLocals = async (req, res) => {
  getAllActivedData(req, res, collectionName);
}

const getAllNoDeletedByClientIdLocals = async (req, res) => {
  const refLocal = db.collection(collectionName).where('clientId', '==', req.params.id).where('isActive', '==', true);
  let locals = [];
  await refLocal.get().then(async (querySnapshot) => {
    if(!querySnapshot.empty){
        querySnapshot.forEach(async (doc) => {
          locals.push(doc.data());
      });
      locals.sort((a, b) => b.createdAt - a.createdAt);
      res.send(locals);
    } else {
      res.status(404).json({error: `No ${collectionName}s found`});
    }
  }).catch((error) => {
    res.status(400).send("Error getting documents:" + error);
  });
}

const getAllLocals = async (req, res) => {
  getAllData(req, res, collectionName);
}

const getLocal = async (req, res) => {
  getData(req, res, collectionName);
}

const updateLocal = async (req, res) => {
  updateData(req, res, collectionName);
}

const deleteLogicLocal = async (req, res) => {
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

const deleteLocal = async (req, res) => {
  deleteLogicData(req, res, collectionName);
}

module.exports = {
  addLocal,
  getAllNoDeletedLocals,
  getAllActivedLocals,
  getAllNoDeletedByClientIdLocals,
  getAllLocals,
  getLocal,
  updateLocal,
  deleteLogicLocal,
  deleteLocal
}