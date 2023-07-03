const axios = require("axios");
const { response } = require("express");

const getMovies = (req, res) => {
  axios
    .get("https://seleksi-sea-2023.vercel.app/api/movies")
    .then((response) => res.json(response.data))
    .catch((err) => {
      res.send(err);
    });
};

const getMoviesById = (req, res) => {
  const id = Number(req.params.id);
  axios
    .get("https://seleksi-sea-2023.vercel.app/api/movies")
    .then((response) => {
      const result = response.data.find((item) => {
        return item.id === id;
      });
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  getMovies,
  getMoviesById,
};
