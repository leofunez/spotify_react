import { IS_RANDOM } from "./types"

export const setIsRandom = () => dispatch => {
    dispatch({
        type: IS_RANDOM,
        is_random: is_random
    })
}