import { LOADING } from "./types"

export const setLoading = new_state => dispatch => {
    dispatch({
        type: LOADING,
        loading: new_state
    })
}