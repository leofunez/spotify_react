import React, { useState, useEffect} from "react"

// Styles
import {
    Container,
    Play,
    Pause,
    More,
    MoreList,
    MoreListItem,
    MoreText,
    Name,
    Artist,
    Like,
    Duration
} from "./Track.styles"

export const Track = props => {
    const [trackName, setTrackName]         = useState("")
    const [trackArtistId, setTrackArtistId] = useState("")
    const [trackArtist, setTrackArtist]     = useState("")
    const [trackDuration, setTrackDuration] = useState("")

    const getTrackTime = (duration) => {
        let minutes = Math.floor(duration / 60000)
        let seconds = ((duration % 60000) / 1000).toFixed(0)
        
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }

    useEffect(() => {
        setTrackName(props.track_name)
        setTrackArtistId(props.artist_id)
        setTrackArtist(props.artist_name)
        setTrackDuration(getTrackTime(props.track_duration))
    }, [])

    return (
        <Container>
            <Play />
            {/* <Pause /> */}

            {/* More Menu */}
                <More>
                    <MoreList>
                        <MoreListItem>Go to Artist</MoreListItem>
                        <MoreListItem>Go to Album</MoreListItem>
                        
                        <MoreListItem>
                            Add to Playlist
                            
                            <MoreList>
                                <MoreListItem>
                                    <MoreText>Item 1</MoreText>
                                </MoreListItem>
                            </MoreList>
                        </MoreListItem>

                        <MoreListItem>Remove from this Playlist</MoreListItem>
                    </MoreList>
                </More>
            {/* .More Menu */}

            <Name>{trackName}</Name>

            <Artist to={`/artist/${trackArtistId}`}>{trackArtist}</Artist>

            <Like></Like>

            <Duration>{trackDuration}</Duration>
        </Container>
    )
}