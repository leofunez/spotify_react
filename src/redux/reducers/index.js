import { combineReducers } from "redux"
import playlistsReducer    from "./playlistsReducer"
import userReducer         from "./userReducer"
import isRandomReducer     from "./isRandomReducer"
import isRepeating         from "./isRepeatingReducer"

export default combineReducers({
    playlists   : playlistsReducer,
    user        : userReducer,
    is_random   : isRandomReducer,
    is_repeating: isRepeating
})