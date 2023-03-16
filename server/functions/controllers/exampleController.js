"use strict"

const {db, storage} = require('../fb');
const Example = require('../models/example');
const fs = require('fs')
const {v4: uuidv4} = require("uuid");
const multipart = require('parse-multipart-data');

const addExample = async (req, res) => {
    try {
      const data = req.body;
      await db.collection("example").add({
        name: data.name,
        age: data.age,
      });
      res.send("Record saved successfuly");
    } catch (error) {
      res.status(400).send(error.message);
  }
}

const getAllExample = async (req, res) => {
  try {
    const examples = await db.collection('example');
    const data = await examples.get();
    const exampleArray = [];
    if(data.empty) {
        res.status(404).send('No example record found');
    }else {
        data.forEach(doc => {
            const example = new Example(
                doc.id,
                doc.data().name,
                doc.data().age,
            );
            exampleArray.push(example);
        });
        res.send(exampleArray);
    }
  } catch (error) {
      res.status(400).send(error.message);
  }
}

const getExample = async (req, res) => {
  try {
      const id = req.params.id;
      const example = await db.collection('example').doc(id);
      const data = await example.get();
      if(!data.exists) {
          res.status(404).send('Example with the given ID not found');
      }else {
          res.send(data.data());
      }
  } catch (error) {
      res.status(400).send(error.message);
  }
}

const updateExample = async (req, res, next) => {
  try {
      const id = req.params.id;
      const data = req.body;
      const example =  await db.collection('example').doc(id);
      await example.update(data);
      res.send('example record updated successfuly');        
  } catch (error) {
      res.status(400).send(error.message);
  }
}

const deleteExample = async (req, res, next) => {
  try {
      const id = req.params.id;
      await db.collection('example').doc(id).delete();
      res.send('Record deleted successfuly');
  } catch (error) {
      res.status(400).send(error.message);
  }
}

const uploadImgExample = async (req, res, next) => {
  try {
    var bodyBuffer = req.body;
    var boundary = multipart.getBoundary(req.headers['content-type']);
    var parts = multipart.parse(bodyBuffer, boundary);
    const nameImg = parts[0].filename.split('.')[0];
    const stream = fs.createWriteStream(`./uploads/${nameImg}.jpg`);
    stream.write(parts[0].data);
    stream.end();

    let bucketName = 'gs://fidelio-core-platform.appspot.com';
    let idUnico = uuidv4();
    console.log("El id único es: ", idUnico);
  
    const original = `./uploads/${nameImg}.jpg`;
    const nuevo = `./uploads/${idUnico}.jpg`;
  
    setTimeout(() => {

      fs.rename(original, nuevo, () => { console.log('Archivo renombrado') })
      }, 100);
     
    setTimeout(() => {
      uploadImgStorage(idUnico,bucketName);
      }, 200);
  }
  catch (error) {
      res.status(400).send(error.message);
  }
}

async function uploadImgStorage(idUnico,bucketName) {
  // Uploads a local file to the bucket

  await storage.bucket(bucketName).upload(`./uploads/${idUnico}.jpg`, {
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  })
  .then(() => {
    console.log("Imagen subida");
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
  
  await storage.bucket(bucketName).file(`${idUnico}.jpg`).getSignedUrl({
    action: 'read',
    expires: '03-09-2491'
  }).then(signedUrls => {
    const url = signedUrls[0];
    console.log("La url es: ", url);
  }).catch(err => {
    console.error('ERROR:', err);
  });
}


module.exports = {
  addExample, 
  getAllExample,
  getExample,
  updateExample,
  deleteExample,
  uploadImgExample,
}