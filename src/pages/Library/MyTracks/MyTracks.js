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

const MyTracks = () => {
    const dispatch = useDispatch()

    // Redux State
    const { fav_tracks    : storeFavTracks }     = useSelector( state => state.favorites )
    const { loading       : storeLoading }       = useSelector( state => state.loading )
    const { is_playing    : storeIsPlaying,
            tracklist_info: storeTracklistInfo } = useSelector( state => state.player )

    // Local State
    const [tracks      , setTracks]       = useState([])
    const [description , setDescription]  = useState("")
    const [filterTracks, setFilterTracks] = useState([])
    const [showMessage , setShowMessage]  = useState(false)
    const [messageText , setMessageText]  = useState("")

    // Methods
    const getFavTracks = () => {
        if (storeFavTracks.length > 0) {
            const tracksWithAudio = storeFavTracks.filter( track => track.track.preview_url !== null )
            
            let index = 0
            let trackList = []

            while (index < tracksWithAudio.length) {
                let { track } = tracksWithAudio[index]

                const newTrack = {
                    track_index   : index,
                    track_id      : track?.id,
                    track_name    : track?.name,
                    track_duration: track?.duration_ms,
                    track_url     : track?.preview_url,
                    artist_id     : track?.artists[0]?.id,
                    artist_name   : track?.artists[0]?.name,
                    album_id      : track?.album?.id,
                    album_name    : track?.album?.name,
                    album_photo   : track?.album?.images[1]?.url || ""
                }

                trackList = [...trackList, newTrack]
                index++
            }

            setDescription(`${trackList.length} ${trackList.length === 1 ? `track` : `tracks`}`)
            setTracks(trackList)
            setFilterTracks(trackList)
        } else {
            if (!storeLoading) {
                setShowMessage(true)
                setMessageText("You have no favorite tracks :(")
            }
        }

        // Turn off Loading
        setTimeout(() => dispatch(setLoading(false)), 1000)
    }

    const dispatchTracklist = () => {
        dispatch(setTrackList(tracks))
        dispatch(setPlayerCurrentTrack(tracks[0]))
        dispatch(setTrackListInfo({id: "", type: "saved_tracks"}))
        dispatch(setPlayerPlaying(true))
    }

    const handlePlayALl = () => {
        if (storeTracklistInfo.type == undefined) {
            dispatchTracklist()
        } else {
            if (storeTracklistInfo.type === "saved_tracks") {
                dispatch(setPlayerPlaying(false))
            } else {
                dispatch(setPlayerPlaying(true))
                dispatchTracklist()
            }
        }
    }

    const filter = (filterString) => {
        let trackListFiltered = filterTracks.filter( track => {
            const trackName = track.track_name.toLowerCase()
            const trackArtistName = track.artist_name.toLowerCase()
            return trackName.includes(filterString.toLowerCase()) || trackArtistName.includes(filterString.toLowerCase())
        })

        if (trackListFiltered.length === 0) {
            setShowMessage(true)
            setMessageText(["There is no track with ", <i key={false}>{filterString}</i>, " name"])
        } else {
            setShowMessage(false)
            setMessageText("")
        }

        setTracks(trackListFiltered)
    }

    useEffect(() => {
        getFavTracks()

        // Turn on Loading
        return () => {
            //dispatch(setLoading(true))
        }
    }, [storeFavTracks])

    return (
        <PageContainer>
            <TopDetail
                pretitle    ="Library"
                title       ="Favorite tracks"
                description ={description}
                showLike    ={false}
                noButtons   ={!tracks?.length}
                type        ="saved_tracks"
                playAll     ={() => handlePlayALl()}
            />

            <Input type="search" placeholder="Filter" isFilter={true} onKeyUp={(e) => filter(e.target.value)} />

            <TrackList>
                {tracks?.map( (track, index) => (
                    <Track
                        key            ={`${track?.track_id}-${index}`}
                        track_index    ={track?.track_index}
                        track_id       ={track?.track_id}
                        track_name     ={track?.track_name}
                        track_url      ={track?.track_url}
                        track_duration ={track?.track_duration}
                        artist_id      ={track?.artist_id}
                        artist_name    ={track?.artist_name}
                        album_id       ={track?.album_id}
                        album_name     ={track?.album_name}
                        album_photo    ={track?.album_photo}
                        
                        tracklist_id   =""
                        tracklist_type ="saved_tracks"
                    />
                ))}
            </TrackList>
            
            {showMessage && <Message text={messageText} />}
        </PageContainer>
    )
}

export default MyTracks