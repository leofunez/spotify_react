import { IS_REPEATING } from "./types"

export const setIsRepeating = () => dispatch => {
    dispatch({
        type: IS_REPEATING,
        is_repeating
    })
}