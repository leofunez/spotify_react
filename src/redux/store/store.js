import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

const initialState = {
    user: {},
    playlists: [],
    currentTrack: {},
    is_playing: false
}

const reducerSpotify = (state = initialState, action) => {
    console.log("***", action)
    return state
}

// import reducers from "../reducers/reducers"

export default () => {
    return {
        ...createStore(reducerSpotify, applyMiddleware(thunk))
    }
}