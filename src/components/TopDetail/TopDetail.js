import React, { useState, useEffect } from "react"

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

export const TopDetail = props => {
    const [pretitle, setPretitle] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [owner, setOwner] = useState({})
    const [showLike, setShowLike] = useState(true)

    useEffect(() => {
        setPretitle(props.pretitle)
        setTitle(props.title)
        setDescription(props.description)
        setOwner(props.owner)
        setShowLike(props.showLike)
    }, [props])

    return (
        <Container noButtons={props.noButtons}>
            <Info>
                <Pretitle>{pretitle}</Pretitle>
                <Title>{title}</Title>
                <Description>{description}</Description>
                
                {owner && owner.tracks && (
                    <Owner>
                        <OwnerText>{owner.type === 'user' ? 'Created by ' : 'By '}</OwnerText>
                        <OwnerLink to={`/${owner.type}/${owner.id}`}>{owner.name}</OwnerLink>
                        <OwnerText>{` . ${owner.tracks} tracks`}</OwnerText>
                    </Owner>
                )}

                {!props.noButtons && (
                    <Buttons>
                        <ButtonPlay isRounded={true}>Play</ButtonPlay>
                        
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
}