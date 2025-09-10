const express = require("express");
const router = express.Router();
const verifyKeycloakToken = require("../middleware/keycloak");
const { getProfile } = require("../controllers/profileController");

router.get("/", verifyKeycloakToken, getProfile);

module.exports = router;
