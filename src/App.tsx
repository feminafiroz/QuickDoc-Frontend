import React from 'react';
import './App.css';
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routes/router";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  




const App: React.FC = () => {
  // const clientId = configKeys.CLIENT_ID || 'default-client-id';
  return (
    <>
      <Provider store={store}>
      <PersistGate persistor={persistor}>
      <GoogleOAuthProvider clientId={clientId}>
    <BrowserRouter> 
      <MainRouter />
    </BrowserRouter>
    <Toaster />
    </GoogleOAuthProvider>
    </PersistGate>
      </Provider>
    </>
  );
}

export default App;