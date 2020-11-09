import React from "react"

// Styles
import { Container } from "./Message.styles"

const Message = ({ text }) => {
    return (
        <Container>
            {text}
        </Container>
    )
}

export default Message