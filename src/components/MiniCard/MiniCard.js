import React from "react"

// Styles
import {
    Container,
    Avatar,
    Title
} from "./MiniCard.styles"

export const MiniCard = ({
    id    : cardId,
    name  : cardTitle,
    avatar: cardAvatar,
    type  : cardType
}) => {
    return (
        <Container to={`/${cardType}/${cardId}`}>
            <Avatar src={cardAvatar} />
            <Title>{cardTitle}</Title>
        </Container>
    )
}