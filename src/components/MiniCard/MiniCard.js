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
    padding,
    clickThis
}) => {
    const handleClick = () => clickThis && clickThis()

    return (
        <Container to={`/${cardType}/${cardId}`} padding={padding} onClick={() => handleClick()}>
            <Avatar src={cardAvatar} />
            <Title>{cardTitle}</Title>
        </Container>
    )
})

export default MiniCard