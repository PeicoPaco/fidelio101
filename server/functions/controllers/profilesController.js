"use strict"

const {db} = require('../fb');

const getAllProfilesConsola = async (req, res) => {
    try {
        const rolesRef = db.collection('profilesConsola').doc('JWPSqIeP74B2xA64rWZE');
        const data = await rolesRef.get();
        const sorted_data = Object.fromEntries(
            Object.entries(data.data()).sort((a, b) => a[1].localeCompare(b[1]))
          );
        res.status(200).json(sorted_data);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllProfilesPortal = async (req, res) => {
    try {
        const rolesRef = db.collection('profilesPortal').doc('ueeMW5V9TbavR4a0v0I8');
        await rolesRef.get().then(doc => {
            if (!doc.exists) {
                res.status(404).json({message: 'No such document!'});
            } else {
                const sorted_data = Object.fromEntries(
                    Object.entries(doc.data()).sort((a, b) => a[1].localeCompare(b[1]))
                  );
                res.status(200).json(sorted_data);
            }
        })
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
    getAllProfilesConsola,
    getAllProfilesPortal
}