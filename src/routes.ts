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

// Get courses
routes.get("/university/courses", StudentsController.getCourses);

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
  "/university/students/number/course/:course/year/:year",
  StudentsController.getNumberOfStudentsFromCurse
);

// Get percent of graduated students by start year on course
routes.get(
  "/university/quota/students/number/course/:course/year/:year",
  StudentsController.getNumberOfQuotaStudentsFromCurse
);

// Get number of active students from curse
routes.get(
  "/university/students/active/course/:course/",
  StudentsController.getNumberOfActiveStudentsFromCurse
);

// Get number of active students from curse
routes.get(
  "/university/quota/students/active/course/:course/",
  StudentsController.getNumberOfActiveQuotaStudentsFromCurse
);

// Get Class indicators
routes.get(
  "/university/class/indicators/course/:course/startyear/:startYear/endyear/:endYear",
  StudentsController.getClassIndicators
);

module.exports = routes;
