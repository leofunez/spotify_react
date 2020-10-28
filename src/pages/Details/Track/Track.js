import React, { useState, useEffect } from "react"

// Api
import ApiSpotify from "../../../config/api"

// Globals Styles
import {
    PageContainer,
    TrackList,
    CardList
} from "../../../components/Globals/Globals.styles"

// Components
import { Track as TrackComp } from "../../../components/Track/Track"
import Card from "../../../components/Card/Card"

// Helpers
import { timeFormatter } from "../../../helpers/timeFormatter"

// Styles
import {
    TopContent,
    Photo,
    Info,
    Pretitle,
    Title,
    Author,
    AuthorLink,
    Albums,
    AlbumsTitle,
    AlbumsAuthor
} from "./Track.styles"

const Track = props => {
    const [trackId]                       = useState(props.match.params.id)
    const [trackName, setTrackName]       = useState("")
    const [trackImage, setTrackImage]     = useState("")
    const [trackTime, setTrackTime]       = useState("")
    const [trackDetail, setTrackDetail]   = useState({})

    const [authorId, setAuthorId]         = useState("")
    const [authorName, setAuthorName]     = useState("")
    const [authorAlbums, setAuthorAlbums] = useState([])

    const [isLoading, setIsLoading]       = useState(true)
    const [isLiked, setIsLiked]           = useState(false)
    const [isPlaying, setIsPlaying]       = useState(false)
    const [notFound, setNotFound]         = useState(false)

    const getTrack = async () => {
        try {
            const response = await ApiSpotify.getTrack(trackId)
            const { data } = response

            setTrackName(data.name)
            setTrackImage(data.album.images[0].url)
            setTrackTime(timeFormatter(data.duration_ms, "long"))
            
            setAuthorId(data.artists[0].id)
            setAuthorName(data.artists[0].name)

            setTrackDetail({
                track_index   : 0,
                track_id      : data.id,
                track_name    : data.name,
                track_duration: data.duration_ms,
                track_url     : data.preview_url || "",
                artist_id     : data.artists[0].id,
                artist_name   : data.artists[0].name,
                album_id      : data.album.id,
                album_name    : data.album.name,
                album_photo   : data.album.images[1].url || ""
            })

            getAlbums(data.artists[0].id)
        } catch(err) {
            // err.response.status === 404 && (setNotFound(true))
            console.log("Error getting track!", err.response)
        }

        setTimeout(() => {
            // this.SET_IS_LOADING(false)
        }, 1500)
    }

    const getAlbums = async author_id =>  {
        try {
            const response = await ApiSpotify.getArtistAlbums(author_id)
            const { items } = response.data

            setAuthorAlbums(items)
        } catch (err) {
            console.log("GetArtistAlbums API Error!", err.response)
        }
    }

    useEffect(() => {
        getTrack()
    }, [])

    return (
        <PageContainer>
            {/* {!notFound && !isLoading && ( */}
                <TopContent>
                    <Photo src={trackImage} />

                    <Info>
                        <Pretitle>Track</Pretitle>
                        <Title>{trackName}</Title>
                        <Author>
                            By <AuthorLink to={`/artist/${authorId}`}>{authorName}</AuthorLink> . {trackTime}
                        </Author>
                    </Info>
                </TopContent>

                <TrackList>
                    <TrackComp
                        key            ={trackDetail.track_id}
                        track_index    ={trackDetail.track_index}
                        track_id       ={trackDetail.track_id}
                        track_name     ={trackDetail.track_name}
                        track_url      ={trackDetail.track_url}
                        track_duration ={trackDetail.track_duration}
                        artist_id      ={trackDetail.artist_id}
                        artist_name    ={trackDetail.artist_name}
                        album_id       ={trackDetail.album_id}
                        album_name     ={trackDetail.album_name}
                        album_photo    ={trackDetail.album_photo}

                        tracklist_id   ={trackDetail.track_id}
                        tracklist_type ="track"
                    />
                </TrackList>

                <Albums>
                    <AlbumsTitle>
                        More by <AlbumsAuthor to={`/artist/${authorId}`}>{authorName}</AlbumsAuthor>
                    </AlbumsTitle>

                    <CardList>
                        {authorAlbums && authorAlbums.map( (album, index) => (
                            <Card
                                key      ={index}
                                id       ={album.id}
                                title    ={album.name}
                                subtitle ={album.total_tracks + ' tracks'}
                                image    ={album.images[0].url}
                                url     ={`/album/${album.id}`}
                            />
                        ))}
                    </CardList>
                </Albums>
            {/* )} */}
        </PageContainer>
    )
}

export default Track