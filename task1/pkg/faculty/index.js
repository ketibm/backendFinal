const mongoose = require("mongoose");
const University = require("../university");

const facultySchema = mongoose.Schema({
  university: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "University",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Path `name` is required."],
  },
  address: {
    type: String,
    required: [true, "Path `address` is required."],
  },
});

const Faculty = mongoose.model("Faculty", facultySchema, "fakulteti");

const create = async (data) => {
  const faculty = new Faculty(data);
  const savedFaculty = await faculty.save();
  await University.updateU(
    { _id: data.university },
    { $push: { faculties: id } }
  );
  return savedFaculty;
};

const getOne = async (id) => {
  return await Faculty.findOne({ _id: id }).populate("university", "name");
};

const getAll = async () => {
  return await Faculty.find({});
};

const update = async (id, data) => {
  return await Faculty.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  const faculty = await Faculty.findOne({ _id: id });
  await University.updateU(
    { _id: faculty.university },
    { $pull: { faculties: id } }
  );
  return await Faculty.deleteOne({ _id: id });
};

const getAllByUniversityId = async (universityId) => {
  return await Faculty.find({ university: universityId });
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  remove,
  getAllByUniversityId,
};
