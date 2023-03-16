const express = require("express");

const {
    addDish,
    getAllNoDeletedDishes,
    getAllActiveDishes,
    getAllDishes,
    getDish,
    updateDish,
    deleteLogicDish,
    deleteDish,
    uploadImgDish,
} = require("../controllers/dishesController")

const router = express.Router();

// Dish routes
router.post("/dish", addDish);
router.get("/dish/all/:id", getAllNoDeletedDishes);
router.get("/dish/active/:id", getAllActiveDishes);
router.get("/dish/:clientId/:iddish", getDish);
router.put("/dish/:id", updateDish);
router.delete("/dish/:id", deleteLogicDish);
router.post("/dish/uploadImgDish", uploadImgDish);


module.exports = {
  routes: router,
}