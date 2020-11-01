import { IS_PLAYING } from "../actions/types"

const initialState = {
    is_playing: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case IS_PLAYING:
            return {
                ...state,
                is_playing: action.is_playing
            }
        default:
            return state
    }
}