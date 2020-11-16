import { FETCH_USER } from "./types"

// Api
import ApiSpotify from "../../config/api"

const fetchUser = () => async dispatch => {
    try {
        const response = await ApiSpotify.getMe()
        const { data } = response

        dispatch({
            type: FETCH_USER,
            user: data
        })
    } catch (err) {
        const { status } = err.response
        
        if (status === 401) {
            window.location.href = "/login"
        } else {
            console.log(err.response)
        }
    }
}

export default fetchUser