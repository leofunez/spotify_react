import { LOADING } from "../actions/types"

const initialState = {
    loading: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state
    }
}