import React, { memo } from "react"

// Styles
import {
    Container,
    Avatar,
    Title
} from "./MiniCard.styles"

const MiniCard = memo(({
    id    : cardId,
    name  : cardTitle,
    avatar: cardAvatar,
    type  : cardType,
    padding= ""
}) => {
    return (
        <Container to={`/${cardType}/${cardId}`} padding={padding}>
            <Avatar src={cardAvatar} />
            <Title>{cardTitle}</Title>
        </Container>
    )
})

export default MiniCard