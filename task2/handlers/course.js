const {
  create,
  getOne,
  getAll,
  update,
  remove,
  getAllByAcademyId,
} = require("../pkg/course");

const createCourse = async (req, res) => {
  try {
    const newCourse = await create(req.body);
    return res.status(200).send(newCourse);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getOneCourse = async (req, res) => {
  try {
    const course = await getOne(req.params.id);
    if (!course) {
      return res.status(404).send("Course not found!");
    }
    return res.status(200).send(course);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await getAll();
    return res.status(200).send(courses);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await update(req.params.id, req.body);
    return res.status(200).send(updatedCourse);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const removeCourse = async (req, res) => {
  try {
    await remove(req.params.id);
    return res.status(200).send(`Course with id: ${req.params.id} removed`);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getCoursesByAcademy = async (req, res) => {
  try {
    const courses = await getAllByAcademyId(req.params.id);
    return res.status(200).send(courses);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createCourse,
  getOneCourse,
  getAllCourses,
  updateCourse,
  removeCourse,
  getCoursesByAcademy,
};
