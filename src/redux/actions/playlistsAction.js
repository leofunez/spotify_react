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
        console.log(err.response)
    }
}