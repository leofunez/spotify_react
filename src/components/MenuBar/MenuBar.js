import React, { useState, useEffect, useCallback, memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

// Redux Actions
import { fetchPlaylists } from "../../redux/actions/playlistsAction"
import { fetchFavoriteTracks } from "../../redux/actions/favoritesAction"

// Api
import ApiSpotify from "../../config/api"

// Global Styles
import {
    FormItem,
    Input,
    InputMessage,
    TextArea
} from "../Globals/Globals.styles"

// Styles
import {
    StyledLogo,
    Container,
    Group,
    GroupTitle,
    GroupScroll,
    MenuItems,
    MenuItem,
    Icon,
    Add
} from "./MenuBar.styles"

// Components
import Modal from "../Modal/Modal"

const MenuBar = memo(() => {
    const dispatch  = useDispatch()

    // Redux State
    const { playlists: storePlaylists } = useSelector( state => state.playlists )
    const { user     : storeUser }      = useSelector( state => state.user )

    // Local State
    const [newPlaylist   , setNewPlaylist]    = useState(false)
    const [showModal     , setShowModal]      = useState(false)
    const [modalInputName, setModalInputName] = useState("")
    const [modalInputDesc, setModalInputDesc] = useState("")
    const [modalInputPub , setModalInputPub]  = useState(true)
    const [modalNameError, setModalNameError] = useState(false)

    // Menu States
    const [menuLibraryState  , setMenuLibraryState]   = useState(false)
    const [menuPlaylistsState, setMenuPlaylistsState] = useState(false)

    // Methods
    const openModal = () => {
        setShowModal(true)
    }

    const getStorePlaylists = useCallback(() => {
        dispatch(fetchPlaylists())
    }, [storePlaylists])

    const getFavoriteTracks = () => {
        dispatch(fetchFavoriteTracks())
    }

    const handleOpenMobileMenu = item => {
        if (item === "library") {
            setMenuPlaylistsState(false)
            setMenuLibraryState(!menuLibraryState)
        } else if (item === "playlists") {
            setMenuLibraryState(false)
            setMenuPlaylistsState(!menuPlaylistsState)
        }
    }

    const handleCloseMobileMenus = () => {
        setMenuPlaylistsState(false)
        setMenuLibraryState(false)
    }

    // From Modal components
        const handleModalYes = () => {
            if (modalInputName === "") {
                setModalNameError(true)
            } else {
                setModalNameError(false)
                createPlaylist()
            }
        }

        const handleModalClose = () => {
            setShowModal(false)
            setModalInputName("")
            setModalInputDesc("")
        }

        const createPlaylist = async () => {
            try {
                const userId     = storeUser.id
                const response   = await ApiSpotify.createPlaylist(modalInputName, modalInputDesc, modalInputPub, userId)
                if (response.status === 201) {
                    handleModalClose()
                    setNewPlaylist(true)
                }
            } catch(err) {
                let { status } = err.response
            
                if(status === 401) {
                    window.location.href = "/login"
                } else {
                    console.log("Error creating the playlist!")
                }
            }
        }
    //.

    useEffect(() => {
        getFavoriteTracks()
    }, []);

    useEffect(() => {
        getStorePlaylists()
    }, [newPlaylist]);

    return (
        <Container onMouseLeave={() => handleCloseMobileMenus()}>
            <NavLink to="/"><StyledLogo /></NavLink>
            
            <Group>
                <GroupTitle showInDesktop={true}>Discover</GroupTitle>
                <MenuItems showInMobile={true} isRelative={true}>
                    <MenuItem type="browse" to="/">
                        <Icon size="425" posX="-325" posY="-33" />Browse
                    </MenuItem>
                </MenuItems>
            </Group>

            <Group>
                <GroupTitle onClick={() => handleOpenMobileMenu("library")}>Library</GroupTitle>
                <MenuItems isOpen={menuLibraryState}>
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
                </MenuItems>
            </Group>

            <Group hasScroll={true}>
                <GroupTitle onClick={() => handleOpenMobileMenu("playlists")}>Playlists</GroupTitle>
                
                <GroupScroll>
                    <MenuItems isOpen={menuPlaylistsState}>
                        {storePlaylists && storePlaylists.map( (playlist, index) => (
                            <MenuItem type="playlist" to={`/playlist/${playlist.id}`} key={`${playlist.id}-${index}`}>
                                <Icon size="360" posX="-203" posY="-25" />{playlist.name}
                            </MenuItem>
                        ))}
                    </MenuItems>
                </GroupScroll>
            </Group>

            <Add onClick={() => openModal()}>
                <Icon size="360" posX="-213" posY="-121" />New playlist
            </Add>

            {/* Modal */}
                <Modal
                    title          = "Create Playlist"
                    body           = ""
                    buttonYes      = "Create"
                    buttonNo       = "Cancel"
                    show           = {showModal}
                    handleModalYes = {() => handleModalYes()}
                    handleModalNo  = {() => handleModalClose()}
                >
                    <FormItem>
                        <Input 
                            placeholder="Name *" 
                            hasError={modalNameError} 
                            value={modalInputName} 
                            onChange={(e) => setModalInputName(e.target.value)} 
                        />
                        <InputMessage isHide={modalNameError}>This field is required!</InputMessage>
                    </FormItem>

                    <FormItem>
                        <TextArea 
                            placeholder="Description" 
                            value      ={modalInputDesc}
                            onChange   ={(e) => setModalInputDesc(e.target.value)}
                        />
                    </FormItem>
                </Modal>
            {/* .Modal */}
        </Container>
    )
})

export default MenuBar