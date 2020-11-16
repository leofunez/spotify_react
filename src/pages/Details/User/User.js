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

// Styles
import {
    UserTop,
    UserPhoto,
    UserInfo,
    UserPretitle,
    UserName,
    UserFollowers
} from "./User.styles"

// Components
import Card from "../../../components/Card/Card"
import NotFound from "../../../components/NotFound/NotFound"

const User = props => {
    const dispatch = useDispatch()

    // Local State
    const [userId]                          = useState(props.match.params.id)
    const [userPhoto    , setUserPhoto]     = useState("")
    const [userName     , setUserName]      = useState("")
    const [userFollowers, setUserFollowers] = useState("")
    const [userPlaylists, setUserPlaylists] = useState([])
    const [notFound     , setNotFound]      = useState(false)

    // Methods
    const getUserInfo = async () => {
        try {
            const response = await ApiSpotify.getUserInfo(userId)
            const { data } = response
            
            setUserName(data.display_name)
            setUserPhoto(data.images[0].url)
            setUserFollowers(numFormatter(parseInt(data.followers.total)))
        } catch(err) {
            let { status } = err.response
            
            if (status === 400 || status === 404) {
                setNotFound(true)
            } else if(status === 401) {
                window.location.href = "/login"
            } else {
                console.log("UserDetail API Error!")
            }
        }
    }

    const getUserPlaylists = async () => {
        const response = await ApiSpotify.getUserPlaylists(userId)
        const { data } = response

        const newPlaylist = data.items.map( playlist => {
            const playlistObj = {
                id    : playlist.id,
                name  : playlist.name,
                image : playlist.images.length > 0 ? playlist.images[0].url : "",
                tracks: playlist.tracks.total + ' tracks'
            }

            return playlistObj
        })

        setUserPlaylists(newPlaylist)
        
        // Turn off Loading
        setTimeout(() => dispatch(setLoading(false)), 1000)
    }

    useEffect(() => {
        getUserInfo()
        getUserPlaylists()
        
        // Turn on Loading
        return () => {
            dispatch(setLoading(true))
        }
    }, [props])

    return (
        <PageContainer>
            {notFound ? (
                <NotFound type="track" />
            ) : (
                <>
                <UserTop>
                    {userPhoto.length > 0 && (
                        <UserPhoto src={userPhoto} />
                    )}
                    <UserInfo>
                        <UserPretitle>User</UserPretitle>
                        <UserName>{userName}</UserName>
                        <UserFollowers>{`${userFollowers} Followers`}</UserFollowers>
                    </UserInfo>
                </UserTop>
                
                <CardList>
                    {userPlaylists.map( (playlist, index ) => (
                        <Card
                            key      ={`${playlist.id}-${index}`}
                            id       ={playlist.id}
                            title    ={playlist.name}
                            subtitle ={playlist.tracks}
                            image    ={playlist.image !== '' ? playlist.image : 'no-image'}
                            url     ={`/playlist/${playlist.id}`}
                        />
                    ))}
                </CardList>
                </>
            )}
        </PageContainer>
    )
}

export default User