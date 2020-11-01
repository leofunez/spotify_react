import { CURRENT_TRACK } from "./types"

export const setCurrentTrack = () => dispatch => {
    dispatch({
        type: CURRENT_TRACK,
        current_track
    })
}