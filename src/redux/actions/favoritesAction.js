import { 
    FETCH_FAVORITE_TRACKS, 
    SET_FAVORITE_TRACKS 
} from "./types"

// Api
import ApiSpotify from "../../config/api"

export const fetchFavoriteTracks = () => async dispatch => {
    try {
        const response = await ApiSpotify.getSavedTracks()
        const { items } = response.data
        
        dispatch({
            type: FETCH_FAVORITE_TRACKS,
            fav_tracks: items
        })
    } catch (err) {
        console.log(err.response)
    }
}

export const setFavoriteTracks = new_state => dispatch => {
    dispatch({
        type: SET_FAVORITE_TRACKS,
        fav_tracks: new_state
    })
}