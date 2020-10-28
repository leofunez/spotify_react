import React from "react"

import { Provider } from "react-redux"
import storeFn from "./redux/store/store"

import ReactDOM from "react-dom"
import Routes from "./config/routes"
import "./assets/scss/globals.scss"
import * as serviceWorker from "./serviceWorker"

const store = storeFn()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			{Routes}
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
