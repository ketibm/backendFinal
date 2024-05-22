const {
  create,
  getOne,
  getAll,
  update,
  remove,
  getAllByUniversityId,
} = require("../pkg/faculty");

const createFaculty = async (req, res) => {
  try {
    const faculty = await create(req.body);
    return res.status(200).send(faculty);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getOneFaculty = async (req, res) => {
  try {
    const faculty = await getOne(req.params.id);
    if (!faculty) {
      return res.status(404).send("Faculty not found!");
    }
    return res.status(200).send(faculty);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getAllFaculties = async (req, res) => {
  try {
    const faculties = await getAll();
    return res.status(200).send(faculties);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await update(req.params.id, req.body);
    return res.status(200).send(updatedFaculty);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const removeFaculty = async (req, res) => {
  try {
    await remove(req.params.id);
    return res.status(200).send(`Faculty with id: ${req.params.id} removed`);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getFacultiesByUniversity = async (req, res) => {
  try {
    const faculties = await getAllByUniversityId(req.params.id);
    return res.status(200).send(faculties);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createFaculty,
  getOneFaculty,
  getAllFaculties,
  updateFaculty,
  removeFaculty,
  getFacultiesByUniversity,
};
