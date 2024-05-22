const mongoose = require("mongoose");

const universitySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  faculties: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Faculty",
    },
  ],
});

const University = mongoose.model(
  "University",
  universitySchema,
  "univerziteti"
);

const createU = async (data) => {
  const university = new University(data);
  return await university.save();
};

const getOneU = async (id) => {
  return await University.findById({ _id: id }).populate("faculties", "name");
};

const getAllU = async () => {
  return await University.find({}).populate("faculties", "name");
};

const updateU = async (id, data) => {
  return await University.updateOne({ _id: id }, data);
};

const removeU = async (id) => {
  return await University.deleteOne({ _id: id });
};

module.exports = {
  createU,
  getOneU,
  getAllU,
  updateU,
  removeU,
};
