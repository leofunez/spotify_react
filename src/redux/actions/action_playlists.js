const START_GET_PLAYLISTS = "START_GET_PLAYLISTS"
const SUCCESS_GET_PLAYLISTS = "SUCCESS_GET_PLAYLISTS"

const startGetPlaylists = payload => ({
    type: START_GET_PLAYLISTS,
    ...payload
})

const successGetPlaylists = payload => ({
    type: SUCCESS_GET_PLAYLISTS,
    ...payload
})

export const getPlaylists = payload => {
    return dispatch => {
        dispatch(startGetPlaylists())

        fetch("https://pokeapi.co/api/v2/pokemon")
        .then( response => response.json() )
        .then( result => dispatch(successGetPlaylists(result)) )
    }
}