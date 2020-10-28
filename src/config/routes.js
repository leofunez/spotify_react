import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

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

// Favorites
import MyAlbums    from "../pages/Favorites/MyAlbums/MyAlbums"
import MyTracks    from "../pages/Favorites/MyTracks/MyTracks"
import MyPlaylists from "../pages/Favorites/MyPlaylists/MyPlaylists"
import MyArtists   from "../pages/Favorites/MyArtists/MyArtists"

// Errors
// import NotFound from "../pages/Error/Error"

const Routes = (
    <Router>
        <main className="app">
            <MenuBar />
            
            <section className="content">
                <Loader />
                <ProfileBar />

                <div className="wrapper">
                    
                        <Route component={Login}       path="/login" />
                        <Route component={Browse}      path="/" exact />

                        <Route component={Track}       path="/track/:id" />
                        <Route component={Album}       path="/album/:id" />
                        <Route component={Artist}      path="/artist/:id" />
                        <Route component={Playlist}    path="/playlist/:id" />
                        <Route component={User}        path="/user/:id" />

                        <Route component={MyAlbums}    path="/favorites/albums" />
                        <Route component={MyTracks}    path="/favorites/tracks" />
                        <Route component={MyPlaylists} path="/favorites/playlists" />
                        <Route component={MyArtists}   path="/favorites/artists" />
                        
                        {/* <Route path="/user/:id"     component={User} /> */}
                    
                </div>
            </section>

            <Player />
        </main>
    </Router>
)

export default Routes