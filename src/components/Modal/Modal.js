import React, { useEffect, useState } from "react"

// Global Components
import { Button } from "../Globals/Globals.styles"

// Styles
import {
    Container,
    Content,
    Header,
    Title,
    Close,
    Body,
    Footer
} from "./Modal.styles"

const Modal = ({
    title,
    body,
    buttonYes,
    buttonNo,
    
    show = false,
    handleModalYes,
    handleModalNo,
    
    children
}) => {
    // Local state
    const [showModal, setShowModal] = useState(show)

    // Methods
    const handleYes  = () => handleModalYes && handleModalYes()
    const handleNo   = () => handleModalNo  && handleModalNo()

    useEffect(() => {
        setShowModal(show)
    }, [show])

    return (
        <>
            { showModal && (
                <Container>
                    <Content>
                        <Header>
                            <Title>{title}</Title>
                            <Close onClick={() => handleNo()} />
                        </Header>

                        <Body>{children}</Body>

                        <Footer>
                            <Button isText={true} onClick={() => handleYes()}>{buttonYes}</Button>
                            <Button isText={true} onClick={() => handleNo()}>{buttonNo}</Button>
                        </Footer>
                    </Content>
                </Container>
            )}
        </>
    )
}

export default Modal