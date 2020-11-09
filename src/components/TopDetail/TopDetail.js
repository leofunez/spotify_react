import React, { memo, useState, useEffect } from "react"

// Redux Hooks
import { useDispatch, useSelector } from "react-redux"

// Redux Actions
import { setPlayerPlaying } from "../../redux/actions/playerActions"

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
    owner     = {},
    noButtons = false,
    showLike  = true,
    type      = "",
    typeId    = ""
}, props) => {
    const dispatch = useDispatch()

    // Redux State
    const { is_playing: storePlayerIsPlaying } = useSelector( state => state.player)

    // Local State
    const [isLiked, setIsLiked] = useState(false)

    // Methods
    const playAll = () => {
        dispatch(setPlayerPlaying(!storePlayerIsPlaying))
    }

    const isAlreadyLiked = () => {
        if (type === "artist") {
            let JSONStorageArtists = JSON.parse(localStorage.getItem("spotifyReactArtists"))
            JSONStorageArtists.includes(typeId) && setIsLiked(true)
        }
    }

    const likeThis = () => {
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

        } else if (type === "playlist") {

        }
        
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        isAlreadyLiked()
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
                            isPlaying={storePlayerIsPlaying}
                            onClick={() => playAll()}
                        >{storePlayerIsPlaying ? "Pause" : "Play"}</ButtonPlay>
                        
                        {showLike && (
                            <ButtonLike isActive={isLiked} onClick={() => likeThis()}></ButtonLike>
                        )}
                    </Buttons>
                )}
            </Info>
            
            <Bg>
                <BgImage src={props.image} />
            </Bg>
        </Container>
    )
})

export default TopDetail