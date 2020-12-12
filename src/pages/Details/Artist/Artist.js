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

// Helpers
import { numFormatter }  from "../../../helpers/numFormatter"
import { dateFormatter } from "../../../helpers/dateFormatter"

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
    AlbumList,
    Album,
    AlbumTop,
    AlbumPhoto,
    AlbumDate,
    AlbumTitle,
    AlbumTracks
} from "./Artist.styles"

// Components
import TopDetail from "../../../components/TopDetail/TopDetail"
import Track     from "../../../components/Track/Track"
import MiniCard  from "../../../components/MiniCard/MiniCard"
import NotFound  from "../../../components/NotFound/NotFound"

const Artist = props => {
    const dispatch = useDispatch()

    // Redux State
    const { is_playing    : storeIsPlaying,
            tracklist_info: storeTracklistInfo } = useSelector( state => state.player )

    // Local State
    const [artistId, setArtistId]         = useState(props.match.params.id)
    const [artistName, setArtistName]     = useState("")
    const [artistDesc, setArtistDesc]     = useState("")
    const [artistImage, setArtistImage]   = useState("")

    const [populars, setPopulars]         = useState([])
    const [artistAlbums, setArtistAlbums] = useState([])
    const [related, setRelated]           = useState([])

    const [isLoading, setIsLoading]       = useState(true)
    const [isLiked, setIsLike]            = useState(false)
    const [isPlaying, setIsPlaying]       = useState(false)
    const [notFound, setNotFound]         = useState(false)

    // Methods
    const getArtistInfo = async () => {
        try {
            const response = await ApiSpotify.getArtistInfo(artistId)
            const { data } = response
            
            setArtistName(data.name)
            setArtistDesc(numFormatter(parseInt(data.followers.total)))
            setArtistImage(data.images[0] && data.images[0].url)
        } catch (err) {
            window.location.href = "/login"
        }
    }

    const getTopTracks = async () => {
        try {
            const response   = await ApiSpotify.getArtistTopTracks(artistId)
            const { tracks } = response.data
            
            const tracksWithAudio = tracks.filter( track => track.preview_url !== null )
            
            const trackList = tracksWithAudio.map( (track, index) => {
                if (track.id && track.name && track.preview_url && track.artists[0].name) {
                    const newTrack = {
                        track_index   : index,
                        track_id      : track.id,
                        track_name    : track.name,
                        track_duration: track.duration_ms,
                        track_url     : track.preview_url || "",
                        artist_id     : track.artists[0].id,
                        artist_name   : track.artists[0].name,
                        album_id      : track.album.id,
                        album_name    : track.album.name,
                        album_photo   : track.album.images[1].url || ""
                    }

                    return newTrack
                }
            })

            setPopulars(trackList)
        } catch (err) {
            window.location.href = "/login"
        }
    }

    const getRelatedArtists = async () => {
        try {
            const response    = await ApiSpotify.getArtistRelated(artistId)
            const { artists } = response.data
            const lastArtist  = artists.filter((artist, index) => index < 9)
            
            setRelated(lastArtist)
        } catch (err) {
            window.location.href = "/login"
        }
    }

    const getAlbums = async () => {
        try {
            const response = await ApiSpotify.getArtistAlbums(artistId)
            const albums   = response.data.items
            let albumList  = []
            
            albums.forEach( async album => {
                const response  = await ApiSpotify.getAlbumTracks(album.id)
                const { items } = response.data

                const tracksWithAudio = items.filter( track => track.preview_url !== undefined || track.preview_url !== null  )

                const trackList = await tracksWithAudio.map( (track, index) => {
                    const newTrack = {
                        track_index   : index,
                        track_id      : track.id,
                        track_name    : track.name,
                        track_duration: track.duration_ms,
                        track_url     : track.preview_url || "",
                        artist_id     : track.artists[0].id,
                        artist_name   : track.artists[0].name,
                        album_id      : album.id,
                        album_name    : album.name,
                        album_photo   : album.images[1].url || ""
                    }

                    return newTrack
                })

                const newAlbum = {
                    id          : album.id,
                    name        : album.name,
                    image       : album.images[1].url,
                    date        : dateFormatter(album.release_date),
                    tracks      : trackList,
                    total_tracks: album.total_tracks
                }

                albumList = [...albumList, newAlbum]
            })

            setTimeout(() => setArtistAlbums(albumList), 500)

            setTimeout(() => dispatch(setLoading(false)), 1000)
        } catch (err) {
            window.location.href = "/login"
        }

        setTimeout(() => dispatch(setLoading(false)), 1000)
    }

    // When PlayAll on TopDetail component is clicked
        const dispatchTracklist = () => {
            dispatch(setTrackList(populars))
            dispatch(setPlayerCurrentTrack(populars[0]))
            dispatch(setTrackListInfo({id: artistId, type: "artist"}))
            dispatch(setPlayerPlaying(true))
        }

        const handlePlayALl = () => {
            if (storeTracklistInfo.type == undefined) {
                dispatchTracklist()
            } else {
                if (storeTracklistInfo.type === "artist" && storeTracklistInfo.id === artistId) {
                    dispatch(setPlayerPlaying(false))
                } else {
                    dispatchTracklist()
                }
            }
        }
    // .

    useEffect(() => {
        setArtistId(props.match.params.id)
        getArtistInfo()
        getTopTracks()
        getRelatedArtists()
        getAlbums()

        // Turn on Loading
        return () => {
            dispatch(setLoading(true))
        }
    }, [props, artistId])

    return (
        <PageContainer>
            {notFound ? (
                <NotFound type="artist" />
            ) : (
                <>
                    <TopDetail
                        pretitle    ="Artist"
                        title       ={artistName}
                        description ={`${artistDesc} followers`}
                        image       ={artistImage}
                        isPlaying   ={isPlaying}
                        isLiked     ={isLiked}
                        showLike    ={true}
                        
                        type        ="artist"
                        typeId      ={artistId}
                        
                        playAll     ={() => handlePlayALl()}
                    />

                    <TopContent isFullWidth={related.length === 0}>
                        <TopPopular>
                            <BlockTitle>Popular Tracks</BlockTitle>
                            <TrackList>
                                {populars?.map( (track, index) => (
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
                                        
                                        tracklist_id   ={artistId}
                                        tracklist_type ="artist"
                                    />
                                ))}
                            </TrackList>
                        </TopPopular>
                        
                        {related?.length && (
                            <TopRelated>
                                <BlockTitle>Fans Also Like</BlockTitle>

                                <ProfileList>
                                    {related.map( (artist, index) => (
                                        <MiniCard
                                            key    ={`${artist.id}-${index}`}
                                            id     ={artist.id}
                                            name   ={artist.name}
                                            avatar ={artist.images[2].url}
                                            type   ="artist"
                                        />
                                    ))}
                                </ProfileList>
                            </TopRelated>
                        )}
                    </TopContent>
                    
                    {/* Albums */}
                        {artistAlbums.length > 0 && (
                            <AlbumList>
                                <BlockTitle>Albums</BlockTitle>

                                {artistAlbums?.map( (item, index) => (
                                    <Album key={`${item?.id}-${index}`}>
                                        <AlbumTop>
                                            <AlbumPhoto
                                                to={`/album/${item?.id}`}
                                                src={item?.image}
                                            />
                                            <AlbumDate>{item?.date}</AlbumDate>
                                            <AlbumTitle to={`/album/${item?.id}`}>{item?.name}</AlbumTitle>
                                        </AlbumTop>

                                        {/* Tracks */}
                                            <AlbumTracks>
                                                <TrackList>
                                                    {item?.tracks?.map( (track, index) => (
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
                                                            
                                                            tracklist_id   ={track?.album_id}
                                                            tracklist_type ="album"
                                                        />
                                                    ))}
                                                </TrackList>
                                            </AlbumTracks>
                                        {/* .Tracks */}
                                    </Album>
                                ))}
                            </AlbumList>
                        )}
                    {/* .Albums */}
                </>
            )}
        </PageContainer>
    )
}

export default Artist