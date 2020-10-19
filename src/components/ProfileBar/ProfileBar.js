import React from "react"

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
    return (
        <Container>
            <ContainerWrapper>
                <Search>
                    <SearchInput type="search" placeholder="Search..." />
                </Search>

                <User to="`/user/`">
                    <UserName>Leonardo Funez</UserName>
                    <Avatar isEmpty={true}></Avatar>
                </User>
            </ContainerWrapper>
        </Container>
    )
}

export default ProfileBar