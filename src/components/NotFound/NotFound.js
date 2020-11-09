import React from "react"

// Styles
import {
    Container,
    Title,
    Description,
    LinkButton
} from "./NotFound.styles"

export const NotFound = ({ type }) => {
    return (
        <Container>
            <Title>404</Title>
            <Description>{`This ${type} couldn't be found`}</Description>
            <LinkButton to="/">Go to Browse</LinkButton>
        </Container>
    )
}