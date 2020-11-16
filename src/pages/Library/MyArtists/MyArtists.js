import React, { useState, useEffect } from "react"

// Redux Hooks
import { useDispatch } from "react-redux"

// Redux Actions
import { setLoading } from "../../../redux/actions/loadingAction"

// Api
import ApiSpotify from "../../../config/api"

// Helpers
import { numFormatter }  from "../../../helpers/numFormatter"

// Global Styles
import {
    PageContainer,
    CardList
} from "../../../components/Globals/Globals.styles"

// Components
import TopDetail from "../../../components/TopDetail/TopDetail"
import Card      from "../../../components/Card/Card"
import Message   from "../../../components/Message/Message"

const MyArtists = () => {
    const dispatch = useDispatch()

    // Local State
    const [artists    , setArtists]     = useState([])
    const [description, setDescription] = useState("")

    const [showMessage, setShowMessage] = useState(false)
    const [messageText]                 = useState("You have no favorite Artists yet :(")

    // Methods
    const getSavedArtistIds = () => {
        let JSONStorageArtists = JSON.parse(localStorage.getItem("spotifyReactArtists"))
        JSONStorageArtists === null && localStorage.setItem("spotifyReactArtists", JSON.stringify([]))

        let storeArtistslength = JSONStorageArtists.length
        if (storeArtistslength > 0) {
            // Set Description
            setDescription(`${storeArtistslength} ${storeArtistslength === 1 ? `artist` : `artists`}`)
            
            let ids = ""
            JSONStorageArtists.forEach( (id, index) => {
                ids = (index < storeArtistslength-1) ? `${ids}${id}%2C` : `${ids}${id}`
            })
            
            getArtists(ids)
        } else {
            setShowMessage(true)
            
            // Turn off Loading
            dispatch(setLoading(false))
        }
    }

    const getArtists = async ids => {
        try {
            const response    = await ApiSpotify.getArtists(ids)
            const { artists } = response.data

            let index      = 0
            let artistList = []
            
            while (index < artists.length ) {
                let artist = artists[index]

                const newArtist = {
                    id       : artist.id,
                    name     : artist.name,
                    image    : artist.images[1].url,
                    followers: `${numFormatter(parseInt(artist.followers.total))} Followers`
                }

                artistList = [...artistList, newArtist]

                index++
            }

            setArtists(artistList)
        } catch(err) {
            let { status } = err.response
            
            if(status === 401) {
                window.location.href = "/login"
            } else {
                console.log("Error getting Artists!")
            }
        }

        // Turn off Loading
        setTimeout(() => dispatch(setLoading(false)), 1000)
    }

    useEffect(() => {
        getSavedArtistIds()

        return () => {
            // Turn on Loading
            dispatch(setLoading(true))
        }
    }, [])

    return (
        <PageContainer>
            <TopDetail
                pretitle    ="Library"
                title       ="Favorite artists"
                description ={description}
                noButtons   ={true}
            />

            <CardList>
                {artists.map( (artist, index) => (
                    <Card
                        key      ={index}
                        id       ={artist.id}
                        title    ={artist.name}
                        subtitle ={artist.followers}
                        image    ={artist.image}
                        url      ={`/artist/${artist.id}`}
                    />
                ))}
            </CardList>

            {showMessage && <Message text={messageText} />}
        </PageContainer>
    )
}

export default MyArtists