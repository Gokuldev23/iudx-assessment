// src/hooks/useMarkerForm.js
import { useState } from "react";

export function useMarkerForm() {
  const [showForm, setShowForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [editingMarker, setEditingMarker] = useState(null);

  const openFormForNew = (latlng) => {
    setSelectedPosition(latlng);
    setEditingMarker(null);
    setShowForm(true);
  };

  const openFormForEdit = (marker) => {
    setEditingMarker(marker);
    setSelectedPosition({
      lat: parseFloat(marker.latitude),
      lng: parseFloat(marker.longitude),
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedPosition(null);
    setEditingMarker(null);
  };

  return {
    showForm,
    selectedPosition,
    editingMarker,
    openFormForNew,
    openFormForEdit,
    closeForm,
  };
}
