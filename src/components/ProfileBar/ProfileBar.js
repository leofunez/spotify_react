import React, { memo, useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"

// Redux Actions
import fecthUser from "../../redux/actions/userAction"

// Api
import ApiSpotify from "../../config/api"

// Styles
import {
    Container,
    ContainerWrapper,
    Search,
    SearchInput,
    SearchResult,
    SearchResultScroll,
    SearchResultList,
    SearchResultTitle,
    SearchResultItems,
    User,
    UserName,
    Avatar
} from "./ProfileBar.styles"

// Components
import MiniCard from "../MiniCard/MiniCard"

const ProfileBar = memo(() => {
    const dispatch = useDispatch()

    // Redux State
    const user = useSelector( state => state.user.user || {} )

    // Local State
    const [searchQuery     , setSearchQuery]      = useState("")
    const [showSearchResult, setShowSearchResult] = useState(false)
    const [searchTracks    , setSearchTracks]     = useState([])
    const [searchArtists   , setSearchArtists]    = useState([])
    const [searchAlbums    , setSearchAlbums]     = useState([])
    const [searchPlaylists , setSearchPlaylists]  = useState([])

    // Refs
    const searchInputRef = useRef()

    // Methods
    const handleSearch = useCallback(async () => {
        if (searchQuery.length > 2) {
            try {
                const response = await ApiSpotify.search(searchQuery)
                const { data } = response

                setSearchTracks(data.tracks.items)
                setSearchArtists(data.artists.items)
                setSearchAlbums(data.albums.items)
                setSearchPlaylists(data.playlists.items)

                setShowSearchResult(true)
            } catch(err) {
                let { status } = err.response
            
                if(status === 401) {
                    window.location.href = "/login"
                } else {
                    console.log("Error searching on Spotify!")
                }
            }
        } else {
            resetSearch()
        }
    }, [searchQuery])

    const resetSearch = () => {
        setSearchTracks([])
        setSearchArtists([])
        setSearchAlbums([])
        setSearchPlaylists([])

        setShowSearchResult(false)
        setSearchQuery("")
    }

    const handleMiniCardClick = () => {
        resetSearch()
        searchInputRef.current.value = ""
    }

    useEffect(() => {
        dispatch(fecthUser())
    }, [])

    return (
        <Container>
            <ContainerWrapper>
                <Search>
                    <SearchInput
                        type       ="search" 
                        placeholder="Search..."
                        ref        ={searchInputRef}
                        onChange   ={() => handleSearch()}
                        onKeyUp    ={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Search Result */}
                        <SearchResult isActive={showSearchResult} onMouseLeave={() => setShowSearchResult(false)}>
                            <SearchResultScroll>
                                {/* Tracks */}
                                    <SearchResultList>
                                        <SearchResultTitle>Tracks</SearchResultTitle>
                                        <SearchResultItems>
                                            {searchTracks.map( (track, index) => (
                                                <MiniCard
                                                    key       ={`${track.id}-${index}`}
                                                    id        ={track.id}
                                                    name      ={track.name}
                                                    avatar    ={track.album.images[2] && track.album.images[2].url}
                                                    type      ="track"
                                                    size      ="small"
                                                    padding   ="5px 10px"
                                                    clickThis ={() => handleMiniCardClick()}
                                                />
                                            ))}
                                        </SearchResultItems>
                                    </SearchResultList>
                                {/* .Tracks */}
                                
                                {/* Artists */}
                                    <SearchResultList>
                                        <SearchResultTitle>Artists</SearchResultTitle>
                                        <SearchResultItems>
                                            {searchArtists.map( (artist, index) => (
                                                <MiniCard
                                                    key       ={`${artist.id}-${index}`}
                                                    id        ={artist.id}
                                                    name      ={artist.name}
                                                    avatar    ={artist.images[0] && artist.images[0].url}
                                                    type      ="artist"
                                                    size      ="small"
                                                    padding   ="5px 10px"
                                                    clickThis ={() => handleMiniCardClick()}
                                                />
                                            ))}
                                        </SearchResultItems>
                                    </SearchResultList>
                                {/* .Artists */}
                                
                                {/* Albums */}
                                    <SearchResultList>
                                        <SearchResultTitle>Albums</SearchResultTitle>
                                        <SearchResultItems>
                                            {searchAlbums.map( (album, index) => (
                                                <MiniCard
                                                    key       ={`${album.id}-${index}`}
                                                    id        ={album.id}
                                                    name      ={album.name}
                                                    avatar    ={album.images[2] && album.images[2].url}
                                                    type      ="album"
                                                    size      ="small"
                                                    padding   ="5px 10px"
                                                    clickThis ={() => handleMiniCardClick()}
                                                />
                                            ))}
                                        </SearchResultItems>
                                    </SearchResultList>
                                {/* .Albums */}
                                
                                {/* Playlists */}
                                    <SearchResultList>
                                        <SearchResultTitle>Playlists</SearchResultTitle>
                                        <SearchResultItems>
                                            {searchPlaylists.map( (playlist, index) => (
                                                <MiniCard
                                                    key       ={`${playlist.id}-${index}`}
                                                    id        ={playlist.id}
                                                    name      ={playlist.name}
                                                    avatar    ={playlist.images[0] && playlist.images[0].url}
                                                    size      ="small"
                                                    type      ="playlist"
                                                    padding   ="5px 10px"
                                                    clickThis ={() => handleMiniCardClick()}
                                                />
                                            ))}
                                        </SearchResultItems>
                                    </SearchResultList>
                                {/* .Playlists */}
                            </SearchResultScroll>
                        </SearchResult>
                    {/* .Search Result */}
                </Search>

                <User to={`/user/${user.id}`}>
                    <UserName>{user.display_name}</UserName>
                    <Avatar
                        src={user.images && user.images[0].url} 
                        isEmpty={user.images && user.images.length === 0}
                    />
                </User>
            </ContainerWrapper>
        </Container>
    )
})

export default ProfileBar