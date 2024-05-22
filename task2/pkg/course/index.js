const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  named: {
    type: String,
    required: [true, "Path `named` is required."],
  },

  area: {
    type: String,
    required: [true, "Path `area` is required."],
  },
  academy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Academy",
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema, "kursevi");

const create = async (data) => {
  const course = new Course(data);
  const savedCourse = await course.save();
  return savedCourse;
};

const getOne = async (id) => {
  return await Course.findById(id).populate("academy", "-courses");
};

const getAll = async () => {
  return await Course.find({}).populate("academy", "-courses");
};

const update = async (id, data) => {
  return await Course.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await Course.deleteOne({ _id: id });
};

const getAllByAcademyId = async (academyId) => {
  return await Course.find({ academy: academyId });
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  remove,
  getAllByAcademyId,
};
