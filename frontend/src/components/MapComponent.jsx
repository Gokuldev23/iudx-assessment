import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import MarkerForm from "./MarkerForm";
import { useMarkers } from "../hooks/useMarkers";
import { useMarkerForm } from "../hooks/useMarkerForm";

// leaflet icons fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapClickHandler = ({ onMapClick }) => {
  useMapEvents({ click: (e) => onMapClick(e.latlng) });
  return null;
};

const MapComponent = () => {
  const { markers, loading, addMarker, editMarker, removeMarker } =
    useMarkers();
  const {
    showForm,
    selectedPosition,
    editingMarker,
    openFormForNew,
    openFormForEdit,
    closeForm,
  } = useMarkerForm();

  const handleFormSubmit = (formData) => {
    const markerData = {
      ...formData,
      latitude: selectedPosition.lat,
      longitude: selectedPosition.lng,
    };
    if (editingMarker) {
      editMarker(editingMarker.id, markerData);
    } else {
      addMarker(markerData);
    }
    closeForm();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800">
          Your Favorite Locations
        </h3>
        <p className="text-blue-600">
          Click anywhere on the map to add a new marker. Click on existing
          markers to edit or delete them.
        </p>
        <p className="text-sm text-blue-500 mt-1">
          Total markers: {markers.length}
        </p>
      </div>

      <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[20.0, 0.0]}
          zoom={2}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapClickHandler onMapClick={openFormForNew} />

          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[+marker.latitude, +marker.longitude]}
            >
              <Popup>
                <div className="min-w-48">
                  <h4 className="font-bold text-lg mb-2">{marker.title}</h4>
                  {marker.description && (
                    <p className="text-gray-700 mb-3">{marker.description}</p>
                  )}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openFormForEdit(marker)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeMarker(marker.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {selectedPosition && !editingMarker && (
            <Marker position={[selectedPosition.lat, selectedPosition.lng]} />
          )}
        </MapContainer>
      </div>

      {showForm && (
        <MarkerForm
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
          initialData={editingMarker}
          position={selectedPosition}
        />
      )}
    </div>
  );
};

export default MapComponent;
