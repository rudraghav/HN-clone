import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouterConfig from "./RouterConfig";
import * as serviceWorker from "./serviceWorker";
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Verdana: 300, 400, 500, 600', 'Geneva', 'sans-serif']
  }
});

ReactDOM.render(
  <React.StrictMode>
    <RouterConfig />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
