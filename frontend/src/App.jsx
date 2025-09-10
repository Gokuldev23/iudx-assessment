import { useState, useEffect, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import keycloak, { initKeycloak } from "./services/keycloak.js";
// Styles
import "leaflet/dist/leaflet.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavBar from "./components/Navbar.jsx";
import Loading from "./components/Loading.jsx";
import MapComponent from "./components/MapComponent.jsx";

function App() {
  // ---------------- State ----------------
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  // ---------------- Effects ----------------
  useEffect(() => {
    if (keycloak.didInitialize) return;

    initKeycloak()
      .then((auth) => {
        setKeycloakInitialized(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Keycloak initialization failed:", error);
        setLoading(false);
      });
  }, []);

  // ---------------- Render Helpers ----------------
  if (loading) {
    return <Loading />;
  }

  if (!keycloakInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Authentication Error
          </h1>
          <p className="text-gray-600">
            Failed to initialize authentication service
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MapComponent />
      </main>
      <ToastContainer
        style={{ color: "black" }}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
