const MovieModel = require("./movie");

module.exports.gets = () => {
  return MovieModel.find();
};

module.exports.get = (paramsId) => {
  return MovieModel.findById(paramsId);
};

module.exports.add = (data) => {
  const movie = new MovieModel({
    title: data.title,
    year: data.year,
    format: data.format,
    stars: data.stars,
  });

  return movie.save();
};

module.exports.delete = (paramsId) => {
  return MovieModel.findByIdAndRemove(paramsId);
};
