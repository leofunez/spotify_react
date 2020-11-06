import React, { useState, useEffect } from "react"

// Redux Hooks
import { useDispatch } from "react-redux"

// Redux Actions
import { setLoading } from "../../../redux/actions/loadingAction"

// Api
import ApiSpotify from "../../../config/api"

// Global Styles
import {
    PageContainer,
    Input,
    TrackList
} from "../../../components/Globals/Globals.styles"

// Components
import { TopDetail } from "../../../components/TopDetail/TopDetail"
import { Track } from "../../../components/Track/Track"

const Album = props => {
    const dispatch = useDispatch()

    // Local State
    const [albumId]                               = useState(props.match.params.id)
    const [albumTitle, setAlbumTitle]             = useState("")
    const [albumDescription, setAlbumDescription] = useState("")
    const [albumImage, setAlbumImage]             = useState("")
    const [owner, setOwner]                       = useState([])

    const [albumTracks, setAlbumTracks]           = useState([])
    const [filterTracks, setFilterTracks]         = useState([])

    const [isLoading, setIsLoading]               = useState(true)
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

                // this.fillTrackList()
            } else {
                // Turn off Loading
                setTimeout(() => dispatch(setLoading(false)), 1000)
            }
        } catch (err) {
            // err.response.status === 401 && (window.location.href = "/login")
            // err.response.status === 400 && (this.not_found = true)
            console.log("AlbumDetail API Error!", err.response)
        }

        setTimeout(() => dispatch(setLoading(false)), 1000)
    }

    useEffect(() => {
        // this.isLiked()
        getAlbumDetail()

        // Turn on Loading
        return () => {
            dispatch(setLoading(true))
        }

        // this.SET_PLAYING && this.SET_CURRENT_TRACKLIST === this.playlist_id && (this.is_playing = true)
    }, [])

    return (
        <PageContainer>
            {/* {!notFound && !isLoading && ( */}
                <>
                    <TopDetail
                        pretitle    ="Album"
                        title       ={albumTitle}
                        description ={albumDescription}
                        owner       ={owner}
                        image       ={albumImage}
                        isPlaying   ={isPlaying}
                        isLiked     ={isLiked}
                    />

                    <Input type="search" placeholder="Filter" isFilter={true} />

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
                </>
            {/* )} */}
        </PageContainer>
    )
}

export default Album