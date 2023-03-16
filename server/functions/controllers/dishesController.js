"use strict"

const {db, storage} = require('../fb');
const {v4: uuidv4} = require("uuid");
const formidable = require('formidable-serverless');
const cors = require('cors')({origin: true});
const {makeModel,addModel} = require('../common-core/modelsConsume')

let collectionName = "clients";
let subCollectionName = "dish";

const addDish = async (req, res) => {
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

const getAllNoDeletedDishes = async (req, res) => {
  try{
    const clientId = req.params.id;
    const dishRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName).where('isDeleted', '==', false);
    const data = await dishRef.get();
    const dishArray = [];
    if(data.empty){
      res.status(404).send('No dish record found');
    }else{
      data.forEach(doc => {
        const model = makeModel(subCollectionName,doc);
        dishArray.push(model);
      });
      dishArray.sort((a, b) => b.createdAt - a.createdAt);
      res.send(dishArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getAllActiveDishes = async (req, res) => {
  try{
    const clientId = req.params.id;
    const dishRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName).where('isActive', '==', false);
    const data = await dishRef.get();
    const dishArray = [];
    if(data.empty){
      res.status(404).send('No dish record found');
    }else{
      data.forEach(doc => {
        const model = makeModel(subCollectionName,doc);
        dishArray.push(model);
      });
      dishArray.sort((a, b) => b.createdAt - a.createdAt);
      res.send(dishArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getAllDishes = async (req, res) => {
  try{
    const clientId = req.params.id;
    const dishRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName);
    const data = await dishRef.get();
    const dishArray = [];
    if(data.empty){
      res.status(404).send('No dish record found');
    }else{
      data.forEach(doc => {
        const model = makeModel(subCollectionName,doc);
        dishArray.push(model);
      });
      dishArray.sort((a, b) => b.createdAt - a.createdAt);
      res.send(dishArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getDish = async (req, res) => {
  try{
    const clientId = req.params.clientId;
    const dishId = req.params.iddish;
    const dishRef = db.collection(collectionName).doc(clientId)
      .collection(subCollectionName).doc(dishId);
    const data = await dishRef.get();
    if(data.empty){
      res.status(404).send('Dish with the given ID not found');
    }else{
        res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const updateDish = async (req, res) => {
  try{
      const dataUpdate = req.body;
      const price = req.body.price;
      const clientId = req.body.clientId;
      const id = req.params.id;
      const collectionRef = db.collection(collectionName).doc(clientId);
      const dish = collectionRef.collection(subCollectionName).doc(id);
      await dish.get().then((doc) => {
          if (!doc.exists) {
              res.status(404).send('No dish record found');
          } else if (doc.data().isDeleted == true) {
              res.status(404).send('Dish is deleted');
          } else {
              doc.ref.update(dataUpdate);            
          }
      });

      const dishLabel = collectionRef.collection("label").where(`dishes.${id}.isActive`, '==', true);
      await dishLabel.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => { 
          doc.ref.update({
            [`dishes.${id}.price`]: price
          });
          res.send('Dish updated successfuly');
        });
      });
  } catch(error){
      res.status(400).send(error.message);
  }
}

const deleteLogicDish = async (req, res) => {
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

const deleteDish = async (req, res) => {
  try{
    const clientId = req.body.clientId;
    const id = req.params.id;
    const dish = db.collection(collectionName).doc(clientId).collection(subCollectionName).doc(id);
    await dish.delete();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const uploadImgDish = async (req, res) => {

  cors(req, res, () => {

    const bucketName = 'gs://fidelio-core-platform.appspot.com';
    const bucket = 'fidelio-core-platform.appspot.com';
    let uuidUrl = uuidv4();

    const form = new formidable.IncomingForm({ multiples: true });

    form.parse(req, async function(err, fields, files) {

      //console.log(files);
      console.log("El archivo es: ", files.imgStorage.path); // path's img temp
      const imgStorage = files.imgStorage;
      const imgStoragePath = imgStorage.path;
      const nameImg = imgStorage.name;

      try{

        await storage.bucket(bucketName).upload(imgStoragePath, {
          destination: `${nameImg}`,
          resumable: true,
          metadata: {
            metadata: {
              firebaseStorageDownloadTokens: uuidUrl,
            },
          },
        });
        const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
        nameImg)}?alt=media&token=${uuidUrl}`;
        console.log("La url es: " + url);
        res.send(url);
      } catch (error) {
        res.status(400).send(imgStoragePath);
      }
    });
  });
}

module.exports = {
  addDish, 
  getAllNoDeletedDishes,
  getAllActiveDishes,
  getAllDishes,
  getDish,
  updateDish,
  deleteLogicDish,
  deleteDish,
  uploadImgDish,
}