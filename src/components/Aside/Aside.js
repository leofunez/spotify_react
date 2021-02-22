import React from "react"

// Styles
import {
    Container,
    Signature,
    Link,
    Heart
} from "./Aside.styles"

const Aside = () => {
    return (
        <Container>
            <Signature>
                This is a concept redesign using <Link href="https://developer.spotify.com" target="_blank">Spotify API</Link>. Designed on <Link href="https://www.figma.com" target="_blank">Figma</Link> and built on <Link href="https://reactjs.org/" target="_blank">ReactJS</Link> with <Heart>❤</Heart> by <Link href="https://www.leonardofunez.com" title="Leonardo Funez">Leonardo Funez</Link>
            </Signature>
        </Container>
    )
}

export default Aside