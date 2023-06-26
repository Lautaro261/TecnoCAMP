import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App"
import { Provider } from 'react-redux';
import store from "./Redux/store";
const { VITE_DOMAIN, VITE_CLIENTID } = import.meta.env;

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    domain = {VITE_DOMAIN}
    clientId= {VITE_CLIENTID}
    //domain="dev-63fntm00jadd2yyb.us.auth0.com"
    //clientId="nwkBhPmGn2XBp77V3X16a9m0eqgnriW8"

    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    
    >

    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
