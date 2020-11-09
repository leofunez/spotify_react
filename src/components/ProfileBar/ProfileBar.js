import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// Redux Actions
import fecthUser from "../../redux/actions/userAction"

// Styles
import {
    Container,
    ContainerWrapper,
    Search,
    SearchInput,
    User,
    UserName,
    Avatar
} from "./ProfileBar.styles"

const ProfileBar = () => {
    const dispatch = useDispatch()
    const user = useSelector( state => state.user.user || {} )

    useEffect(() => {
        dispatch(fecthUser())
    }, [])

    return (
        <Container>
            <ContainerWrapper>
                <Search>
                    <SearchInput type="search" placeholder="Search..." />
                </Search>

                <User to={`/user/${user.id}`}>
                    <UserName>{user.display_name}</UserName>
                    <Avatar
                        src={user.images && user.images[0].url} 
                        isEmpty={user.images && user.images.length === 0}
                    />
                </User>
            </ContainerWrapper>
        </Container>
    )
}

export default ProfileBar