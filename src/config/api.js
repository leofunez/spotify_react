import axios from "axios"

// const spotifyToken = localStorage.getItem("spotifyToken")
const spotifyToken = "BQALfKZOixzOSziFlr9IPqp6UUE6myYCZb8uoyIpuO5XVyc92W4_l5LdxRyvIX5fh8dEOXrcVxInhom3J_0iub334iGU4EZYu3zC4EsgpgyzFE-UT92wJyjK6N1EAQK63BwdB76iPa654loGvGZJ8IjsSltQtwQA0WotzN9j6YbhKQCF5HyVl0qQ0zN9TI3T38C1NbhGiHAHgWuf-76bwBarU3Vq6qki6WsxAL2vsR3eviUy4zSRFS9HlrbF23ZgqHw5dLbrL14G73fxp0E"

const headers = {
    Accept: "application/json",
    Authorization: "Bearer " + spotifyToken,
    "Content-Type": "application/json"
}

const baseURL = "https://api.spotify.com/v1/"

const apiSpotify = axios.create({
	baseURL,
	withCredentials: false,
	headers
})

export default ({
    // Home
        getNewReleases() {
            return apiSpotify("browse/new-releases")
        },

        getFeaturedPlaylists() {
            return apiSpotify("browse/featured-playlists")
        },
    // .Home

    // Details
        // Playlist
            getPlaylist(id) {
                return apiSpotify(`playlists/${id}`)
            },
            
            getPlaylistImage(id) {
                return apiSpotify(`playlists/${id}/images`)
            },

            getPlaylistTracks(id) {
                return apiSpotify(`playlists/${id}/tracks?offset=0&limit=100`)
            },
        // .Playlist

        // Album
            getAlbumInfo(id) {
                return apiSpotify(`albums/${id}`)
            },

            getAlbumTracks(id) {
                return apiSpotify(`albums/${id}/tracks`)
            },
        // .Album

        // Artist
            getArtistInfo(id) {
                return apiSpotify(`artists/${id}`)
            },

            getArtistTopTracks(id) {
                return apiSpotify(`artists/${id}/top-tracks?country=es`)
            },

            getArtistAlbums(id) {
                return apiSpotify(`artists/${id}/albums`)
            },

            getArtistRelated(id) {
                return apiSpotify(`artists/${id}/related-artists`)
            },

            getArtists(ids) {
                return apiSpotify(`artists/?ids=${ids}`)
            },
        // .Artist

        // Track
            getTrack(id) {
                return apiSpotify(`tracks/${id}`)
            },
        // Track
    // .Details

    // Me
        getMe() {
            return apiSpotify("me")
        },

        getSavedTracks() {
            return apiSpotify("me/tracks")
        },

        getSavedAlbums() {
            return apiSpotify("me/albums")
        },

        getMyPlaylists() {
            return apiSpotify("me/playlists")
        },

        async putTrackIntoPlaylist(playlist_id, track_id){
            try {
                const response = await axios({
                    method: "POST",
                    url: `${baseURL}playlists/${playlist_id}/tracks?uris=spotify:track:${track_id}`,
                    headers
                })

                return response
            } catch(err) {
                return err.response
            }
        },

        async deleteTrackFromPlaylist(playlist_id, track_id, track_index) {
            try {
                const response = await axios({
                    method: "DELETE",
                    url: `${baseURL}playlists/${playlist_id}/tracks`,
                    headers,
                    data: {tracks: [{
                        uri: `spotify:track:${track_id}`,
                        positions: [track_index]
                    }]}
                })

                return response
            } catch(err) {
                return err.response
            }
        },

        async putSavedAlbums(id) {
            try {
                const response = await axios({
                    method: "PUT",
                    url: `${baseURL}me/albums?ids=${id}`,
                    headers
                })
                return response.data
            } catch(err) {
                console.log("Error putting item on MyAlbums!", err.response)
            }
        },

        async deleteSavedAlbums(id) {
            try {
                const response = await axios({
                    method: "DELETE",
                    url: `${baseURL}me/albums?ids=${id}`,
                    headers
                })
                return response
            } catch(err) {
                console.log("Error deleting item on MyAlbums!", err.response)
            }
        },

        async putSavedTrack(id) {
            try {
                const response = await axios({
                    method: "PUT",
                    url: `${baseURL}me/tracks?ids=${id}`,
                    headers
                })
                return response.data
            } catch(err) {
                console.log("Error putting item on MyTracks!", err.response)
            }
        },

        async deleteSavedTrack(id) {
            try {
                const response = await axios({
                    method: "DELETE",
                    url: `${baseURL}me/tracks?ids=${id}`,
                    headers
                })
                return response
            } catch(err) {
                console.log("Error deleting item on MyTracks!", err.response)
            }
        },

        async createPlaylist(name, description, is_public, user_id) {
            try {
                const response = await axios({
                    method: "POST",
                    url: `${baseURL}users/${user_id}/playlists`,
                    headers,
                    data: {
                        name,
                        description,
                        public: is_public
                    }
                })

                return response
            } catch(err) {
                console.log("Error creating the playlist!", err.response)
            }
        },
    // .Me

    // User
        getUserInfo(id) {
            return apiSpotify(`users/${id}`)
        },

        getUserPlaylists(id) {
            return apiSpotify(`users/${id}/playlists`)
        },
    // .User

    // Search
        async search(query) {
            return apiSpotify(`search?q=${query}&type=track%2Cplaylist%2Calbum%2Cartist`)
        }
    // .Search
})