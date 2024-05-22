const express = require("express");
const { expressjwt: jwt } = require("express-jwt");
const { getSection } = require("./pkg/config");
require("./pkg/db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const {
  createCourse,
  getOneCourse,
  getAllCourses,
  updateCourse,
  removeCourse,
  getCoursesByAcademy,
} = require("./handlers/course");

const {
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
} = require("./handlers/auth");

const { createAcademy, getAllAcademies } = require("./handlers/academy");

app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /\/api\/course\/[^/]+$/, methods: ["GET"] },
      "/api/courses",
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/auth/reset-password",
    ],
  })
);

app.post("/api/auth/login", login);
app.get("/api/auth/refresh-token", refreshToken);
app.post("/api/auth/register", register);
app.post("/api/auth/reset-password", resetPassword);

// 	Нелогирани корисници можат да ги прегледуваат сите курсеви или еден конкретен курс
app.get("/api/courses", getAllCourses);
app.get("/api/course/:id", getOneCourse);

// Само логиран корисник може да додава, брише или менаџира курс
app.post("/api/course", createCourse);
app.put("/api/course/:id", updateCourse);
app.delete("/api/course/:id", removeCourse);

// 	Курсот е дел од една академија, во која има повеќе курсеви
app.get("/api/academy/:id/courses", getCoursesByAcademy);

app.get("/api/academy", getAllAcademies);
app.post("/api/academy", createAcademy);

app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
