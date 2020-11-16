import { FETCH_PLAYLISTS } from "./types"

// Api
import ApiSpotify from "../../config/api"

export const fetchPlaylists = () => async dispatch => {
    try {
        const response  = await ApiSpotify.getMyPlaylists()
        const { items } = response.data
        
        dispatch({
            type: FETCH_PLAYLISTS,
            playlists: items
        })
    } catch(err) {
        const { status } = err.response
        
        if (status === 401) {
            window.location.href = "/login"
        } else {
            console.log(err.response)
        }
    }
}