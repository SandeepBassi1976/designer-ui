import ReactDOM from "react-dom";
import { StoreProvider } from "./context/Store";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "rc-dropdown/assets/index.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  rootElement
);

