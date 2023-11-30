const express = require("express");
const router = express.Router();

const usersController = require("../controllers/userController");

router.get("/profile", usersController.profile);

router.get("/signUp", usersController.signUp);
router.get("/signIn", usersController.signIn);

router.post("/create", usersController.create);
router.post("/create-session", usersController.createSession);

module.exports = router;
