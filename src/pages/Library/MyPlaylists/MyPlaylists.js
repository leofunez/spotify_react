import React, { useState, useEffect } from "react"

// Redux Hooks
import { useDispatch } from "react-redux"

// Redux Actions
import { setLoading } from "../../../redux/actions/loadingAction"

// Api
import ApiSpotify from "../../../config/api"

// Global Styles
import {
    PageContainer,
    CardList
} from "../../../components/Globals/Globals.styles"

// Components
import TopDetail from "../../../components/TopDetail/TopDetail"
import Card      from "../../../components/Card/Card"
import Message   from "../../../components/Message/Message"

const MyPlaylists = () => {
    const dispatch = useDispatch()

    // Local State
    const [playlists, setPlaylists]     = useState([])
    const [description, setDescription] = useState("")

    const [showMessage, setShowMessage] = useState(false)
    const [messageText]                 = useState("You have no favorite Playlists yet :(")

    // Methods
    const getSavedPlaylists = () => {
        let JSONStoragePlaylists = JSON.parse(localStorage.getItem("spotifyReactPlaylists"))
        JSONStoragePlaylists === null && localStorage.setItem("spotifyReactPlaylists", JSON.stringify([]))
        
        let storePlaylistslength = JSONStoragePlaylists.length
        if (storePlaylistslength > 0) {
            // Set Description
            setDescription(`${storePlaylistslength} ${storePlaylistslength === 1 ? `playlist` : `playlists`}`)
            
            let playlistsList = []

            JSONStoragePlaylists.forEach( async id => {
                const response = await ApiSpotify.getPlaylist(id)
                const playlist = response.data
                
                const newPlaylist = {
                    id    : playlist?.id,
                    name  : playlist?.name,
                    image : playlist?.images[0]?.url,
                    tracks: `${playlist?.tracks?.total} tracks`
                }
                
                playlistsList = [...playlistsList, newPlaylist]
            })
            
            setTimeout(() => setPlaylists(playlistsList), 500);
        } else {
            setShowMessage(true)
            
            // Turn off Loading
            dispatch(setLoading(false))
        }

        // Turn off Loading
        setTimeout(() => dispatch(setLoading(false)), 1000)
    }

    useEffect(() => {
        getSavedPlaylists()

        // Turn on Loading
        return () => {
            dispatch(setLoading(true))
        }
    }, [])

    return (
        <PageContainer>
            <TopDetail
                pretitle    ="Library"
                title       ="Favorite playlists"
                description ={description}
                noButtons   ={true}
            />

            <CardList>
                {playlists.map( (playlist, index) => (
                    <Card
                        key      ={index}
                        id       ={playlist?.id}
                        title    ={playlist?.name}
                        subtitle ={playlist?.tracks}
                        image    ={playlist?.image}
                        url      ={`/playlist/${playlist?.id}`}
                    />
                ))}
            </CardList>

            {showMessage && <Message text={messageText} />}
        </PageContainer>
    )
}

export default MyPlaylists