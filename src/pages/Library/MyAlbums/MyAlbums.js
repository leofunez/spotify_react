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
import { TopDetail } from "../../../components/TopDetail/TopDetail"
import Card          from "../../../components/Card/Card"

const MyAlbums = () => {
    const dispatch = useDispatch()

    // Local State
    const [albums, setAlbums]           = useState([])
    const [description, setDescription] = useState("")

    const getSavedAlbums = async () => {
        try {
            const response  = await ApiSpotify.getSavedAlbums()
            const { items } = response.data
            
            setAlbums(items)
            setDescription(`${albums.length} albums`)
        } catch (err) {
            console.log("Error getting MyAlbums!", err.response)
        }

        // Turn off Loading
        setTimeout(() => dispatch(setLoading(false)), 1000)
    }

    useEffect(() => {
        getSavedAlbums()

        // Turn on Loading
        return () => {
            dispatch(setLoading(true))
        }
    }, [])

    return (
        <PageContainer>
            <TopDetail
                pretitle    ="Library"
                title       ="Favorite albums"
                description ={description}
                no_buttons  ={true}
            />

            <CardList>
                {albums.map( (album, index) => (
                    <Card
                        key      ={index}
                        id       ={album.album.id}
                        title    ={album.album.name}
                        subtitle ={album.album.tracks.total + ' tracks'}
                        image    ={album.album.images[0].url}
                        url      ={`/album/${album.album.id}`}
                    />
                ))}
            </CardList>
        </PageContainer>
    )
}

export default MyAlbums