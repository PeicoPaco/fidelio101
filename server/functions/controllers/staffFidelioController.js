"use strict"

const {
    addDataByDni,
    getAllData,
    getAllNoDeletedData,
    getAllActivedData,
    updateData,
    deleteLogicData,
} = require('../common-core/constConsume')
const {db,auth} = require('../fb');
const {makeModel} = require('../common-core/modelsConsume')

let collectionName = "staffFidelio";

const addStaffFidelio = async (req, res) => {
    addDataByDni(req, res, collectionName);
}

const addLasLogin = async (req, res) => {
    await auth.getUserByEmail(req.params.id)
        .then((userRecord) => {
            const lastLogin = new Date(userRecord.metadata.lastSignInTime).toLocaleString();
            const refColection = db.collection(collectionName).where('email', '==', req.params.id);
            refColection.get().then((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                    doc.ref.update({lastLogin: lastLogin});
                    res.status(200).json({"message": `Last login updated for ${req.params.id}`});
                })
            })
        })
}

const getAllNoDeletedStaffFidelio = async (req, res) => {
    getAllNoDeletedData(req, res, collectionName);
}

const getAllActivedStaffFidelio = async (req, res) => {
    getAllActivedData(req, res, collectionName);
}

const getAllNoDeletedByNoProfileStaffFidelio = async (req, res) => {
    try{        
        const dataRef = await db.collection(collectionName).where('isDeleted', '==', false).where('profile','==',[]);
        const data = await dataRef.get();
        // console.log(data.size);
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

const getAllNoDeletedByProfileStaffFidelio = async (req, res) => {
    try{        
        const dataRef = await db.collection(collectionName).where('isDeleted', '==', false).where('profile','!=',[]);
        const data = await dataRef.get();
        // console.log(data.size);
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

const getAllStaffFidelio = async (req, res) => {
    getAllData(req, res, collectionName);
}

const getStaffFidelioByProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const dataRef = await db.collection(collectionName).doc(id);
        const data = await dataRef.get();
        if(data.empty) {
            res.status(404).send(`No ${collectionName} record found`);
        } else {
          (data.data().isDeleted == true) ? 
          res.status(404).send(`${collectionName} is deleted`) 
          : (data.data().profile.length == 0) ? 
          res.send(false) : res.send(true);
        }
      } catch (error) {
          res.status(400).send(error.message);
        }
}

const getStaffFidelio = async (req, res) => {
    try {
        const id = req.params.id;
        const dataRef = db.collection(collectionName).where('email', '==', id);
        const data = await dataRef.get();
        if(data.empty) {
            res.status(404).send(`No ${collectionName} record found`);
        } else {
            data.docs.forEach(doc => {
                (doc.data().isDeleted == true) ? 
                res.status(404).send(`${collectionName} is deleted`) 
                : res.send(doc.data());
            });
        }
      } catch (error) {
          res.status(400).send(error.message);
      }
}

const giveAccessStaffFidelio = async (req, res) => {
    if(req.body.profile && req.body.email){
        await auth.createUser({
            email: req.body.email,
            password: "12345679",
        })
        .then((userRecord) => {
            console.log("Successfully created new user:", userRecord.email);
            updateData(req, res, collectionName);
        })
        .catch((error) => {
            console.log("Error creating new user:", error);
            res.send(error.message);
        });
    } else if(req.body.profile && !req.body.email){
        updateData(req, res, collectionName);
    } else if (req.body.lastLogin){
        updateData(req, res, collectionName);
    } else{
        const refCollection = db.collection(collectionName).where("email", "==", req.body.email);
        await refCollection.get()
        .then(async (querySnapshot) => {
            if (querySnapshot.empty) {
                updateData(req, res, collectionName);
            } else if (querySnapshot.size == 1) {
                try {
                    const dataRef = db.collection(collectionName).doc(req.params.id);
                    const data = await dataRef.get();
                    if(!data.exists) {
                        res.status(404).json({"code": "BF-2","message": `No ${collectionName} record found`});
                    } else if (data.data().isDeleted == true) {
                        res.status(404).json({"code": "BF-4","message": `${collectionName} is deleted`});
                    } else {
                        await dataRef.update({
                            name: req.body.name,
                            lastName: req.body.lastName,
                            fidelioTeam: req.body.fidelioTeam,
                            role:req.body.role,
                            isActive: req.body.isActive,
                        });
                        res.status(200).json({"code": "BF-3"});
                    }
                } catch (error) {
                    res.status(400).send(error.message);
                }
            }
            else {
                res.setHeader('Content-Type', 'application/json');
                res.status(404).json({"code": "BF-1", "message": "The email already exists"});
            }
        })
    }
}

const revokeAccessStaffFidelio = async (req, res) => {
    console.log(req.body.email)
    await auth.getUserByEmail(req.body.email)
    .then(async (userRecord) => {
        await auth.deleteUser(userRecord.uid)
        .then(() => {
            console.log("Successfully deleted user");
            updateData(req, res, collectionName);
        })
        .catch((error) => {
            console.log("Error deleting user:", error);
            res.send(error.message);
        });
    })
    .catch((error) => {
        console.log("Error fetching user data:", error);
        res.send(error.message);
    });
}

const deleteStaffFidelio = async (req, res) => {
    deleteLogicData(req, res, collectionName);
}

module.exports = {
    addStaffFidelio,
    addLasLogin,
    getAllNoDeletedStaffFidelio,
    getAllActivedStaffFidelio,
    getAllNoDeletedByProfileStaffFidelio,
    getAllNoDeletedByNoProfileStaffFidelio,
    getAllStaffFidelio,
    getStaffFidelioByProfile,
    getStaffFidelio,
    giveAccessStaffFidelio,
    revokeAccessStaffFidelio,
    deleteStaffFidelio,
}