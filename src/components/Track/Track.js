import React, { useState, useEffect} from "react"

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
    const [trackName, setTrackName]         = useState("")
    const [trackArtistId, setTrackArtistId] = useState("")
    const [trackArtist, setTrackArtist]     = useState("")
    const [trackAlbumId, setTrackAlbumId]   = useState("")
    const [trackDuration, setTrackDuration] = useState("")
    const [trackListType, setTrackListType] = useState("")

    const [isPlaying, setIsPlaying]         = useState(false)
    const [isLiked, setIsLiked]             = useState(false)
    const [isCurrent, setIsCurrent]         = useState(false)
    const [myPlaylists, setMyPlaylists]     = useState([])
    const [openMenu, setOpenMenu]           = useState(false)

    const getTrackTime = (duration) => {
        let minutes = Math.floor(duration / 60000)
        let seconds = ((duration % 60000) / 1000).toFixed(0)
        
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
    }

    const openCloseMenu = (state) => {
        setOpenMenu(state)
    }

    useEffect(() => {
        setTrackName(props.track_name)
        setTrackArtistId(props.artist_id)
        setTrackArtist(props.artist_name)
        setTrackAlbumId(props.album_id)
        setTrackDuration(getTrackTime(props.track_duration))
        setTrackListType(props.tracklist_type)
    }, [props])

    return (
        <Container>
            {!isPlaying ? (
                <Play />
            ) : (
                <Pause />
            )}

            {/* More Menu */}
                <More onClick={() => openCloseMenu(!openMenu)} onMouseLeave={() => openCloseMenu(false)}>
                    <MoreList isOpen={openMenu}>
                        <MoreLinkItem to={`/artist/${trackArtistId}`}>Go to Artist</MoreLinkItem>
                        
                        {trackListType !== "album" && (
                            <MoreLinkItem to={`/album/${trackAlbumId}`}>Go to Album</MoreLinkItem>
                        )}
                        
                        <MoreListItem>
                            Add to Playlist
                            
                            <MoreList>
                                <MoreLinkItem to="">
                                    <MoreText>Item 1</MoreText>
                                </MoreLinkItem>
                            </MoreList>
                        </MoreListItem>

                        <MoreListItem>Remove from this Playlist</MoreListItem>
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