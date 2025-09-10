// src/services/keycloak.js
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: "my-app",
  clientId: "map-frontend",
};

const keycloak = new Keycloak(keycloakConfig);

export const initKeycloak = () => {
  return keycloak.init({
    onLoad: "login-required",
    checkLoginIframe: false,
  });

};

export const login = () => {
  return keycloak.login();
};

export const logout = () => {
  return keycloak.logout({
    redirectUri: window.location.origin,
  });
};

export const getToken = () => {
  return keycloak.token;
};

export const isLoggedIn = () => {
  return !!keycloak.token;
};

export const updateToken = (successCallback) => {
  return keycloak
    .updateToken(5)
    .then(successCallback)
    .catch(() => {
      console.log("Failed to refresh token");
    });
};

export const getUsername = () => {
  return keycloak.tokenParsed?.preferred_username;
};

export const getUserInfo = () => {
  return keycloak.tokenParsed;
};

export default keycloak;
