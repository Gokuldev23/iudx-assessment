// src/hooks/useMarkers.js
import { useState, useEffect } from "react";
import {
  getMarkers,
  createMarker,
  updateMarker,
  deleteMarker,
} from "../services/api";
import { toast } from "react-toastify";

export function useMarkers() {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMarkers();
  }, []);

  const loadMarkers = async () => {
    try {
      setLoading(true);
      const response = await getMarkers();
      setMarkers(response.data);
    } catch (error) {
      console.error("Error loading markers:", error);
      toast.error("Failed to load markers");
    } finally {
      setLoading(false);
    }
  };

  const addMarker = async (markerData) => {
    try {
      const response = await createMarker(markerData);
      setMarkers((prev) => [...prev, response.data]);
      toast.success("Marker created successfully", {
        style: { color: "black", background: "lightgreen" },
      });
    } catch (error) {
      console.error("Error creating marker:", error);
      toast.error("Failed to create marker");
    }
  };

  const editMarker = async (id, data) => {
    try {
      const response = await updateMarker(id, data);
      setMarkers((prev) => prev.map((m) => (m.id === id ? response.data : m)));
      toast.success("Marker updated successfully", {
        style: { color: "black", background: "lightgreen" },
      });
    } catch (error) {
      console.error("Error updating marker:", error);
      toast.error("Failed to update marker");
    }
  };

  const removeMarker = async (id) => {
    try {
      await deleteMarker(id);
      setMarkers((prev) => prev.filter((m) => m.id !== id));
      toast.success("Marker deleted successfully", {
        style: { color: "black", background: "lightgreen" },
      });
    } catch (error) {
      console.error("Error deleting marker:", error);
      toast.error("Failed to delete marker");
    }
  };

  return { markers, loading, addMarker, editMarker, removeMarker };
}
