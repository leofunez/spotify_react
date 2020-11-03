import { 
    PLAYER_IS_PLAYING, 
    PLAYER_SHUFFLE, 
    PLAYER_REPEAT, 
    PLAYER_CURRENT_TRACK,
    PLAYER_TRACKLIST,
    PLAYER_TRACKLIST_INFO
} from "./types"

export const setPlayerPlaying = new_state => dispatch => {
    dispatch({
        type: PLAYER_IS_PLAYING,
        is_playing: new_state
    })
}

export const setPlayerShuffle = new_state => dispatch => {
    dispatch({
        type: PLAYER_SHUFFLE,
        shuffle: new_state
    })
}

export const setPlayerRepeat = new_state => dispatch => {
    dispatch({
        type: PLAYER_REPEAT,
        repeat: new_state
    })
}

export const setPlayerCurrentTrack = new_state => dispatch => {
    dispatch({
        type: PLAYER_CURRENT_TRACK,
        current_track: new_state
    })
}

export const setTrackList = new_state => dispatch => {
    dispatch({
        type: PLAYER_TRACKLIST,
        tracklist: new_state
    })
}

export const setTrackListInfo = new_state => dispatch => {
    dispatch({
        type: PLAYER_TRACKLIST_INFO,
        tracklist_info: new_state
    })
}