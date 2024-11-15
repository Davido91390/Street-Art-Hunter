const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();

    if (users.length === 0) {
      res.json({
        message: "pas d'utilisateurs",
        result: users,
      });
    } else {
      res.json({ result: users });
    }
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);
    if (user) {
      res.json({ result: user });
    } else {
      res.status(404).json({ message: "utilisateur non trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const user = req.body;
  if (req.file) {
    user.avatar = req.file.filename;
  }

  try {
    const result = await tables.user.create(user);
    res.status(201).send(`utilisateur ajouté avec succès: #{ id:${result} }`);
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const user = { ...req.body, id: req.params.id };
  try {
    if (req.file) {
      user.avatar = req.file.filename;
    }
    await tables.user.update(user);
    res
      .status(200)
      .send(`utilisateur modifié avec succès: { id:${req.params.id} }`);
  } catch (error) {
    next(error);
  }
};
const editPassword = async (req, res, next) => {
  try {
    const user = {
      id: req.params.id,
      hashed_password: req.body.hashed_password,
    };
    await tables.user.updatePassword(user);
    res.status(204).json({ message: " Mot de passe modifié avec succès." });
  } catch (error) {
    next(error);
  }
};
const editScore = async (req, res, next) => {
  try {
    const user = {
      id: req.params.id,
      score: req.body.score,
    };
    await tables.user.updateScore(user);
    res
      .status(204)
      .send(`Points ajoutés avec succés: #{ id:${req.params.id} }`);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await tables.user.delete(req.params.id);
    res
      .status(204)
      .send(`utilisateur supprimé avec succès: #{ id:${req.params.id} }`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browse,
  read,
  edit,
  editPassword,
  editScore,
  add,
  destroy,
};
