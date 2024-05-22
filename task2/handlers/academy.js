const { create, getOne, getAll, update, remove } = require("../pkg/academy");

const createAcademy = async (req, res) => {
  try {
    const newAcademy = await create(req.body);
    return res.status(200).send(newAcademy);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAllAcademies = async (req, res) => {
  try {
    const academies = await getAll();
    return res.status(200).send(academies);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createAcademy,
  getAllAcademies,
};
