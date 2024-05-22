const {
  create,
  getOne,
  getAll,
  update,
  remove,
  getAllByUniversityId,
} = require("../pkg/faculty");
const { getAllU } = require("../pkg/university");

const getForm = async (req, res) => {
  try {
    const universities = await getAllU();
    res.render("form", { universities });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getFaculties = async (req, res) => {
  try {
    const faculties = await getAll();
    res.render("faculty", { faculties });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const postForm = async (req, res) => {
  try {
    await create(req.body);
    return res.redirect("/faculty");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const deleteFaculties = async (req, res) => {
  try {
    await remove(req.query.index);
    return res.redirect("/faculty");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getUpdate = async (req, res) => {
  try {
    const faculty = await getOne(req.params.id);
    const universities = await getAllU();

    if (!faculty) {
      return res.status(404).send("Faculty not found!");
    }
    res.render("updatedForm", { faculty, universities });
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const postUpdate = async (req, res) => {
  try {
    await update(req.params.id, req.body);
    return res.redirect("/faculty");
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getForm,
  postForm,
  getUpdate,
  getFaculties,
  deleteFaculties,
  postUpdate,
};
