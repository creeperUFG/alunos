import * as mongoose from "mongoose";

const StudentsSchema = new mongoose.Schema({
  city: String,
  course: String,
  courseType: String,
  courseGrau: String,
  shift: String, //Turno
  startYear: Number,
  endYear: Number,
  typeOfEntry: String,
  globalScore: Number,
  courseGlobalScore: Number,
  status: String,
});

module.exports = mongoose.model("Students", StudentsSchema);
