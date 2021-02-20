import { FETCH_PLAYLISTS } from "./types"

// Api
import ApiSpotify from "../../config/api"

// Helpers
import { goToLogin } from "../../helpers/goToLogin"

export const fetchPlaylists = () => async dispatch => {
    try {
        const response  = await ApiSpotify.getMyPlaylists()
        const { items } = response.data
        
        dispatch({
            type: FETCH_PLAYLISTS,
            playlists: items
        })
    } catch(err) {
        goToLogin()
    }
}