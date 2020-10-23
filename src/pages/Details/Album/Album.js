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
import { TopDetail } from "../../../components/TopDetail/TopDetail"
import { Track } from "../../../components/Track/Track"

const Album = props => {
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

    const getAlbumDetail = async () => {
        try {
            const response = await ApiSpotify.getAlbumInfo(albumId)
            const response_tracks = await ApiSpotify.getAlbumTracks(albumId)

            const { data }    = response
            const data_tracks = response_tracks.data.items
            
            setAlbumTitle(data.name)
            setAlbumDescription(data.label)
            setAlbumImage(data.images.length > 0 && data.images[0].url)

            if (data_tracks.length > 0) {
                setOwner({
                    id    : data.artists[0].id,
                    name  : data.artists[0].name,
                    track : data_tracks.length,
                    type  : "artist"
                })

                // const tracks_with_audio = data_tracks.filter( track => track.preview_url !== null )

                const trackList = data_tracks.map( (track, index) => {
                    if (track.id && track.name && track.preview_url && track.artists[0].name) {
                        const new_track = {
                            track_index   : index,
                            track_id      : track.id,
                            track_name    : track.name,
                            track_duration: track.duration_ms,
                            track_url     : track.preview_url || "",
                            artist_id     : track.artists[0].id,
                            artist_name   : track.artists[0].name,
                            album_id      : albumId,
                            album_name    : albumTitle,
                            album_photo   : data.images[1].url || ""
                        }

                        return new_track
                    }
                })

                setAlbumTracks(trackList)
                setFilterTracks(trackList)

                // this.fillTrackList()
            } else {
                // this.SET_IS_LOADING(false)
            }
        } catch (err) {
            // err.response.status === 401 && (window.location.href = "/login")
            // err.response.status === 400 && (this.not_found = true)
            console.log("AlbumDetail API Error!", err.response)
        }

        // this.SET_IS_LOADING(false)
    }

    useEffect(() => {
        // this.SET_IS_LOADING(true)
        // this.isLiked()
        getAlbumDetail()

        // this.SET_PLAYING && this.SET_CURRENT_TRACKLIST === this.playlist_id && (this.is_playing = true)
    }, [])

    return (
        <PageContainer>
            {/* {!notFound && !isLoading && ( */}
                <>
                    <TopDetail
                        pretitle    ="Playlist"
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