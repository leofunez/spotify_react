import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"

// Global Styles
import {
    PageContainer,
    Input,
    TrackList
} from "../../../components/Globals/Globals.styles"

// Components
import { TopDetail } from "../../../components/TopDetail/TopDetail"
import { Track } from "../../../components/Track/Track"
import { Message } from "../../../components/Message/Message"

const MyTracks = () => {
    // Redux State
    const { fav_tracks: storeFavTracks } = useSelector( state => state.favorites )

    // Local State
    const [tracks, setTracks] = useState([])
    const [filTerTracks, setFilterTracks] = useState([])
    const [showMessage, setShowMessage] = useState(false)
    const [messageText, setMessageText] = useState("")

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
                    track_id      : track.id,
                    track_name    : track.name,
                    track_duration: track.duration_ms,
                    track_url     : track.preview_url,
                    artist_id     : track.artists[0].id,
                    artist_name   : track.artists[0].name,
                    album_id      : track.album.id,
                    album_name    : track.album.name,
                    album_photo   : track.album.images[1].url || ""
                }

                trackList = [...trackList, newTrack]
                index++
            }

            setTracks(trackList)
            setFilterTracks(trackList)
        }
    }

    const filter = (filterString) => {
        let trackListFiltered = filTerTracks.filter( track => {
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

        setTracks([])
        setTracks(trackListFiltered)
    }

    useEffect(() => {
        getFavTracks()
    }, [storeFavTracks])

    return (
        <PageContainer>
            <TopDetail
                pretitle    ="Library"
                title       ="Favorite tracks"
                description =""
                no_buttons  ={true}
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