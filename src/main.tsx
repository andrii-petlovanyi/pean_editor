import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import theme from "./theme/theme.ts";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HashRouter>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </HashRouter>
);

postMessage({ payload: "removeLoading" }, "*");
