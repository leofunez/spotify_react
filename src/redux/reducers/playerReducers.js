import { 
    PLAYER_IS_PLAYING, 
    PLAYER_SHUFFLE, 
    PLAYER_REPEAT, 
    PLAYER_CURRENT_TRACK,
    PLAYER_TRACKLIST,
    PLAYER_TRACKLIST_INFO
} from "../actions/types"

const initialState = {
    is_playing    : false,
    shuffle       : false,
    repeat        : false,
    current_track : {},
    tracklist     : [],
    tracklist_info: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PLAYER_IS_PLAYING:
            return {
                ...state,
                is_playing: action.is_playing
            }
        case PLAYER_SHUFFLE:
            return {
                ...state,
                shuffle: action.shuffle
            }
        case PLAYER_REPEAT:
            return {
                ...state,
                repeat: action.repeat
            }
        case PLAYER_CURRENT_TRACK:
            return {
                ...state,
                current_track: action.current_track
            }
        case PLAYER_TRACKLIST:
            return {
                ...state,
                tracklist: action.tracklist
            }
        case PLAYER_TRACKLIST_INFO:
            return {
                ...state,
                tracklist_info: action.tracklist_info
            }
        default:
            return state
    }
}