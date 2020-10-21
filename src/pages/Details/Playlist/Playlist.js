import React, { useState, useEffect } from "react"

// Api
import ApiSpotify from "../../../config/api"

// Global Styles
import {
    PageContainer,
    Input,
    TrackList
} from "../../../components/Globals/Globals.styles"

// Components
import {TopDetail} from "../../../components/TopDetail/TopDetail"
import {Track} from "../../../components/Track/Track"

const Playlist = props => {
    const [playlistId] = useState(props.match.params.id)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [owner, setOwner] = useState([])
    
    const [tracks, setTracks] = useState([])
    const [filterTracks, setFilterTracks] = useState([])
    
    const [isLoading, setIsLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [isMyPlaylist, setIsMyPlaylist] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const getPlaylistDetail = async () => {
        try {
            const response = await ApiSpotify.getPlaylist(playlistId)
            const response_tracks = await ApiSpotify.getPlaylistTracks(playlistId)
            
            const { data }    = response
            const data_tracks = response_tracks.data.items

            setTitle(data.name)
            setDescription(data.description)
            setImage(data.images.length > 0 && data.images[0].url)

            if (data_tracks.length > 0) {
                setOwner({
                    id    : data.owner.id,
                    name  : data.owner.display_name,
                    type  : "user",
                    tracks: response_tracks.data.items.length
                })
                
                // Show "Remove from this Playlist" option on Track component menu
                // this.GET_USER[0] && (data.owner.id === this.GET_USER[0].id) && (this.its_my_playlist = true)

                // const tracks_with_audio = data_tracks.filter( track => track.track.preview_url !== null )

                const trackList = data_tracks.map( (track, index) => {
                    let _track = track.track

                    const new_track = {
                        track_index   : index,
                        track_id      : _track.id,
                        track_name    : _track.name,
                        track_duration: _track.duration_ms,
                        track_url     : _track.preview_url || "",
                        artist_id     : _track.artists[0].id,
                        artist_name   : _track.artists[0].name,
                        album_id      : _track.album.id,
                        album_name    : _track.album.name,
                        album_photo   : data.images[0].url || ""
                    }

                    return new_track
                })

                setTracks(trackList)
                setFilterTracks(trackList)

                // this.fillTrackList()
            } else {
                // this.SET_IS_LOADING(false)
            }
        } catch (err) {
            // err.response.status === 401 && (window.location.href = "/login")
            err.response.status === 404 && (setNotFound(true))
            console.log("PlaylistDetail API Error!", err.response)
        }

        // this.SET_IS_LOADING(false)
    }

    useEffect(() => {
        // this.SET_IS_LOADING(true)
        // this.isLiked()
        getPlaylistDetail()

        // this.SET_PLAYING && this.SET_CURRENT_TRACKLIST === this.playlist_id && (this.is_playing = true)
    }, [])

    return (
        <PageContainer>
            {/* {!notFound && !isLoading && ( */}
                <>
                    <TopDetail
                        pretitle    ="Playlist"
                        title       ={title}
                        description ={description}
                        owner       ={owner}
                        image       ={image}
                        isPlaying   ={isPlaying}
                        isLiked     ={isLiked}
                        showLike    ={!isMyPlaylist}
                    />

                    <Input type="search" placeholder="Filter" />

                    <TrackList>
                        {tracks.map( (track, index) => (
                            <Track
                                key            ={`${track.track_id}-${index}`}
                                track_index    ={track.track_index}
                                track_id       ={track.track_id}
                                track_name     ={track.track_name}
                                track_url      ={track.track_url}
                                track_duration ={track.track_duration}
                                artist_id      ={track.artist_id}
                                artist_name    ={track.artist_name}
                                album_id       ={track.album_id}
                                album_name     ={track.album_name}
                                album_photo    ={track.album_photo}
                                show_remove    ={isMyPlaylist}

                                tracklist_id   ={playlistId}
                                tracklist_type ="playlist"
                            />
                        ))}
                    </TrackList>
                </>
            {/* )} */}
        </PageContainer>
    )
}

export default Playlist