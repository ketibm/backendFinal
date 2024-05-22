const express = require("express");
const { getSection } = require("./pkg/config");
require("./pkg/db");

const {
  createFaculty,
  getOneFaculty,
  getAllFaculties,
  updateFaculty,
  removeFaculty,
  getFacultiesByUniversity,
} = require("./handlers/faculty");

const {
  createUniversity,
  getOneUniversity,
  getAllUniversities,
  updateUniversity,
  removeUniversity,
} = require("./handlers/university");

const {
  getForm,
  postForm,
  getFaculties,
  deleteFaculties,
  getUpdate,
  postUpdate,
} = require("./handlers/form");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/api/faculties", getAllFaculties);
app.post("/api/faculty", createFaculty);
app.get("/api/faculty/:id", getOneFaculty);
app.put("/api/faculty/:id", updateFaculty);
app.delete("/api/faculty/:id", removeFaculty);

app.get("/api/university/:id/faculties", getFacultiesByUniversity);

app.get("/api/university", getAllUniversities);
app.post("/api/university", createUniversity);
app.get("/api/university/:id", getOneUniversity);
app.put("/api/university/:id", updateUniversity);
app.delete("/api/university/:id", removeUniversity);

app.get("/form", getForm);
app.post("/form", postForm);
app.get("/faculty", getFaculties);
app.get("/delete", deleteFaculties);
app.get("/update/:id", getUpdate);
app.post("/update/:id", postUpdate);

app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
