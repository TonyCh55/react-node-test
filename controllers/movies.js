const db = require("../model/db_functions");

module.exports.getMovies = (req, res) => {
  db.gets()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json({ err: err.message }));
};

module.exports.getMovie = (req, res) => {
  db.get(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json({ err: err.message }));
};

module.exports.addMovie = (req, res) => {
  db.add(req.body)
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(400).json({ err: err.message }));
};

module.exports.deleteMovie = (req, res) => {
  db.delete(req.params.id)
    .then((result) =>
      result
        ? res.status(200).json(result)
        : res.status(400).json({ err: "Card not found" })
    )
    .catch((err) => res.status(400).json({ err: err.message }));
};
