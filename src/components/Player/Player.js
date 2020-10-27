import React from "react"

// Styles
import {
    Container,
    ProgressBar,
    Track,
    Photo,
    Info,
    SongName,
    ArtistName,
    Controls,
    Control
} from "./Player.styles"

const Player = () => {
    return (
        <Container>
            <ProgressBar></ProgressBar>

            <Track>
                <Photo />
                <Info>
                    <SongName></SongName>
                    <ArtistName to=""></ArtistName>
                </Info>
            </Track>

            <Controls>
                <Control posX="-118" posY="-4" size="340" title="Shuffle" /> 
                <Control posX="-73"  posY="-4" size="340" title="Previous" />
                
                <Control posX="-53"  posY="-8" size="650" noPadding={true} title="Play" />
                <Control posX="-97"  posY="-8" size="650" noPadding={true} title="Pause" />
                
                <Control posX="-95"  posY="-4" size="340" title="Next" />
                <Control posX="-140" posY="-4" size="340" title="Repeat" />
            </Controls>
        </Container>
    )
}

export default Player