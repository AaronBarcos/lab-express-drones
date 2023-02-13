const express = require("express");
const router = express.Router();

// require the Drone model here
const DroneModel = require("../models/Drone.model");

router.get("/drones", async (req, res, next) => {
  try {
    const response = await DroneModel.find();
    console.log(response);
    res.render("drones/list.hbs", {
      drones: response,
    });
  } catch (error) {}
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render("drones/create-form.hbs");
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {
    const newDrone = req.body;
    const response = await DroneModel.create({
      name: newDrone.name,
      propellers: newDrone.propellers,
      maxSpeed: newDrone.maxSpeed,
    });

    res.redirect("/drones");
  } catch (err) {
    next(err);
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  try {
    const {id} = req.params
    const response = await DroneModel.findById(id)
    res.render("drones/update-form.hbs", {
      drone: response
    })
  } catch (error) {
    next(error)
  }
});

router.post("/drones/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const editDrone = req.body;
    const response = await DroneModel.findByIdAndUpdate(id, {
      name: editDrone.name,
      propellers: editDrone.propellers,
      maxSpeed: editDrone.maxSpeed
    })
    res.redirect("/drones")
  } catch (error) {
    next(error)
  }
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
