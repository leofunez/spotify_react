import React, { memo, useState, useEffect, useCallback } from "react"

// Redux Hooks
import { useDispatch, useSelector } from "react-redux"

// Api
import ApiSpotify from "../../config/api"

// Styles
import {
    Container,
    Bg,
    BgImage,
    Info,
    Pretitle,
    Title,
    Description,
    Owner,
    OwnerText,
    OwnerLink,
    Buttons,
    ButtonPlay
} from "./TopDetail.styles"

// Global Styles
import {
    ButtonLike
} from "../Globals/Globals.styles"

const TopDetail = memo(({
    pretitle,
    title,
    description,
    image,
    owner     = {},
    noButtons = false,
    showLike  = true,
    type      = "",
    typeId    = "",
    playAll
}, props) => {
    const dispatch = useDispatch()

    // Redux State
    const { 
        is_playing    : storeIsPlaying,
        tracklist_info: storeTracklistInfo
    } = useSelector( state => state.player )

    // Local State
    const [isLiked      , setIsLiked]       = useState(false)
    const [isThisPlaying, setIsThisPlaying] = useState(false)

    // Methods
    const handlePlayAll = () => {
        setIsThisPlaying(true)
        
        // Function on parent: Playlist/Album/Artist or Favorite Tracks page
        playAll && playAll()
    }

    const isAlreadyLiked = async () => {
        if (type === "artist") {
            let JSONStorageArtists = JSON.parse(localStorage.getItem("spotifyReactArtists"))
            JSONStorageArtists.includes(typeId) && setIsLiked(true)
        } else if (type === "album") {
            try {
                const response  = await ApiSpotify.getSavedAlbums()
                const { items } = response.data

                let index = 0
                while (index < items.length) {
                    let { album } = items[index]
                    index++
                    
                    (album.id === typeId) && setIsLiked(true)
                }
            } catch (err) {
                console.log("Error getting SavedAlbums!", err.response)
            }
        } else if(type === "playlist") {
            let JSONStoragePlaylists = JSON.parse(localStorage.getItem("spotifyReactPlaylists"))
            JSONStoragePlaylists.includes(typeId) && setIsLiked(true)
        }
    }

    const isPlaying = useCallback(() => {
        if (storeIsPlaying) {
            if (storeTracklistInfo.type === type && storeTracklistInfo.id === typeId) {
                setIsThisPlaying(true)
            }
        }
    }, [isThisPlaying])

    const likeThis = useCallback(async () => {
        if (type === "artist") {
            let JSONStorageArtists = JSON.parse(localStorage.getItem("spotifyReactArtists"))
            localStorage.removeItem("spotifyReactArtists")

            if (JSONStorageArtists.includes(typeId)) {
                let indexItem = JSONStorageArtists.indexOf(typeId)
                JSONStorageArtists.splice(indexItem, 1)
                setIsLiked(false)
            } else {
                JSONStorageArtists = [...JSONStorageArtists, typeId]
                setIsLiked(true)
            }

            localStorage.setItem("spotifyReactArtists", JSON.stringify(JSONStorageArtists))
        } else if (type === "album") {
            (isLiked) ? await ApiSpotify.deleteSavedAlbums(typeId) : await ApiSpotify.putSavedAlbums(typeId)
            setIsLiked(!isLiked)
        } else if (type === "playlist") {
            let JSONStoragePlaylists = JSON.parse(localStorage.getItem("spotifyReactPlaylists"))
            localStorage.removeItem("spotifyReactPlaylists")

            if (JSONStoragePlaylists.includes(typeId)) {
                let indexItem = JSONStoragePlaylists.indexOf(typeId)
                JSONStoragePlaylists.splice(indexItem, 1)
                setIsLiked(false)
            } else {
                JSONStoragePlaylists = [...JSONStoragePlaylists, typeId]
                setIsLiked(true)
            }

            localStorage.setItem("spotifyReactPlaylists", JSON.stringify(JSONStoragePlaylists))
        }
        
        setIsLiked(!isLiked)
    }, [isLiked])

    useEffect(() => {
        isAlreadyLiked()
        isPlaying()
    }, [props])

    return (
        <Container noButtons={noButtons}>
            <Info>
                <Pretitle>{pretitle}</Pretitle>
                <Title>{title}</Title>
                <Description dangerouslySetInnerHTML={{__html: description}} />
                
                <Owner>
                    {owner.name && (
                        <>
                            <OwnerText>{owner.type === 'user' ? 'Created by ' : 'By '}</OwnerText>
                            <OwnerLink to={`/${owner.type}/${owner.id}`}>{owner.name}</OwnerLink>
                        </>
                    )}
                    {owner.tracks && <OwnerText>{` . ${owner.tracks} tracks`}</OwnerText>}
                </Owner>

                {!noButtons && (
                    <Buttons>
                        <ButtonPlay
                            isRounded={true}
                            isPlaying={isThisPlaying}
                            onClick={() => handlePlayAll()}
                        >{isThisPlaying ? "Pause" : "Play"}</ButtonPlay>
                        
                        {showLike && (
                            <ButtonLike isActive={isLiked} onClick={() => likeThis()}></ButtonLike>
                        )}
                    </Buttons>
                )}
            </Info>
            
            <Bg>
                <BgImage src={image} />
            </Bg>
        </Container>
    )
})

export default TopDetail