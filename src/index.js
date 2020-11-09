import React from "react"

import { Provider } from "react-redux"
import storeFn from "./redux/store/store"

import ReactDOM from "react-dom"
import Routes from "./config/routes"
import "./assets/scss/globals.scss"
import * as serviceWorker from "./serviceWorker"

const store = storeFn()

// Create Playlists & Artists Storage
let JSONStoragePlaylists = JSON.parse(localStorage.getItem("spotifyReactPlaylists"))
JSONStoragePlaylists === null && localStorage.setItem("spotifyReactPlaylists", JSON.stringify([]))

let JSONStorageArtists = JSON.parse(localStorage.getItem("spotifyReactArtists"))
JSONStorageArtists === null && localStorage.setItem("spotifyReactArtists", JSON.stringify([]))

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
