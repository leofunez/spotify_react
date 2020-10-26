import React, { useState, useEffect } from "react"

// Styles
import {
    Container,
    Avatar,
    Title
} from "./MiniCard.styles"

export const MiniCard = props => {
    const [cardId, setCardId]         = useState("")
    const [CardTitle, setCardTitle]   = useState("")
    const [cardAvatar, setCardAvatar] = useState("")
    const [cardType, setCardType]     = useState("")
    const [cardSize, setCardSize]     = useState("")

    useEffect(() => {
        setCardId(props.id)
        setCardTitle(props.name)
        setCardAvatar(props.avatar)
        setCardType(props.type)
        setCardSize(props.id)
    }, [props])

    return (
        <Container to={`/${cardType}/${cardId}`}>
            <Avatar src={cardAvatar} />
            <Title>{CardTitle}</Title>
        </Container>
    )
}