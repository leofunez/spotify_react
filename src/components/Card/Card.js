import React from "react"

import {
    Container,
    Image,
    ImageText,
    Title,
    Subtitle
} from "./Card.styles"

const Card = props => {
    return (
        <Container>
            <Image src={props.image} isEmpty={true}>
                {props.image.length === 0 && (
                    <ImageText>No Image</ImageText>
                )}
            </Image>
            
            <Title>{props.title}</Title>
            <Subtitle>{props.subtitle}</Subtitle>
        </Container>
    )
}

export default Card