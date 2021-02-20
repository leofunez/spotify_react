import React, { useState, useEffect } from "react"

// Redux Hooks
import { useDispatch } from "react-redux"

// Redux Actions
import { setLoading } from "../../redux/actions/loadingAction"

// Api
import ApiSpotify from "../../config/api"

// Helpers
import { goToLogin } from "../../helpers/goToLogin"

// Styles
import {
    Tabs,
    TabsButtons,
    TabButton,
    TabsContent,
    TabBody
} from "./Browse.styles"

// Global Styles
import {
    PageContainer,
    PageTitle,
    CardList
} from "../../components/Globals/Globals.styles"

// Components
import Card from "../../components/Card/Card"

const Browse = () => {
    const dispatch = useDispatch()

    // Local state
    const [title] = useState("Browse")
    const [tabFeatured, setTabFeatured] = useState(true)
    const [featuredPlaylist, setFeaturedPlaylist] = useState([])
    const [newReleases, setNewReleases] = useState([])

    // Methods
        const getNewReleases = async () => {
            try {
                const response   = await ApiSpotify.getNewReleases()
                const { albums } = response?.data
                
                setNewReleases(albums?.items)
            } catch (err) {
                err?.response && console.log("NewReleases API Error!", err?.response)
            }

            // Turn off Loading
            setTimeout(() => dispatch(setLoading(false)), 1000)
        }

        const getFeaturedPlaylists = async () => {
            try {
                const response      = await ApiSpotify.getFeaturedPlaylists()
                const { playlists } = response?.data
                
                setFeaturedPlaylist(playlists?.items)
            } catch (err) {
                if (err?.response) {
                    let { status } = err?.response
                    status === 401 && goToLogin()
                    return
                }
                
                console.log("FeaturedPlaylists API Error!", {err})
            }
        }

        const changeTab = state => {
            setTabFeatured(state)
        }
    // .Methods

    useEffect(() => {
        getNewReleases()
        getFeaturedPlaylists()

        // Turn on Loading
        return () => {
            dispatch(setLoading(true))
        }
    }, [])

    return (
        <PageContainer>
            <PageTitle>{title}</PageTitle>

            <Tabs>
                <TabsButtons>
                    <TabButton onClick={() => changeTab(true)} isActive={tabFeatured}>Featured Playlist</TabButton>
                    <TabButton onClick={() => changeTab(false)} isActive={!tabFeatured}>New Releases</TabButton>
                </TabsButtons>

                <TabsContent>
                    <TabBody isActive={tabFeatured}>
                        <CardList>
                            {featuredPlaylist.map( (playlist, index) => (
                                <Card
                                    key      ={index}
                                    id       ={playlist?.id}
                                    title    ={playlist?.name}
                                    subtitle ={`${playlist?.tracks?.total} tracks`}
                                    image    ={playlist?.images[0].url}
                                    url      ={`/playlist/${playlist?.id}`}
                                />
                            ))}
                        </CardList>
                    </TabBody>

                    <TabBody isActive={!tabFeatured}>
                        <CardList>
                            {newReleases.map( (album, index) => (
                                <Card
                                    key      ={index}
                                    id       ={album?.id}
                                    title    ={album?.name}
                                    subtitle ={`${album?.total_tracks} tracks`}
                                    image    ={album?.images[0]?.url}
                                    url      ={`/album/${album?.id}`}
                                />
                            ))}
                        </CardList>
                    </TabBody>
                </TabsContent>
            </Tabs>
        </PageContainer>
    )
}

export default Browse