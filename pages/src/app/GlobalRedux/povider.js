"use client";

import { Provider } from "react-redux";

import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
