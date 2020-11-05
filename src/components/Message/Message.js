import React, { useState } from "react"

// Styles
import { Container } from "./Message.styles"

export const Message = props => {
    return (
        <Container>
            {props.text}
        </Container>
    )
}