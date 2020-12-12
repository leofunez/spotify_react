import React, { useState, useEffect } from "react"

// Redux Hooks
import { useDispatch, useSelector } from "react-redux"

// Redux Actions
import { setLoading } from "../../../redux/actions/loadingAction"
import { setPlayerPlaying,
         setPlayerCurrentTrack,
         setTrackList,
         setTrackListInfo
} from "../../../redux/actions/playerActions"

// Api
import ApiSpotify from "../../../config/api"

// Global Styles
import {
    PageContainer,
    Input,
    TrackList
} from "../../../components/Globals/Globals.styles"

// Components
import TopDetail from "../../../components/TopDetail/TopDetail"
import Track     from "../../../components/Track/Track"
import Message   from "../../../components/Message/Message"
import NotFound  from "../../../components/NotFound/NotFound"

const Playlist = props => {
    const dispatch = useDispatch()

    // Redux State
    const { playlists : storeMyPlaylists }       = useSelector( state => state.playlists )
    const { is_playing: storeIsPlaying,
            tracklist_info: storeTracklistInfo } = useSelector( state => state.player )
    const { user } = useSelector( state => state.user )

    // Local State
    const [playlistId , setPlaylistId]       = useState(props.match.params.id)
    const [title      , setTitle]         = useState("")
    const [description, setDescription]   = useState("")
    const [image      , setImage]         = useState("")
    const [owner      , setOwner]         = useState([])
    
    const [tracks      , setTracks]       = useState([])
    const [filterTracks, setFilterTracks] = useState([])
    
    const [isPlaying   , setIsPlaying]    = useState(false)
    const [isLiked     , setIsLiked]      = useState(false)
    const [isMyPlaylist, setIsMyPlaylist] = useState(false)
    const [showMessage , setShowMessage]  = useState(false)
    const [messageText , setMessageText]  = useState("")
    const [notFound    , setNotFound]     = useState(false)

    // Methods
    const getPlaylistDetail = async () => {
        try {
            const response = await ApiSpotify.getPlaylist(playlistId)
            const { data } = response

            setTitle(data.name)
            setDescription(data.description)
            setImage(data.images.length > 0 && data.images[0].url)
            
            const responseTracks = await ApiSpotify.getPlaylistTracks(playlistId)
            const dataTracks     = responseTracks.data.items

            setOwner({
                id    : data.owner.id,
                name  : data.owner.display_name,
                type  : "user",
                tracks: dataTracks.length
            })
 
            if (dataTracks?.length) {
                // Show "Remove from this Playlist" option on Track component menu
                user.id && (data.owner.id === user.id) && (setIsMyPlaylist(true))
                
                // Filter tracks that have preview_url value
                const tracksWithAudio = dataTracks.filter( track => (track?.track !== null) && (track?.track?.preview_url !== null) )
                
                let index = 0
                let trackList = []
                while (index < tracksWithAudio.length) {
                    let trackItem = tracksWithAudio[index].track || []

                    let newTrack = {
                        track_index   : index,
                        track_id      : trackItem?.id,
                        track_name    : trackItem?.name,
                        track_duration: trackItem?.duration_ms,
                        track_url     : trackItem?.preview_url || "",
                        artist_id     : trackItem?.artists[0].id,
                        artist_name   : trackItem?.artists[0].name,
                        album_id      : trackItem?.album.id,
                        album_name    : trackItem?.album.name,
                        album_photo   : data?.images[0]?.url || ""
                    }
                    
                    trackList = [...trackList, newTrack]
                    index++
                }
                
                setTracks(trackList)
                setFilterTracks(trackList)

                // fillTrackList()
            } else {
                // Turn off Loading
                setTimeout(() => dispatch(setLoading(false)), 1000)
            }
        } catch (err) {
            window.location.href = "/login"
        }
        
        // Turn off Loading
        setTimeout(() => dispatch(setLoading(false)), 1000)
    }

    // When PlayAll on TopDetail component is clicked
        const dispatchTracklist = () => {
            dispatch(setTrackList(tracks))
            dispatch(setPlayerCurrentTrack(tracks[0]))
            dispatch(setTrackListInfo({id: playlistId, type: "playlist"}))
            dispatch(setPlayerPlaying(true))
        }

        const handlePlayALl = () => {
            if (storeTracklistInfo.type == undefined) {
                dispatchTracklist()
            } else {
                if (storeTracklistInfo.type === "playlist" && storeTracklistInfo.id === playlistId) {
                    dispatch(setPlayerPlaying(false))
                } else {
                    dispatchTracklist()
                }
            }
        }
    // .

    // Computed
    const filter = (filterString) => {
        let trackListFiltered = filterTracks.filter( track => {
            const trackName = track.track_name.toLowerCase()
            const trackArtistName = track.artist_name.toLowerCase()
            return trackName.includes(filterString.toLowerCase()) || trackArtistName.includes(filterString.toLowerCase())
        })

        if (trackListFiltered.length === 0) {
            setShowMessage(true)
            setMessageText(["There is no track with ", <i key="0">{filterString}</i>, " name"])
        } else {
            setShowMessage(false)
            setMessageText("")
        }

        setTracks(trackListFiltered)
    }

    useEffect(() => {
        setPlaylistId(props.match.params.id)

        // this.isLiked()
        getPlaylistDetail()
        
        // Turn on Loading
        return () => {
            dispatch(setLoading(true))
        }
    }, [user, playlistId, props])

    return (
        <PageContainer>
            {notFound ? (
                <NotFound type="playlist" />
            ) : (
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
                        
                        type        ="playlist"
                        typeId      ={playlistId}

                        playAll     ={() => handlePlayALl()}
                    />

                    <Input type="search" placeholder="Filter" isFilter={true} onKeyUp={(e) => filter(e.target.value)} />

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
                                my_playlists   ={storeMyPlaylists}
                                is_my_playlist ={isMyPlaylist}

                                tracklist_id   ={playlistId}
                                tracklist_type ="playlist"
                            />
                        ))}
                    </TrackList>

                    {showMessage && <Message text={messageText} />}
                </>
            )}
        </PageContainer>
    )
}

export default Playlist