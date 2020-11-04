import { combineReducers } from "redux"
import playlistsReducer    from "./playlistsReducer"
import userReducer         from "./userReducer"
import playerReducers      from "./playerReducers"
import favoritesReducers   from "./favoritesReducers"

export default combineReducers({
    playlists : playlistsReducer,
    user      : userReducer,
    player    : playerReducers,
    favorites : favoritesReducers
})