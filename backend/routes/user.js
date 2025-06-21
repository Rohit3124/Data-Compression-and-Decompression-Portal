const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.use(express.json());

router.post("/signup", userController.signup);
router.post("/signout", userController.signout);

module.exports = router;
