import { FETCH_FAVORITE_TRACKS, SET_FAVORITE_TRACKS } from "../actions/types"

const initialState = {
    fav_tracks: {}
} 

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_FAVORITE_TRACKS:
            return {
                ...state,
                fav_tracks: action.fav_tracks
            }
        case SET_FAVORITE_TRACKS:
            return {
                ...state,
                fav_tracks: action.fav_tracks
            }
        default:
            return state
    }
}