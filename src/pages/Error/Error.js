import React, { useEffect } from "react"

// Redux Hooks
import { useDispatch } from "react-redux"

// Redux Actions
import { setLoading } from "../../redux/actions/loadingAction"

// Global Styles
import {
    PageContainer
} from "../../components/Globals/Globals.styles"

// Components
import NotFound from "../../components/NotFound/NotFound"

const ErrorPage = props => {
    console.log(props)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoading(false))
    }, [])

    return (
        <PageContainer>
            <NotFound type="page" />
        </PageContainer>
    )
}

export default ErrorPage