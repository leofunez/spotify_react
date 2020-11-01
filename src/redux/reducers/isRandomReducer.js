import { IS_RANDOM } from "../actions/types"

const initialState = {
    is_random: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case IS_RANDOM:
            return {
                ...state,
                is_random: action.is_random
            }
        default:
            return state
    }
}