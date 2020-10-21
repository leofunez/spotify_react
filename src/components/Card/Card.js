import React from "react"

import {
    Container,
    Link,
    Image,
    ImageText,
    Title,
    Subtitle
} from "./Card.styles"

const Card = props => {
    return (
        <Container>
            <Link to={props.url}>
                <Image src={props.image} isEmpty={true}>
                    {props.image.length === 0 && (
                        <ImageText>No Image</ImageText>
                    )}
                </Image>
                
                <Title>{props.title}</Title>
                <Subtitle>{props.subtitle}</Subtitle>
            </Link>
        </Container>
    )
}

export default Card