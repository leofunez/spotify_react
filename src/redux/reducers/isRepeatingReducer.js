import { IS_REPEATING } from "../actions/types"

const initialState = {
    is_repeating: false
}

export default (state = initialState, action) => {
    switch(action.type) {
        case IS_REPEATING:
            return {
                ...state,
                is_repeating: action.is_repeating
            }
        default:
            return state
    }
}