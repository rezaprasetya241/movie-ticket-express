const { Router } = require("express");
const controller = require("../movies/controller");
const router = Router();

router.get("/", controller.getMovies);
router.get("/:id", controller.getMoviesById);

module.exports = router;
