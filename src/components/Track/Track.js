import React, { useState, useEffect } from "react"

// Redux Hooks
import { useDispatch, useSelector } from "react-redux"

// Redux Actions
import {
    setPlayerPlaying,
    setPlayerCurrentTrack,
    setTrackList,
    setTrackListInfo
} from "../../redux/actions/playerActions"

// Api
import ApiSpotify from "../../config/api"

// Styles
import {
    Container,
    Play,
    Pause,
    More,
    MoreList,
    MoreListItem,
    MoreLinkItem,
    MoreText,
    Name,
    Artist,
    Like,
    Duration
} from "./Track.styles"

export const Track = props => {
    const dispatch = useDispatch()

    // Redux State
    const {
        current_track : storeCurrentTrack,
        tracklist     : storeTrackList,
        tracklist_info: storeTracklistInfo,
        is_playing    : storeIsPlaying,
    } = useSelector( state => state.player )

    // Local State
    const [trackId]                         = useState(props.track_id)
    const [trackIndex]                      = useState(props.track_index)
    const [trackName    , setTrackName]     = useState("")
    const [trackArtistId, setTrackArtistId] = useState("")
    const [trackArtist  , setTrackArtist]   = useState("")
    const [trackAlbumId , setTrackAlbumId]  = useState("")
    const [trackDuration, setTrackDuration] = useState("")
    const [trackListType, setTrackListType] = useState("")
    const [myPlaylists]                     = useState(props.my_playlists)

    const [isPlaying, setIsPlaying]         = useState(false)
    const [isLiked  , setIsLiked]           = useState(false)
    const [isCurrent, setIsCurrent]         = useState(false)
    const [openMenu , setOpenMenu]          = useState(false)

    const playTrack = () => {
        // Setting new tracklist
        (props.tracklist_id !== storeTracklistInfo.id) && newTrackList(props.tracklist_type, props.tracklist_id) 

        // Play new track
        let track = storeTrackList[trackIndex]

        if (track !== undefined) {
            let trackToPlay = {
                track_index:    trackIndex,
                track_id:       track.track_id,
                track_name:     track.track_name,
                track_url:      track.track_url,
                track_duration: track.track_duration,
                artist_id:      track.artist_id,
                artist_name:    track.artist_name,
                album_id:       track.album_id,
                album_name:     track.album_name,
                album_photo:    track.album_photo,
            }
            dispatch(setPlayerCurrentTrack(trackToPlay))
            dispatch(setPlayerPlaying(true))
        }
    }

    const newTrackList = async (type, id) => {
        // This method should be exec when PLAYER_TRACKLIST has info
        // and then refill PLAYER_TRACKLIST with the new one
        let newTracksList = []

        if (type === "playlist") {
            try {
                const playlistTracks  = await ApiSpotify.getPlaylistTracks(id)
                const dataTracks      = playlistTracks.data
                const tracksWithAudio = dataTracks.items.filter( track => track.track.preview_url !== null )
                
                let index = 0
                while (index < tracksWithAudio.length) {
                    let track = tracksWithAudio[index]

                    const trackObj = {
                        track_index:    index,
                        track_id:       track.track.id,
                        track_name:     track.track.name,
                        track_duration: track.track.duration_ms,
                        track_url:      track.track.preview_url || "",
                        artist_id:      track.track.artists[0].id,
                        artist_name:    track.track.artists[0].name,
                        album_id:       track.track.album.id,
                        album_name:     track.track.album.name,
                        album_photo:    track.track.album.images[2].url || ""
                    }

                    newTracksList = [...newTracksList, trackObj]
                    index++
                }
            } catch (e) {
                console.log("Playlist tracks API Errors", e)
            }
        } else if (type === "album") {
            try {
                const album_tracks    = await ApiSpotify.getAlbumTracks(props.album_id)
                const { data }        = album_tracks
                const tracksWithAudio = data.items.filter( track => track.preview_url !== null )
                
                let index = 0
                while (index < tracksWithAudio.length) {
                    let track = tracksWithAudio[index]

                    const trackObj = {
                        track_index:    index,
                        track_id:       track.id,
                        track_name:     track.name,
                        track_duration: track.duration_ms,
                        track_url:      track.preview_url || "",
                        artist_id:      track.artists[0].id,
                        artist_name:    track.artists[0].name,
                        album_id:       props.album_id,
                        album_name:     props.album_name,
                        album_photo:    props.album_photo
                    }

                    newTracksList = [...newTracksList, trackObj]
                    index++
                }
            } catch (e) {
                console.log("Album tracks API Errors", e)
            }
        } else if (type === "saved_tracks") {
            const response        = await ApiSpotify.getSavedTracks()
            const { data }        = response
            const tracksWithAudio = data.items.filter( track => track.track.preview_url !== null )

            let index = 0
            while (index < tracksWithAudio.length) {
                let track = tracksWithAudio[index]
                const trackObj = {
                    track_index   : index,
                    track_id      : track.track.id,
                    track_name    : track.track.name,
                    track_duration: track.track.duration_ms,
                    track_url     : track.track.preview_url || "",
                    artist_id     : track.track.artists[0].id,
                    artist_name   : track.track.artists[0].name,
                    album_id      : track.track.album.id,
                    album_name    : track.track.album.name,
                    album_photo   : track.track.album.images[1].url || ""
                }

                newTracksList = [...newTracksList, trackObj]
                index++
            }
        } else if (type === "track") {
            const response = await ApiSpotify.getTrack(id)
            const track    = response.data

            const trackObj = {
                track_index   : 0,
                track_id      : track.id,
                track_name    : track.name,
                track_duration: track.duration_ms,
                track_url     : track.preview_url || "",
                artist_id     : track.artists[0].id,
                artist_name   : track.artists[0].name,
                album_id      : track.album.id,
                album_name    : track.album.name,
                album_photo   : track.album.images[1].url || ""
            }

            newTracksList = [...newTracksList, trackObj]
        } else if (type === "artist") {
            const response        = await ApiSpotify.getArtistTopTracks(id)
            const { data }        = response
            const tracksWithAudio = data.tracks.filter( track => track.preview_url !== null )

            let index = 0
            while (index < tracksWithAudio.length) {
                let track = tracksWithAudio[index]
                
                const trackObj = {
                    track_index   : index,
                    track_id      : track.id,
                    track_name    : track.name,
                    track_duration: track.duration_ms,
                    track_url     : track.preview_url || "",
                    artist_id     : track.artists[0].id,
                    artist_name   : track.artists[0].name,
                    album_id      : track.album.id,
                    album_name    : track.album.name,
                    album_photo   : track.album.images[1].url || ""
                }

                newTracksList = [...newTracksList, trackObj]
                index++
            }
        }

        dispatch(setTrackList(newTracksList))
        dispatch(setTrackListInfo({id, type}))
    }

    const pauseTrack = () => {
        dispatch(setPlayerPlaying(false))
        setIsPlaying(false)
    }

    const getTrackTime = (duration) => {
        if (duration) {
            let minutes = Math.floor(duration / 60000)
            let seconds = ((duration % 60000) / 1000).toFixed(0)
            
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
        } else {
            return "00:00"
        }
    }

    const openCloseMenu = (state) => {
        setOpenMenu(state)
    }

    const isCurrentTrack = () => {
        if (trackId === storeCurrentTrack.track_id) {
            setIsPlaying(true)
            setIsCurrent(true)
        } else {
            setIsPlaying(false)
            setIsCurrent(false)
        }
    }

    useEffect(() => {
        setTrackName(props.track_name)
        setTrackArtistId(props.artist_id)
        setTrackArtist(props.artist_name)
        setTrackAlbumId(props.album_id)
        setTrackDuration(getTrackTime(props.track_duration))
        setTrackListType(props.tracklist_type)

        isCurrentTrack()
    }, [props, storeCurrentTrack])

    return (
        <Container>
            {!isPlaying ? (
                <Play onClick={() => playTrack()} />
            ) : (
                <Pause onClick={() => pauseTrack()} />
            )}

            {/* More Menu */}
                <More onClick={() => openCloseMenu(!openMenu)} onMouseLeave={() => openCloseMenu(false)}>
                    <MoreList isOpen={openMenu}>
                        <MoreLinkItem to={`/artist/${trackArtistId}`}>Go to Artist</MoreLinkItem>
                        
                        {trackListType !== "album" && (
                            <MoreLinkItem to={`/album/${trackAlbumId}`}>Go to Album</MoreLinkItem>
                        )}
                        
                        {/* <MoreListItem>
                            Add to Playlist
                            
                            <MoreList>
                                {myPlaylists.map( (playlist, index) => (
                                    <MoreLinkItem to="" key={`${playlist.id}-${index}`}>
                                        <MoreText>{playlist.name}</MoreText>
                                    </MoreLinkItem>
                                ))}
                            </MoreList>
                        </MoreListItem> */}
                        
                        {props.showRemove && (
                            <MoreListItem>Remove from this Playlist</MoreListItem>
                        )}
                    </MoreList>
                </More>
            {/* .More Menu */}

            <Name isActive={isCurrent}>{trackName}</Name>

            <Artist to={`/artist/${trackArtistId}`}>{trackArtist}</Artist>

            <Like></Like>

            <Duration>{trackDuration}</Duration>
        </Container>
    )
}