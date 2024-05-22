const {
  createU,
  getOneU,
  getAllU,
  updateU,
  removeU,
} = require("../pkg/university");

const createUniversity = async (req, res) => {
  try {
    const newUniversity = await createU(req.body);
    return res.status(200).send(newUniversity);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getOneUniversity = async (req, res) => {
  try {
    const university = await getOneU(req.params.id);
    if (!university) {
      return res.status(404).send("University not found!");
    }
    return res.status(200).send(university);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAllUniversities = async (req, res) => {
  try {
    const universities = await getAllU();
    return res.status(200).send(universities);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const updateUniversity = async (req, res) => {
  try {
    const updatedUniversity = await updateU(req.params.id, req.body);
    if (!updatedUniversity) {
      return res.status(404).send("University not found");
    }
    return res.status(200).send(updatedUniversity);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const removeUniversity = async (req, res) => {
  try {
    await removeU(req.params.id);
    return res.status(200).send("University deleted successfully!");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createUniversity,
  getOneUniversity,
  getAllUniversities,
  updateUniversity,
  removeUniversity,
};
