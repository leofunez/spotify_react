import { IS_PLAYING } from "./types"

export const setIsPlaying = () => dispatch => {
    dispatch({
        type: IS_PLAYING,
        is_playing
    })
}