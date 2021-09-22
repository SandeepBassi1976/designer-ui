import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { StoreProvider } from "./context/Store";
import App from "./App";
import "react-notifications/lib/notifications.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rc-dropdown/assets/index.css";

///REDUX
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./REDUX/reducers/index";
const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  rootElement
);
