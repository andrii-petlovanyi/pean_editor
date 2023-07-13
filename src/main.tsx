import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import theme from "./theme/theme.ts";
import { persistor, store } from "./redux/store.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { config } from "./config/config.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HashRouter>
    <ChakraProvider theme={theme}>
      <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </HashRouter>
);

postMessage({ payload: "removeLoading" }, "*");
