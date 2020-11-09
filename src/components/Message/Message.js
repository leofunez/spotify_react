import React from "react"

// Styles
import { Container } from "./Message.styles"

export const Message = ({ text }) => {
    return (
        <Container>
            {text}
        </Container>
    )
}