import { combineReducers } from "redux"
import playlistsReducer from "./playlistsReducer"
import userReducer from "./userReducer"

export default combineReducers({
    playlists: playlistsReducer,
    user: userReducer,
})