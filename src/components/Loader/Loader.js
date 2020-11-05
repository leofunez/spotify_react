import React from "react"

// Redux Hooks
import { useSelector } from "react-redux"

// Styles
import { Container } from "./Loader.styles"

const Loader = () => {
    // Redux State
    const { loading : storeLoading } = useSelector( state => state.loading )
    
    return (
        <>
            {storeLoading && <Container></Container>}
        </>
    )
}

export default Loader