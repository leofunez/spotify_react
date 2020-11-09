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

const MyArtists = () => {
    const dispatch = useDispatch()

    // Local State
    const [artists, setArtists]         = useState([])
    const [description, setDescription] = useState("")

    const getSavedArtists = () => {
        // Turn off Loading
            setTimeout(() => dispatch(setLoading(false)), 1000)
    }

    useEffect(() => {
        getSavedArtists()

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
                no_buttons  ={true}
            />

            <CardList>
                {artists.map( (artist, index) => (
                    <Card
                        key      ={index}
                        id       ={artist.id}
                        title    ={artist.name}
                        subtitle ={artist.followers}
                        image    ={artist.image}
                        link     ={`/artist/${artist.id}`}
                    />
                ))}
            </CardList>
        </PageContainer>
    )
}

export default MyArtists