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

const Album = props => {
    const dispatch = useDispatch()

    // Redux State
    const { is_playing: storeIsPlaying,
            tracklist_info: storeTracklistInfo } = useSelector( state => state.player )

    // Local State
    const [albumId]                               = useState(props.match.params.id)
    const [albumTitle, setAlbumTitle]             = useState("")
    const [albumDescription, setAlbumDescription] = useState("")
    const [albumImage, setAlbumImage]             = useState("")
    const [owner, setOwner]                       = useState([])

    const [albumTracks, setAlbumTracks]           = useState([])
    const [filterTracks, setFilterTracks]         = useState([])

    const [showMessage , setShowMessage]          = useState(false)
    const [messageText , setMessageText]          = useState("")

    const [isPlaying, setIsPlaying]               = useState(false)
    const [isLiked, setIsLiked]                   = useState(false)
    const [isMyPlaylist, setIsMyPlaylist]         = useState(false)
    const [notFound, setNotFound]                 = useState(false)

    // Methods
    const getAlbumDetail = async () => {
        try {
            const response = await ApiSpotify.getAlbumInfo(albumId)
            const response_tracks = await ApiSpotify.getAlbumTracks(albumId)

            const { data }   = response
            const dataTracks = response_tracks.data.items
            
            setAlbumTitle(data.name)
            setAlbumDescription(data.label)
            setAlbumImage(data.images.length > 0 && data.images[0].url)

            if (dataTracks.length > 0) {
                setOwner({
                    id    : data.artists[0].id,
                    name  : data.artists[0].name,
                    track : dataTracks.length,
                    type  : "artist"
                })

                const tracksWithAudio = dataTracks.filter( track => track.preview_url !== null )

                let index = 0
                let trackList = []
                while (index < tracksWithAudio.length) {
                    let trackItem = tracksWithAudio[index]
                    
                    let newTrack = {
                        track_index   : index,
                        track_id      : trackItem.id,
                        track_name    : trackItem.name,
                        track_duration: trackItem.duration_ms,
                        track_url     : trackItem.preview_url || "",
                        artist_id     : trackItem.artists[0].id,
                        artist_name   : trackItem.artists[0].name,
                        album_id      : albumId,
                        album_name    : albumTitle,
                        album_photo   : data.images[0].url || ""
                    }
                    
                    trackList = [...trackList, newTrack]
                    index++
                }

                setAlbumTracks(trackList)
                setFilterTracks(trackList)
            } else {
                // Turn off Loading
                setTimeout(() => dispatch(setLoading(false)), 1000)
            }
        } catch (err) {
            window.location.href = "/login"
        }

        setTimeout(() => dispatch(setLoading(false)), 1000)
    }

    // When PlayAll on TopDetail component is clicked
        const dispatchTracklist = () => {
            dispatch(setTrackList(albumTracks))
            dispatch(setPlayerCurrentTrack(albumTracks[0]))
            dispatch(setTrackListInfo({id: albumId, type: "album"}))
            dispatch(setPlayerPlaying(true))
        }

        const handlePlayALl = () => {
            if (storeTracklistInfo.type == undefined) {
                dispatchTracklist()
            } else {
                if (storeTracklistInfo.type === "album" && storeTracklistInfo.id === albumId) {
                    dispatch(setPlayerPlaying(false))
                } else {
                    dispatchTracklist()
                }
            }
        }
    // .

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

        setAlbumTracks(trackListFiltered)
    }

    useEffect(() => {
        // this.isLiked()
        getAlbumDetail()

        // Turn on Loading
        return () => {
            dispatch(setLoading(true))
        }
    }, [])

    return (
        <PageContainer>
            {notFound ? (
                <NotFound type="album" />
            ) : (
                <>
                    <TopDetail
                        pretitle    ="Album"
                        title       ={albumTitle}
                        description ={albumDescription}
                        owner       ={owner}
                        image       ={albumImage}
                        isPlaying   ={isPlaying}
                        isLiked     ={isLiked}
                        
                        type        ="album"
                        typeId      ={albumId}
                        
                        playAll     ={() => handlePlayALl()}
                    />

                    <Input type="search" placeholder="Filter" isFilter={true} onKeyUp={(e) => filter(e.target.value)} />

                    <TrackList>
                        {albumTracks.map( (track, index) => (
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

                                tracklist_id   ={albumId}
                                tracklist_type ="album"
                            />
                        ))}
                    </TrackList>

                    {showMessage && <Message text={messageText} />}
                </>
            )}
        </PageContainer>
    )
}

export default Album