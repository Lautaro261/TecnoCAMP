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
    <Auth0Provider
   /*  domain = {VITE_DOMAIN}
    clientId= {VITE_CLIENTID} */
    domain="dev-csn8fa2s8p4j2ruw.us.auth0.com" 
    clientId="wYH19RfYMwKAsc5oFYDFP5dfLlCK7PaW"

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
);
