import { FETCH_USER } from "./types"

// Api
import ApiSpotify from "../../config/api"

// Helpers
import { goToLogin } from "../../helpers/goToLogin"

const fetchUser = () => async dispatch => {
    try {
        const response = await ApiSpotify.getMe()
        const { data } = response

        dispatch({
            type: FETCH_USER,
            user: data
        })
    } catch (err) {
        goToLogin()
    }
}

export default fetchUser