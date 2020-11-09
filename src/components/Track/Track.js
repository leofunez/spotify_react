import React, { memo, useState, useEffect, useCallback } from "react"

// Redux Hooks
import { useDispatch, useSelector } from "react-redux"

// Redux Actions
import {
    setPlayerPlaying,
    setPlayerCurrentTrack,
    setTrackList,
    setTrackListInfo
} from "../../redux/actions/playerActions"
import { fetchFavoriteTracks, setFavoriteTracks } from "../../redux/actions/favoritesAction"

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

export const Track = memo(({
    track_id      : trackId, 
    track_index   : trackIndex, 
    track_name    : trackName,
    artist_id     : artistId,
    artist_name   : artistName,
    album_id      : albumId,
    album_name    : albumName,
    album_photo   : albumPhoto,
    tracklist_type: tracklistType,
    tracklist_id  : tracklistId,
    my_playlists  : myPlaylists,
    show_remove   : showRemove,
    track_duration
}) => {
    const dispatch = useDispatch()

    // Redux State
    const {
        current_track : storeCurrentTrack,
        tracklist     : storeTrackList,
        tracklist_info: storeTracklistInfo,
        is_playing    : storeIsPlaying,
    } = useSelector( state => state.player )
    const {
        fav_tracks    :storeFavTracks
    } = useSelector( state => state.favorites )

    // Local State
    const [trackDuration, setTrackDuration] = useState("")
    const [isPlaying    , setIsPlaying]     = useState(false)
    const [isLiked      , setIsLiked]       = useState(false)
    const [isCurrent    , setIsCurrent]     = useState(false)
    const [openMenu     , setOpenMenu]      = useState(false)

    const playTrack = () => {
        // Setting new tracklist
        (tracklistId !== storeTracklistInfo.id) && newTrackList(tracklistType, tracklistId) 

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
                const album_tracks    = await ApiSpotify.getAlbumTracks(albumId)
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
                        album_id:       albumId,
                        album_name:     albumName,
                        album_photo:    albumPhoto
                    }

                    newTracksList = [...newTracksList, trackObj]
                    index++
                }
            } catch (e) {
                console.log("Album tracks API Errors", e)
            }
        } else if (type === "saved_tracks") {
            const tracksWithAudio = storeFavTracks.filter( track => track.track.preview_url !== null )

            let index = 0
            while (index < tracksWithAudio.length) {
                let { track } = tracksWithAudio[index]
                
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

    // Like Track
        const isAlreadyLiked = () => {
            if (storeFavTracks.length > 0) {
                let index = 0
                while (index < storeFavTracks.length) {
                    let { track } = storeFavTracks[index]

                    if (track !== undefined) {
                        if (track.id === trackId) {
                            setIsLiked(track.id === trackId)
                        }
                    }
                    
                    index++
                }
            }
        }

        const likeTrack = async () => {
            let favTracks = storeFavTracks
            
            if (favTracks.length > 0) {
                if (isLiked) {
                    await ApiSpotify.deleteSavedTrack(trackId)
                    const newFavTracks = favTracks.filter( track => track.track && track.track.id !== trackId )
                    favTracks = newFavTracks
                } else {
                    await ApiSpotify.putSavedTrack(trackId)
                    favTracks = [...favTracks, trackId]
                }

                dispatch(setFavoriteTracks(favTracks))
                dispatch(fetchFavoriteTracks())
                
                setIsLiked(!isLiked)
            }
        }
    // .Like Track

    useEffect(() => {
        setTrackDuration(getTrackTime(track_duration))

        isAlreadyLiked()
        isCurrentTrack()
        console.log("3. Track!")
    }, [storeCurrentTrack, storeFavTracks])

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
                        <MoreLinkItem to={`/artist/${artistId}`}>Go to Artist</MoreLinkItem>
                        
                        {tracklistType !== "album" && (
                            <MoreLinkItem to={`/album/${albumId}`}>Go to Album</MoreLinkItem>
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
                        
                        {showRemove && (
                            <MoreListItem>Remove from this Playlist</MoreListItem>
                        )}
                    </MoreList>
                </More>
            {/* .More Menu */}

            <Name isActive={isCurrent}>{trackName}</Name>

            <Artist to={`/artist/${artistId}`}>{artistName}</Artist>

            <Like isActive={isLiked} onClick={() => likeTrack()}></Like>

            <Duration>{trackDuration}</Duration>
        </Container>
    )
})