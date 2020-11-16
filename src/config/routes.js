import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { createBrowserHistory } from "history";

// Root Styles
import {
    Main,
    MainContent,
    MainWrapper
} from "../components/Main/Main.styles"

// Components
import MenuBar from "../components/MenuBar/MenuBar"
import ProfileBar from "../components/ProfileBar/ProfileBar"
import Player from "../components/Player/Player"
import Loader from "../components/Loader/Loader"

// Main
import Login  from "../pages/Login/Login"
import Browse from "../pages/Browse/Browse"

// Details
import Track    from "../pages/Details/Track/Track"
import Album    from "../pages/Details/Album/Album"
import Artist   from "../pages/Details/Artist/Artist"
import Playlist from "../pages/Details/Playlist/Playlist"
import User     from "../pages/Details/User/User"

// Library
import MyAlbums    from "../pages/Library/MyAlbums/MyAlbums"
import MyTracks    from "../pages/Library/MyTracks/MyTracks"
import MyPlaylists from "../pages/Library/MyPlaylists/MyPlaylists"
import MyArtists   from "../pages/Library/MyArtists/MyArtists"

// Errors
import ErrorPage from "../pages/Error/Error"

const history = createBrowserHistory()
const { pathname } = history.location
const isNotLogin = pathname !== "/login"

const Routes = (
    <Router>
        <Main isNotLogin={isNotLogin}>
            {isNotLogin && <MenuBar />}
            
            <MainContent isNotLogin={isNotLogin}>
                <Loader />
                
                {isNotLogin && <ProfileBar />}
                
                <MainWrapper>
                    <Switch>
                        <Route component={Browse}      path="/" exact />
                        <Route component={Login}       path="/login" />

                        <Route component={Track}       path="/track/:id"/>
                        <Route component={Album}       path="/album/:id"/>
                        <Route component={Artist}      path="/artist/:id"/>
                        <Route component={Playlist}    path="/playlist/:id"/>
                        <Route component={User}        path="/user/:id"/>

                        <Route component={MyAlbums}    path="/favorites/albums"/>
                        <Route component={MyTracks}    path="/favorites/tracks"/>
                        <Route component={MyPlaylists} path="/favorites/playlists"/>
                        <Route component={MyArtists}   path="/favorites/artists"/>
                        
                        <Route component={ErrorPage}   path="*"/>
                    </Switch>
                </MainWrapper>
            </MainContent>

            {isNotLogin && <Player />}
        </Main>
    </Router>
)

export default Routes