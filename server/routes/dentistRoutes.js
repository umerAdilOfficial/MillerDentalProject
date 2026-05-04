const express = require("express");
const router = express.Router();
const Dentist = require("../models/Dentist");
const adminMiddleware = require("../Middleware/adminMiddleware");

// GETTING ALL DENSTIST HERE
router.get("/getAllDentist", async (req, res) => {
  try {
    const getAllDentist = await Dentist.find({});
    res.status(200).json(getAllDentist);
  } catch (error) {
    console.log("the actual error is ", error.message);
    res.status(500).send("some internal error occurs");
  }
});

// ADDING A DENTIST IN DATABASE (ADMIN ONLY)
router.post("/addDentist", adminMiddleware, async (req, res) => {
  try {
    const addDentist = await Dentist.create({
      name: req.body.name,
      speciality: req.body.speciality,
      image: req.body.image,
      experience: req.body.experience,
      availableDays: req.body.availableDays,
      availableTime: req.body.availableTime,
    });
    res.status(200).json(addDentist);
  } catch (error) {
    console.log("the actual error is ", error.response);
    return res.status(500).send("some internal error occurs");
  }
});

// UPDATE DENTIST (ONLY ADMIN)
router.put("/updateDentist/:dentistId", adminMiddleware, async (req, res) => {
  try {
    const { dentistId } = req.params;
    const { name, availableDays, availableTime, specialty, image, experience } =
      req.body;
    const updatedDentist = await Dentist.findByIdAndUpdate(
      dentistId,
      { name, availableDays, availableTime, specialty, image, experience },
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedDentist) {
      return res.status(404).send("no dentist found");
    }
    res.status(200).json(updatedDentist);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// DELETE DENTIST HERE (ADMIN ONLY )
router.delete(
  "/deleteDentist/:dentistId",
  adminMiddleware,
  async (req, res) => {
    try {
      const { dentistId } = req.params;
      const deletedDentist = await Dentist.findByIdAndDelete(dentistId);
      if (!deletedDentist) {
        return res.status(400).send("user not found");
      }
      res.status(200).json(deletedDentist);
    } catch (error) {
      console.log("error is", error.message);
      res.status(500).send("some  internal error occurs");
    }
  },
);

module.exports = router;
