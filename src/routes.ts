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

// Get students that finished the course by course and start year
routes.get(
  "/university/graduated/students/course/:course/startyear/:year",
  StudentsController.getAllgraduatedFromStartYearAndCourse
);

// Get students that finished the course by course and end year
routes.get(
  "/university/graduated/students/course/:course/endyear/:year",
  StudentsController.getAllgraduatedFromEndYearAndCourse
);

// Get percent of graduated students by start year on course
routes.get(
  "/university/graduated/students/percent/course/:course/startyear/:year",
  StudentsController.getPercentOfStudentsgraduatedFromCurse
);

// Get percent of dropout students by start year on course
routes.get(
  "/university/dropout/students/percent/course/:course/startyear/:year",
  StudentsController.getPercentOfDropoutStudentsFromCurse
);

// Get percent of graduated students by start year on course
routes.get(
  "/university/quota/graduated/students/percent/course/:course/startyear/:year",
  StudentsController.getPercentOfStudentsgraduatedQuotasFromCurse
);

// Get percent of dropout students by start year on course
routes.get(
  "/university/quota/dropout/students/percent/course/:course/startyear/:year",
  StudentsController.getPercentOfDropoutStudentsQuotasFromCurse
);

module.exports = routes;
