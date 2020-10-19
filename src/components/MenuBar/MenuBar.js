import React from "react"
import { NavLink } from "react-router-dom"

import {
    Container,
    Group,
    GroupTitle,
    GroupScroll,
    MenuItem,
    Icon,
    Add
} from "./MenuBar.styles"

const MenuBar = () => {
    return (
        <Container>
            <NavLink to="/" className="logo" />
            
            <Group>
                <GroupTitle>Discover</GroupTitle>
                <MenuItem type="browse" to="/">
                    <Icon size="425" posX="-325" posY="-33" />Browse
                </MenuItem>
                <MenuItem type="radio" to="/radio">
                    <Icon size="350" posX="-292" posY="-25" />Radio
                </MenuItem>
            </Group>

            <Group>
                <GroupTitle>Library</GroupTitle>
                <MenuItem type="songs" to="/favorites/tracks">
                    <Icon size="360" posX="-177" posY="-25" />Songs
                </MenuItem>
                <MenuItem type="playlists" to="/favorites/playlists">
                    <Icon size="360" posX="-202" posY="-25" />Playlists
                </MenuItem>
                <MenuItem type="albums" to="/favorites/albums">
                    <Icon size="360" posX="-252" posY="-25" />Albums
                </MenuItem>
                <MenuItem type="artists" to="/favorites/artists">
                    <Icon size="360" posX="-228" posY="-25" />Artists
                </MenuItem>
            </Group>

            <Group hasScroll={true}>
                <GroupTitle>Playlists</GroupTitle>
                
                <GroupScroll>
                    <MenuItem type="playlist" to="/test">
                        <Icon size="360" posX="-203" posY="-25" />Baladas
                    </MenuItem>
                </GroupScroll>
            </Group>

            <Add>
                <Icon size="360" posX="-213" posY="-121" />New playlist
            </Add>
        </Container>
    )
}

export default MenuBar