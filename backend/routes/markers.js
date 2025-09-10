const express = require("express");
const router = express.Router();
const verifyKeycloakToken = require("../middleware/keycloak");
const {
  getMarkers,
  createMarker,
  updateMarker,
  deleteMarker,
} = require("../controllers/markersController");

router.get("/", verifyKeycloakToken, getMarkers);
router.post("/", verifyKeycloakToken, createMarker);
router.put("/:id", verifyKeycloakToken, updateMarker);
router.delete("/:id", verifyKeycloakToken, deleteMarker);

module.exports = router;
