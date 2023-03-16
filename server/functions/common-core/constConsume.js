"use strict"

const {db} = require('../fb');
const {makeModel,addModel} = require('../common-core/modelsConsume')

const addDataByDni = async (req, res, collectionName) => {
    const data = req.body;
    const modelAdd = addModel(collectionName, data)
    const refCollection = db.collection(collectionName).where("email", "==", data.email);
    await refCollection.get()
    .then((querySnapshot) => {
          if (querySnapshot.empty) {
              db.collection(collectionName).doc(data.dni).create(modelAdd).then(() => {
                  res.send(`${collectionName} saved successfuly`);
              }).catch((error) => {
                  res.status(404).json({"code": error.code, "message": error.details});
              });
          } else {
              res.status(404).json({"code": "BF-1", "message": "The email already exists"});
          }
      })
}

const addData = async (req, res, collectionName) => {
    try{
        const data = req.body;
        const modelAdd = addModel(collectionName, data)
        await db.collection(collectionName).add(modelAdd);
        res.send(`${collectionName} saved successfuly`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllData = async (req, res, collectionName) => {
    try {
      const dataRef = db.collection(collectionName);
      const data = await dataRef.get(); 
      const dataArray = [];
      if(data.empty) {
          res.status(404).send(`No ${collectionName} record found`);
      }else {
          data.forEach(doc => {
                const model = makeModel(collectionName,doc);
                dataArray.push(model);
          });
          dataArray.sort((a, b) => b.createdAt - a.createdAt);
          res.send(dataArray);
      }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllNoDeletedData = async (req, res, collectionName) => {
    try{        
        const dataRef = await db.collection(collectionName).where('isDeleted', '==', false);
        const data = await dataRef.get();
        const dataArray = [];
        if(data.empty){
            res.status(404).send(`No ${collectionName} record found`);
        }else{
            data.forEach(doc => {
                const model = makeModel(collectionName,doc);
                dataArray.push(model);
            });
            dataArray.sort((a, b) => b.createdAt - a.createdAt);
            res.send(dataArray);
        }        
    } catch(error){
        res.status(400).send(error.message);
    }
}

const getAllActivedData = async (req, res, collectionName) => {
    try{        
        const dataRef = await db.collection(collectionName).where('isActive', '==', true);
        const data = await dataRef.get();
        const dataArray = [];
        if(data.empty){
            res.status(404).send(`No ${collectionName} record found`);
        }else{
            data.forEach(doc => {
                const model = makeModel(collectionName,doc);
                dataArray.push(model);
            });
            dataArray.sort((a, b) => b.createdAt - a.createdAt);
            res.send(dataArray);
        }        
    } catch(error){
        res.status(400).send(error.message);
    }
}

const getData = async (req, res,collectionName) => {
    try {
      const id = req.params.id;
      const dataRef = await db.collection(collectionName).doc(id);
      const data = await dataRef.get();
      if(data.empty) {
          res.status(404).send(`No ${collectionName} record found`);
      } else {
        (data.data().isDeleted == true) ? 
        res.status(404).send(`${collectionName} is deleted`) 
        : res.send(data.data());
      }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateData = async (req, res, collectionName) => {
    try {
        const id = req.params.id;
        const dataUpdate = req.body;
        const dataRef = db.collection(collectionName).doc(id);
        const data = await dataRef.get();
        if(data.exists == false) {
            res.status(404).json({"code": "BF-2","message": `No ${collectionName} record found`});
        } else if (data.data().isDeleted == true) {
            res.status(404).send(`${collectionName} is deleted`);
        } else {
            await dataRef.update(dataUpdate);
            res.status(200).json({"message":`${collectionName} updated successfuly`});
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteLogicData = async (req,res, collectionName) => {
    const id = req.params.id;
    const dataRef = db.collection(collectionName).doc(id);
    const data = await dataRef.get();
    if(data.exists == false) {
        res.status(404).json({"code": "BF-2","message": `No ${collectionName} record found`});
    } else if (data.data().isDeleted == true) {
        res.status(404).json({"code":"BF-6","message": `${collectionName} is already deleted`});
    } else {
        await dataRef.update({isDeleted: true,isActive: false,profile:[]});
        res.status(200).json({"code":"BF-7","message":`${collectionName} deleted successfuly`});
    }
}

const deleteData = async (req, res, collectionName) => {
    try {
        const id = req.params.id;
        await db.collection(collectionName).doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addData,
    addDataByDni,
    getAllNoDeletedData,
    getData,
    getAllData,
    getAllActivedData,
    updateData,
    deleteLogicData, 
    deleteData,
};