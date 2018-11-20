import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import Web3 from "web3";
import Web3Provider from "react-web3-provider";

ReactDOM.render(
  <Web3Provider
    defaultProvider={cb =>
      cb(
        new Web3(
            new Web3(Web3.currentProvider)
        )
      )
    }
    loading="Loading..."
    error={err => `Connection error: ${err.message}`}
  >
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </Web3Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

