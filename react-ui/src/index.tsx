import "./jquery";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min";
import "./index.css";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Router } from "react-router";

const baseUrl =
  document.getElementsByTagName("base")[0].getAttribute("href") || "";
const history = createBrowserHistory({ basename: baseUrl });

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  rootElement
);

registerServiceWorker();
