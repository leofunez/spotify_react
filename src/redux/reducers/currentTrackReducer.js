import { CURRENT_TRACK } from "../actions/types"

const initialState = {
    current_track: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case CURRENT_TRACK:
            return {
                ...state,
                current_track: action.current_track
            }
        default:
            return state
    }
}