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

const MyPlaylists = () => {
    const dispatch = useDispatch()

    return (
        <PageContainer></PageContainer>
    )
}

export default MyPlaylists