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
    no_buttons
}, props) => {
    const dispatch = useDispatch()

    // Redux Store
    const { is_playing: storePlayerIsPlaying } = useSelector( state => state.player)

    //State
    const [owner   , setOwner]    = useState({})
    const [showLike, setShowLike] = useState(true)

    const playAll = () => {
        dispatch(setPlayerPlaying(!storePlayerIsPlaying))
    }

    useEffect(() => {
        setOwner(props.owner)
        setShowLike(props.showLike)
    }, [props])

    return (
        <Container noButtons={no_buttons}>
            <Info>
                <Pretitle>{pretitle}</Pretitle>
                <Title>{title}</Title>
                <Description dangerouslySetInnerHTML={{__html: description}} />
                
                {owner && owner.tracks && (
                    <Owner>
                        <OwnerText>{owner.type === 'user' ? 'Created by ' : 'By '}</OwnerText>
                        <OwnerLink to={`/${owner.type}/${owner.id}`}>{owner.name}</OwnerLink>
                        <OwnerText>{` . ${owner.tracks} tracks`}</OwnerText>
                    </Owner>
                )}

                {!no_buttons && (
                    <Buttons>
                        <ButtonPlay
                            isRounded={true}
                            isPlaying={storePlayerIsPlaying}
                            onClick={() => playAll()}
                        >{storePlayerIsPlaying ? "Pause" : "Play"}</ButtonPlay>
                        
                        {showLike && (
                            <ButtonLike isActive={true}></ButtonLike>
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