import React, { useState } from "react"

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

const Player = () => {
    const dispatch = useDispatch()

    const [track]                           = useState(new Audio())
    const [trackName,     setTrackName]     = useState("")
    const [trackArtistId, setTrackArtistId] = useState("")
    const [trackArtist,   setTrackArtist]   = useState("")
    const [trackPhoto,    setTrackPhoto]    = useState("")
    const [trackSrc,      setTrackSrc]      = useState("")

    const [currentTime,   setCurrentTime]   = useState(0)
    const [currentBar,    setCurrentBar ]   = useState("0")
    const [volume,        setVolume]        = useState(50)
    const [isMuted,       setIsMuted]       = useState(false)
    
    const isPlaying = useSelector( state => state.player.is_playing )
    const isShuffle = useSelector( state => state.player.shuffle )
    const isRepeat  = useSelector( state => state.player.repeat )

    const setCurrentTrack = () => {
        // let track = this.GET_CURRENT_TRACK[0]
        let track = {}
        
        trackName     = track.track_name
        trackArtistId = track.artist_id
        trackArtist   = track.artist_name
        trackPhoto    = track.album_photo
        trackSrc      = track.track_url

        // isPlaying     = this.GET_PLAYING
    }

    const playPromise = async () => {
        await track.load()
        track.play()
    }

    const playTrack = () => {
        if (this.GET_CURRENT_TRACK.album_id !== "") {
            // this.SET_PLAYING(true)
            track.src    = this.GET_CURRENT_TRACK[0].track_url
            track.volume = (volume / 10)
            
            playPromise()
            
            isPlaying = true

            track.ontimeupdate = () => {
                currentTime = getTrackTime(track.currentTime) || "0:00"
                currentBar  = parseInt(track.currentTime * 33 / 10) + 1
                
                if(currentBar === 100){
                    // this.SET_PLAYING(false)
                    resetPlayer()
                    
                    if (this.GET_REPEAT) {
                        setTimeout( () => {
                            track.volume = (volume / 10)
                            
                            playPromise()
                            
                            isPlaying = true
                            // this.SET_PLAYING(true)
                        }, 500)
                    } else {
                        nextTrack()
                    }
                }
            }
        }
    }

    const getTrackTime = (duration) => {
        let s = parseInt(duration % 60)
        if (s < 10) s = "0" + s
        let m = parseInt((duration / 60) % 60)

        return m + ":" + s
    }

    const resetPlayer = () => {
        currentBar = "0"
        isPlaying  = false
        // this.SET_PLAYING(false)
    }

    const prevTrack = () => {
        let current_track = this.GET_CURRENT_TRACK[0]
        
        if (current_track !== undefined) {
            let index_next_track = ""
            let prev_track       = ""
            let new_track        = ""

            current_track.track_index === 0 ? index_next_track = this.GET_TRACK_LIST[0].length -1 : index_next_track = current_track.track_index - 1

            if (!this.GET_SHUFFLE) {
                prev_track = this.GET_TRACK_LIST[0][index_next_track]
            } else {
                prev_track = this.GET_TRACK_LIST[0][Math.floor(Math.random() * this.GET_TRACK_LIST[0].length)]
            }

            new_track = {
                track_index: index_next_track,
                track_id   : prev_track.track_id,
                track_name : prev_track.track_name,
                track_url  : prev_track.track_url,
                artist_id  : prev_track.artist_id,
                artist_name: prev_track.artist_name,
                album_id   : prev_track.album_id    ? prev_track.album_id    : current_track.album_id,
                album_name : prev_track.album_name  ? prev_track.album_name  : current_track.album_name,
                album_photo: prev_track.album_photo ? prev_track.album_photo : current_track.album_photo,
            }

            changeTrack(new_track)
        } 
    }

    const nextTrack = () => {
        let current_track = this.GET_CURRENT_TRACK[0]
        
        if (current_track !== undefined) {
            let index_next_track = ""
            let next_track       = ""
            let new_track        = ""
            
            current_track.track_index === this.GET_TRACK_LIST[0].length -1 ? index_next_track = 0 : index_next_track = current_track.track_index + 1

            if (!this.GET_SHUFFLE) {
                next_track = this.GET_TRACK_LIST[0][index_next_track]
            }else {
                next_track = this.GET_TRACK_LIST[0][Math.floor(Math.random() * this.GET_TRACK_LIST[0].length)]
            }
            
            new_track = {
                track_index: index_next_track,
                track_id   : next_track.track_id,
                track_name : next_track.track_name,
                track_url  : next_track.track_url,
                artist_id  : next_track.artist_id,
                artist_name: next_track.artist_name,
                album_id   : next_track.album_id    ? next_track.album_id    : current_track.album_id,
                album_name : next_track.album_name  ? next_track.album_name  : current_track.album_name,
                album_photo: next_track.album_photo ? next_track.album_photo : current_track.album_photo,
            }

            changeTrack(new_track)
        }
    }

    const changeTrack = (track) => {
        resetPlayer()
        track.src = track.track_url
        
        playPromise()

        // this.SET_CURRENT_TRACK(track)
        // this.SET_PLAYING(true)
    }

    const shuffleTrackList = () => {
        dispatch(setPlayerShuffle(!isShuffle))
		// this.SET_SHUFFLE(isShuffle)
    }

    const repeatTrack = () => {
        dispatch(setPlayerRepeat(!isRepeat))
        // setIsRepeat(!isRepeat)
        // this.SET_REPEAT(isRepeat)
    }
    
    const muteVolume = () => {
        setIsMuted(!isMuted)
        track.volume = (volume / 100) ? !isMuted : 0
    }

    const changeVolume = (e) => {
        const intValue = parseInt(e.target.value)
        console.log(intValue)
        
        setVolume(intValue)
        track.volume = intValue / 100
    }

    return (
        <Container>
            <ProgressBar widthBar={currentBar}/>

            <Track>
                <Photo src={trackPhoto} />
                <Info>
                    <SongName>{trackName}</SongName>
                    <ArtistName to={`/artist/${trackArtistId}`}>{trackArtist}</ArtistName>
                </Info>
            </Track>

            <Controls>
                <Control posX="-118" posY="-4" size="340" title="Shuffle" isShuffle={isShuffle} onClick={() => shuffleTrackList()}/> 
                <Control posX="-73"  posY="-4" size="340" title="Previous" />
                
                {isPlaying ? (
                    <Control posX="-97"  posY="-8" size="650" noPadding={true} title="Pause" />
                ) : (
                    <Control posX="-53"  posY="-8" size="650" noPadding={true} title="Play" />
                )}
                
                <Control posX="-95"  posY="-4" size="340" title="Next" />
                <Control posX="-140" posY="-4" size="340" title="Repeat" isRepeat={isRepeat} onClick={() => repeatTrack()} />
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