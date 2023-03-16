"use strict"

const {db,auth} = require('../fb');
const {
    makeModel,
    addModel} = require('../common-core/modelsConsume')

let collectionName = "clients";
let subCollectionName = "staff";

const addStaff = async (req, res) => {
   
    try{
        const refData = req.body
        const nameClient = refData.nameClient;
        const nameLocal = refData.nameLocal;

        const clientsRef = db.collection(collectionName).where('name', '==', nameClient);
        let clientId = " ";
        await clientsRef.get().then(async (querySnapshot) => {
            querySnapshot.forEach(async (doc) => {
                clientId = doc.id;
            });
        });
        
        let idLocal = [];
        for(let i = 0; i < nameLocal.length; i++){
            const localRef = db.collection("local").where('name', '==', nameLocal[i]);
            await localRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    idLocal.push(doc.id);
                });
            });
        }

        await db.collection("relationClient").doc(refData.dni).create({
            clientId: clientId,
            idLocal: idLocal,
            email: refData.email,
        })
        .then(()=> {

            const data = {
                name: refData.name,
                lastName: refData.lastName,
                dni: refData.dni,
                email: refData.email,
                createdBy: refData.createdBy,
                role : refData.role,
                idLocal: idLocal,
                nameLocal: nameLocal,
                clientId: clientId,
                nameClient: nameClient,
            }

            const modelAdd = addModel(subCollectionName, data);
            db.collection(collectionName).doc(clientId)
                .collection(subCollectionName).doc(refData.dni).create(modelAdd);
            
            res.status(200).json({"code": "BF-5"});
        })
        .catch((error) => {
            res.status(400).json({"code": "6"})
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllNoDeletedStaff = async (req, res) => {
    try{
        const clientId = req.params.id;
        const staffRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName).where('isDeleted', '==', false);
        const data = await staffRef.get();
        const staffArray = [];
        if(data.empty){
            res.status(404).send('No staff record found');
        }else{
            data.forEach(doc => {
                const model = makeModel(subCollectionName,doc);
                staffArray.push(model);
            });
            staffArray.sort((a, b) => b.createdAt - a.createdAt);
            res.send(staffArray);
        }        
    } catch(error){
        res.status(400).send(error.message);
    }
}

const getAllActiveStaff = async (req, res) => {
    try{
        const clientId = req.params.id;
        const staffRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName).where('isActive', '==', true);
        const data = await staffRef.get();
        const staffArray = [];
        if(data.empty){
            res.status(404).send('No staff record found');
        }else{
            data.forEach(doc => {
                const model = makeModel(subCollectionName,doc);
                staffArray.push(model);
            });
            staffArray.sort((a, b) => b.createdAt - a.createdAt);
            res.send(staffArray);
        }        
    } catch(error){
        res.status(400).send(error.message);
    }
}

const getAllStaff = async (req, res) => {
    try{
        const clientId = req.params.id;
        const staffRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName);
        const data = await staffRef.get();
        const staffArray = [];
        if(data.empty){
            res.status(404).send('No staff record found');
        }else{
            data.forEach(doc => {
                const model = makeModel(subCollectionName,doc);
                staffArray.push(model);
            });
            staffArray.sort((a, b) => b.createdAt - a.createdAt);
            res.send(staffArray);
        }        
    } catch(error){
        res.status(400).send(error.message);
    }
}

const getStaff = async (req, res) => {
    try{
        const id = req.params.id;
        const relationClientRef = db.collection("relationClient").doc(id);
        await relationClientRef.get().then(async doc => {
            if (!doc.exists) {
                console.log('No such document!');
                res.status(404).send(`No ${subCollectionName} record found`);
            } else {
                const clientId = doc.data().clientId;
                const staffRef = db.collection(collectionName).doc(clientId).collection(subCollectionName).doc(id);
                const data = await staffRef.get();
                if(!data.exists) {
                    res.status(404).send(`No ${subCollectionName} record found`);
                } else {
                    data.data().isDeleted == true ? 
                        res.status(404).send('Users is deleted') 
                        : res.send(data.data());
                }
            }
        }).catch(err => {
            console.log('Error getting document', err);
        });
    } catch(error){
        res.status(400).send(error.message);
    }
}

const getAllNoDeletedByProfileStaff = async (req, res) => {
    try{
        const clientId = req.params.id;
        const dataRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName).where('isDeleted', '==', false).where('profile','!=',[]);
        const data = await dataRef.get();
        const dataArray = [];
        if(data.empty){
            res.status(404).send(`No ${subCollectionName} record found`);
        }else{
            data.forEach(doc => {
                const model = makeModel(subCollectionName,doc);
                dataArray.push(model);
            });
            dataArray.sort((a, b) => b.createdAt - a.createdAt);
            res.send(dataArray);
        }    
    } catch(error){
        res.status(400).send(error.message);
    }
}

const getAllNoDeletedByNoProfileStaff = async (req, res) => {
    try{
        const clientId = req.params.id;
        const dataRef = await db.collection(collectionName).doc(clientId).collection(subCollectionName).where('isDeleted', '==', false).where('profile','==',[]);
        const data = await dataRef.get();
        const dataArray = [];
        if(data.empty){
            res.status(404).send(`No ${subCollectionName} record found`);
        }else{
            data.forEach(doc => {
                const model = makeModel(subCollectionName,doc);
                dataArray.push(model);
            });
            dataArray.sort((a, b) => b.createdAt - a.createdAt);
            res.send(dataArray);
        }    
    } catch(error){
        res.status(400).send(error.message);
    }
}

const updateStaff = async (dataUpdate, id,res) => {
    try{
        const clientId = dataUpdate.clientId;
        const staff = db.collection(collectionName).doc(clientId).collection(subCollectionName).doc(id);
        const data = await staff.get();
        if(data.exists == false) {
            res.status(404).send('No staff record found');
        } else if (data.data().isDeleted == true) {
            res.status(404).send('Staff is deleted');
        } else {
            await staff.update(dataUpdate);
            res.send('Staff updated successfuly');
        }
    } catch(error){
        res.status(400).send(error.message);
    }
}

const giveAccessStaff = async (req, res) => {
    if(req.body.profile && req.body.email){
        // Create a new user account associated with the specified email address
        await auth.createUser({
            email: req.body.email,
            password: "12345679",
        })
        .then((userRecord) => {
            console.log("Successfully created new user:", userRecord.email);
            updateStaff(req.body, req.params.id, res);
        })
        .catch((error) => {
            console.log("Error creating new user:", error);
            res.send(error.message);
        });
    } else if(req.body.profile && !req.body.email){
        // Update the profiles
        updateStaff(req.body, req.params.id, res);
    } else{
        // Update data validation email
        const refCollection = db.collection(collectionName).doc(req.body.clientId).collection(subCollectionName).where('email','==',req.body.email);
        await refCollection.get()
        .then(async (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log('llegue aca 1')
                updateStaff(req.body, req.params.id, res);
            } else if (querySnapshot.size == 1) {
                try {
                    const dataRef = db.collection(collectionName).doc(req.body.clientId).collection(subCollectionName).doc(req.params.id);
                    const data = await dataRef.get();
                    if(!data.exists) {
                        res.status(404).json({"code": "BF-2","message": `No ${collectionName} record found`});
                    } else if (data.data().isDeleted == true) {
                        res.status(404).json({"code": "BF-4","message": `${collectionName} is deleted`});
                    } else {
                        await dataRef.update({
                            role : req.body.role,
                            name: req.body.name,
                            clientId: req.body.clientId,
                            nameClient: req.body.nameClient,
                            lastName: req.body.lastName,
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

const revokeAccessStaff = async (req, res) => {
    await auth.getUserByEmail(req.body.email)
    .then(async (userRecord) => {
        await auth.deleteUser(userRecord.uid)
        .then(() => {
            console.log("Successfully deleted user");
            updateStaff(req.body, req.params.id, res);
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

const deleteLogicStaff = async (req, res) => {
        const clientId = req.body.clientId;
        const email = req.body.email;
        const id = req.params.id;
        const refStafff = db.collection(collectionName).doc(clientId).collection(subCollectionName).doc(id);
        const data = await refStafff.get();
        if(data.exists == false) {
            res.status(404).json({"code": "BF-2","message": `No ${subCollectionName} record found`});
        } else if (data.data().isDeleted == true) {
            res.status(404).json({"code":"BF-6","message": `${subCollectionName} is already deleted`});
        } else {
                refStafff.update({isDeleted: true,isActive: false,profile:[]});
                res.status(200).json({"code":"BF-7","message":`${subCollectionName} deleted successfuly`});
        }
}

const deleteStaff = async (req, res) => {
    try{
        const clientId = req.body.clientId;
        const id = req.params.id;
        await db.collection("relationClient").doc(id).delete();
        await db.collection(collectionName).doc(clientId).collection(subCollectionName).doc(id).delete();
        res.send("Staff deleted successfuly");
    } catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addStaff,
    getAllNoDeletedStaff,
    getAllActiveStaff,
    getAllNoDeletedByProfileStaff,
    getAllNoDeletedByNoProfileStaff,
    getAllStaff,
    getStaff,
    updateStaff,
    giveAccessStaff,
    revokeAccessStaff,
    deleteLogicStaff,
    deleteStaff
}