import { combineReducers } from "redux"
import playlistsReducer    from "./playlistsReducer"
import userReducer         from "./userReducer"
import playerReducers      from "./playerReducers"

export default combineReducers({
    playlists   : playlistsReducer,
    user        : userReducer,
    player      : playerReducers
})