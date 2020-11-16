import React, { useState, useEffect } from "react"

// Redux Hooks
import { 
    useDispatch, 
    useSelector 
}  from "react-redux"

// Redux Actions
import { 
    setPlayerPlaying,
    setPlayerShuffle,
    setPlayerRepeat,
    setPlayerCurrentTrack
} from "../../redux/actions/playerActions"

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
    Control,
    Volume,
    VolumeButton,
    VolumeSliderBar,
    VolumeSlider
} from "./Player.styles"

// Track element
const track = new Audio()

const Player = () => {
    const dispatch = useDispatch()

    // Redux Store
    const { 
        current_track: storeCurrentTrack,
        tracklist    : storeTracklist,
        is_playing   : storeIsPlaying,
        shuffle      : storeIsShuffle,
        repeat       : storeIsRepeat
    } = useSelector( state => state.player )

    // Local State
    const [currentBar, setCurrentBar ] = useState("0")
    const [volume    , setVolume]      = useState(50)
    const [isMuted   , setIsMuted]     = useState(false)

    // Methods
    const playPromise = async () => {
        await track.load()
        track.volume = 0.50
        setTimeout(() => {
            track.play()
            dispatch(setPlayerPlaying(true))
        }, 500)
    }

    const playTrack = () => {
        if (storeCurrentTrack.album_id !== undefined) {
            track.src = storeCurrentTrack.track_url
        
            playPromise()

            track.ontimeupdate = () => {
                let trackProgress = parseInt(track.currentTime * 33 / 10) + 1
                setCurrentBar(trackProgress)
                
                if (trackProgress === 100) {
                    resetPlayer()
                    
                    if (storeIsRepeat) {
                        setTimeout( () => {                            
                            playPromise()
                        }, 500)
                    } else {
                        nextTrack()
                    }
                }
            }
        }
    }

    const pauseTrack = () => {
        dispatch(setPlayerPlaying(false))
        track.pause()
    }

    const getTrackTime = (duration) => {
        let s = parseInt(duration % 60)
        if (s < 10) s = "0" + s
        let m = parseInt((duration / 60) % 60)

        return m + ":" + s
    }

    const prevTrack = () => {
        if (storeCurrentTrack.track_index !== undefined) {
            let indexNextTrack = ""
            let prevTrack      = ""
            let newTrack       = ""

            storeCurrentTrack.track_index === 0 ? indexNextTrack = storeTracklist.length -1 : indexNextTrack = storeCurrentTrack.track_index - 1

            if (!storeIsShuffle) {
                prevTrack = storeTracklist[indexNextTrack]
            } else {
                prevTrack = storeTracklist[Math.floor(Math.random() * storeTracklist.length)]
            }

            newTrack = {
                track_index: indexNextTrack,
                track_id   : prevTrack.track_id,
                track_name : prevTrack.track_name,
                track_url  : prevTrack.track_url,
                artist_id  : prevTrack.artist_id,
                artist_name: prevTrack.artist_name,
                album_id   : prevTrack.album_id    ? prevTrack.album_id    : storeCurrentTrack.album_id,
                album_name : prevTrack.album_name  ? prevTrack.album_name  : storeCurrentTrack.album_name,
                album_photo: prevTrack.album_photo ? prevTrack.album_photo : storeCurrentTrack.album_photo,
            }

            changeTrack(newTrack)
        } 
    }

    const nextTrack = () => {
        if (storeCurrentTrack.track_index !== undefined) {
            let indexNextTrack = ""
            let next_track     = ""
            let newTrack       = ""
            
            storeCurrentTrack.track_index === storeTracklist.length -1 ? indexNextTrack = 0 : indexNextTrack = storeCurrentTrack.track_index + 1

            if (!storeIsShuffle) {
                next_track = storeTracklist[indexNextTrack]
            }else {
                next_track = storeTracklist[Math.floor(Math.random() * storeTracklist.length)]
            }
            
            newTrack = {
                track_index: indexNextTrack,
                track_id   : next_track.track_id,
                track_name : next_track.track_name,
                track_url  : next_track.track_url,
                artist_id  : next_track.artist_id,
                artist_name: next_track.artist_name,
                album_id   : next_track.album_id    ? next_track.album_id    : storeCurrentTrack.album_id,
                album_name : next_track.album_name  ? next_track.album_name  : storeCurrentTrack.album_name,
                album_photo: next_track.album_photo ? next_track.album_photo : storeCurrentTrack.album_photo,
            }

            changeTrack(newTrack)
        }
    }

    const resetPlayer = () => {
        setCurrentBar("0")
        dispatch(setPlayerPlaying(false))
    }

    const changeTrack = track => {
        resetPlayer()
        track.currentTime = 0
        track.src = track.track_url
        
        dispatch(setPlayerCurrentTrack(track))
        playPromise()
    }

    const shuffleTrackList = () => {
        dispatch(setPlayerShuffle(!storeIsShuffle))
    }

    const repeatTrack = () => {
        dispatch(setPlayerRepeat(!storeIsRepeat))
    }
    
    const muteVolume = () => {
        if (!isMuted) {
            setIsMuted(true)
            track.volume = 0
        } else {
            setIsMuted(false)
            track.volume = volume / 100
        }
    }

    const changeVolume = (e) => {
        const intValue = parseInt(e.target.value)
        
        setVolume(intValue)
        track.volume = intValue / 100
    }

    useEffect(() => {
        playTrack()
    }, [storeCurrentTrack])

    // Pause track from another component
    useEffect(() => {
        (!storeIsPlaying) && pauseTrack()
    }, [storeIsPlaying])

    return (
        <Container>
            <ProgressBar widthBar={currentBar}/>

            <Track>
                <Photo src={storeCurrentTrack.album_photo} />
                <Info>
                    <SongName>{storeCurrentTrack.track_name}</SongName>
                    <ArtistName to={`/artist/${storeCurrentTrack.artist_id}`}>{storeCurrentTrack.artist_name}</ArtistName>
                </Info>
            </Track>

            <Controls>
                <Control posX="-118" posY="-4" size="340" title="Shuffle" isShuffle={storeIsShuffle} onClick={() => shuffleTrackList()}/> 
                <Control posX="-73"  posY="-4" size="340" title="Previous" onClick={() => prevTrack()} />
                
                {storeIsPlaying ? (
                    <Control posX="-97"  posY="-8" size="650" noPadding={true} title="Pause" onClick={() => pauseTrack()} />
                ) : (
                    <Control posX="-53"  posY="-8" size="650" noPadding={true} title="Play" onClick={() => playTrack()}/>
                )}
                
                <Control posX="-95"  posY="-4" size="340" title="Next" onClick={() => nextTrack()} />
                <Control posX="-140" posY="-4" size="340" title="Repeat" isRepeat={storeIsRepeat} onClick={() => repeatTrack()} />
            </Controls>

            <Volume>
                <VolumeButton
                    isMuted = {volume === 0 || isMuted}
                    isLow   = {(volume > 0  && volume < 30 && !isMuted)}
                    isMid   = {(volume > 20 && volume < 80 && !isMuted)}
                    isHigh  = {(volume > 70 && !isMuted)}
                    onClick = {() => muteVolume()}
                />
                <VolumeSliderBar />
                <VolumeSlider
                    value    = {isMuted ? 0 : volume}
                    onChange = {(e) => changeVolume(e)}
                />
            </Volume>
        </Container>
    )
}

export default Player