import { FETCH_PLAYLISTS, NEW_PLAYLIST } from "../actions/types"

const initialState = {
    playlists: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PLAYLISTS:
            return {
                ...state,
                playlists: action.playlists
            }
        default:
            return state
    }
}