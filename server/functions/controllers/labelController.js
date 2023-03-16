"use strict"

const {db} = require('../fb');
const {
    makeModel,
    addModel} = require('../common-core/modelsConsume')

let collectionName = "clients";
let subCollectionName = "label";

const addLabel = async (req, res) => {
    try{
        const data = req.body;
        const modelAdd = addModel(subCollectionName, data)
        await db.collection(collectionName).doc(data.clientId)
          .collection(subCollectionName).add(modelAdd);
        res.send("Record saved successfuly");
    } catch (error) {
      res.status(400).send(error.message);
  }
}

const getAllNoDeletedLabels = async (req, res) => {
    try{
        const clientId = req.params.id;
        const labelRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName).where('isDeleted', '==', false);
        const data = await labelRef.get();
        const labelArray = [];
        if(data.empty){
          res.status(404).send('No Label record found');
        }else{
          data.forEach(doc => {
            const model = makeModel(subCollectionName,doc);
            labelArray.push(model);
          });
          labelArray.sort((a, b) => b.createdAt - a.createdAt);
          res.send(labelArray);
        }
      } catch (error) {
        res.status(400).send(error.message);
      }
}

const getAllActiveLabels = async (req, res) => {
  try{
      const clientId = req.params.id;
      const labelRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName).where('isActive', '==', false);
      const data = await labelRef.get();
      const labelArray = [];
      if(data.empty){
        res.status(404).send('No Label record found');
      }else{
        data.forEach(doc => {
          const model = makeModel(subCollectionName,doc);
          labelArray.push(model);
        });
        labelArray.sort((a, b) => b.createdAt - a.createdAt);
        res.send(labelArray);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
}

const getAllLabels = async (req, res) => {
    try{
        const clientId = req.params.id;
        const labelRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName);
        const data = await labelRef.get();
        const labelArray = [];
        if(data.empty){
          res.status(404).send('No label record found');
        }else{
          data.forEach(doc => {
            const model = makeModel(subCollectionName,doc);
            labelArray.push(model);
          });
          labelArray.sort((a, b) => b.createdAt - a.createdAt);
          res.send(labelArray);
        }
      } catch (error) {
        res.status(400).send(error.message);
      }
}

const getLabel = async (req, res) => {
  try{
      const clientId = req.params.clientId;
      const labelId = req.params.idlabel;
      const labelRef = db.collection(collectionName).doc(clientId)
        .collection(subCollectionName).doc(labelId);
      await labelRef.get().then(doc => {
        if(!doc.exists){
          res.status(404).send('label with the given ID not found');
        }else{
          (doc.data().isDeleted == true) ? 
          res.status(404).send('label is deleted') 
          : res.send(doc.data());
        }
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
}

const updateLabel = async (req, res) => {
    try{
        const dataUpdate = req.body;
        const clientId = req.body.clientId;
        const id = req.params.id;
        const label = db.collection(collectionName).doc(clientId).collection(subCollectionName).doc(id);
        const data = await label.get();
        if(data.exists == false) {
            res.status(404).send('No label record found');
        } else if (data.data().isDeleted == true) {
            res.status(404).send('label is deleted');
        } else {
            await label.update(dataUpdate);
            res.send('Label updated successfuly');
        }
    } catch(error){
        res.status(400).send(error.message);
      }
}

const deleteLogicStaff = async (req, res) => {
  const clientId = req.body.clientId;
  const id = req.params.id;
  const refStafff = db.collection(collectionName).doc(clientId).collection(subCollectionName).doc(id);
  const data = await refStafff.get();
  if(data.exists == false) {
      res.status(404).json({"code": "BF-2","message": `No ${subCollectionName} record found`});
  } else if (data.data().isDeleted == true) {
      res.status(404).json({"code":"BF-6","message": `${subCollectionName} is already deleted`});
  } else {
      refStafff.update({isDeleted: true,isActive: false});
  }
}

const deleteLabel = async (req, res) => {
    try{
        const clientId = req.body.clientId;
        const id = req.params.id;
        const label = db.collection(collectionName).doc(clientId).collection(subCollectionName).doc(id);
        await label.delete();
      } catch (error) {
        res.status(400).send(error.message);
      }
}

module.exports = {
    addLabel,
    getAllNoDeletedLabels,
    getAllActiveLabels,
    getAllLabels,
    getLabel,
    updateLabel,
    deleteLogicStaff,
    deleteLabel,
}