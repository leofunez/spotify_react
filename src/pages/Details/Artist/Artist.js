import React, { useState, useEffect } from "react"

// Api
import ApiSpotify from "../../../config/api"

// Helpers
import { numFormatter } from "../../../helpers/numFormatter"

// Global Styles
import {
    PageContainer,
    BlockTitle,
    TrackList,
    ProfileList
} from "../../../components/Globals/Globals.styles"

// Styles
import {
    TopContent,
    TopPopular,
    TopRelated,
    AlbumList
} from "./Artist.styles"

// Components
import { TopDetail } from "../../../components/TopDetail/TopDetail"
import { Track } from "../../../components/Track/Track"

const Artist = props => {
    const [artistId]                    = useState(props.match.params.id)
    const [artistName, setArtistName]   = useState("")
    const [artistDesc, setArtistDesc]   = useState("")
    const [artistImage, setArtistImage] = useState("")

    const [populars, setPopulars]       = useState([])
    const [albums, setAlbums]           = useState([])
    const [related, setRelated]         = useState([])

    const [isLoading, setIsLoading]     = useState(true)
    const [isLiked, setIsLike]          = useState(false)
    const [isPlaying, setIsPlaying]     = useState(false)
    const [notFound, setNotFound]       = useState(false)

    const getArtistInfo = async () => {
        try {
            const response = await ApiSpotify.getArtistInfo(artistId)
            const { data } = response
            
            setArtistName(data.name)
            setArtistDesc(numFormatter(parseInt(data.followers.total)))
            setArtistImage(data.images[0] && data.images[0].url)
        } catch (err) {
            // err.response.status === 401 && (window.location.href = "/login")
            // err.response.status === 400 && (this.not_found = true)
            console.log("GetArtist API Error!", err.response)
        }

        // this.SET_IS_LOADING(false)
    }

    useEffect(() => {
        getArtistInfo()
    }, [props])

    return (
        <PageContainer>
            {/* {!notFound && !isLoading && ( */}
                <TopDetail
                    pretitle    ="Artist"
                    title       ={artistName}
                    description ={`${artistDesc} followers`}
                    image       ={artistImage}
                    is_playing  ={isPlaying}
                    is_liked    ={isLiked}
                />

                <TopContent isFullWidth={false}>
                    <TopPopular>
                        <BlockTitle>Popular Tracks</BlockTitle>
                        <TrackList>Tracks</TrackList>
                    </TopPopular>

                    <TopRelated>
                        <BlockTitle>Fans Also Like</BlockTitle>

                        <ProfileList>Items</ProfileList>
                    </TopRelated>
                </TopContent>

                <AlbumList>
                    <BlockTitle>Albums</BlockTitle>
                </AlbumList>
            {/* )} */}
        </PageContainer>
    )
}

export default Artist