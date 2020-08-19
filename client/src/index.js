import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import GlobalStyles from "./components/GlobalStyles";
import MobileWrapper from "mobile-viewer-component/dist";
import configureStore from "./store";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <MobileWrapper background="weave">
      <Provider store={store}>
        <App />
      </Provider>
    </MobileWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
