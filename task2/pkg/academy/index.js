const mongoose = require("mongoose");

const academySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Course",
    },
  ],
});

const Academy = mongoose.model("Academy", academySchema, "akademii");

const create = async (data) => {
  const academy = new Academy(data);
  return await academy.save();
};

const getOne = async (id) => {
  return await Academy.findOne({ _id: id }).populate("courses", "name");
};
const getAll = async () => {
  return await Academy.find({}).populate("courses", "name");
};

const update = async (id, data) => {
  return await Academy.updateOne({ _id: id }, data);
};

const remove = async (id) => {
  return await Academy.deleteOne({ _id: id });
};

module.exports = {
  create,
  getOne,
  getAll,
  update,
  remove,
};
