const mongoose = require("mongoose");
const { Schema } = mongoose;

const dentistSchema = new Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  image: { type: String, required: true },
  experience: { type: String, required: true },
  availableDays: {
    type: [String],
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    required: true,
  },
  availableTime: { type: String, required: true },
});

const Dentist = mongoose.model("dentist", dentistSchema);
module.exports = Dentist;
