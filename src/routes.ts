import express from "express";

const StudentsController = require("./controllers/StudentsController");

const routes = express.Router();

// Add a new student
routes.post("/university/student/add", StudentsController.add);

// Get students by year
routes.get(
  "/university/students/year/:year",
  StudentsController.getAllFromYear
);

// Get students by course
routes.get(
  "/university/students/course/:course",
  StudentsController.getAllFromCourse
);

// Get students by course and year
routes.get(
  "/university/students/course/:course/year/:year",
  StudentsController.getAllFromYearAndCourse
);

module.exports = routes;
