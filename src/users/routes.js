const { Router } = require("express");
const controller = require("../users/controller");
const router = Router();

// router.get("/register", controller.registerUser);
router.get("/user/:id", controller.getUsersById);
router.get("/register", controller.getAllUsers);
router.post("/register", controller.registerUser);
router.post("/login", controller.login);
router.put("/topup/:id", controller.topUp);

module.exports = router;
