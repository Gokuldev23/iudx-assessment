const { pool } = require("../config/db");

// Get all markers for user
const getMarkers = async (req, res) => {
  try {
    const markers = await pool.query(
      "SELECT * FROM markers WHERE keycloak_id=$1 ORDER BY created_at DESC",
      [req.user.sub]
    );
    res.json(markers.rows);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create marker
const createMarker = async (req, res) => {
  try {
    const { latitude, longitude, title, description } = req.body;
    if (!latitude || !longitude || !title) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const result = await pool.query(
      "INSERT INTO markers (keycloak_id, latitude, longitude, title, description) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [req.user.sub, latitude, longitude, title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update marker
const updateMarker = async (req, res) => {
  try {
    const { id } = req.params;
    const { latitude, longitude, title, description } = req.body;
    const result = await pool.query(
      `UPDATE markers SET latitude=$1, longitude=$2, title=$3, description=$4, updated_at=CURRENT_TIMESTAMP 
       WHERE id=$5 AND keycloak_id=$6 RETURNING *`,
      [latitude, longitude, title, description, id, req.user.sub]
    );
    if (!result.rows.length)
      return res.status(404).json({ error: "Not found" });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete marker
const deleteMarker = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM markers WHERE id=$1 AND keycloak_id=$2 RETURNING *",
      [id, req.user.sub]
    );
    if (!result.rows.length)
      return res.status(404).json({ error: "Not found" });
    res.json({ message: "Marker deleted" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getMarkers, createMarker, updateMarker, deleteMarker };
