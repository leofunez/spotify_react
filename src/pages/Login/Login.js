import React, { useEffect } from "react"

// Redux Hooks
import { useDispatch } from "react-redux"

// Redux Actions
import { setLoading } from "../../redux/actions/loadingAction"
import fecthUser from "../../redux/actions/userAction"

// API
import { appScopes, clientID, redirectURI } from "../../config/appInfo"

// Styles
import {
    Container,
    Wrapper,
    LoginLogo,
    Description,
    Buttons,
    SignInButton,
    SignUpButton,
    Author,
    AuthorLink,
    AuthorHeart
} from "./Login.styles"

const Login = () => {
    const dispatch = useDispatch()

    // Methods
    const SignIn = () => {
        const baseUrl = `https://accounts.spotify.com/authorize/?client_id=${clientID}&response_type=token&redirect_uri=${encodeURIComponent(redirectURI)}&scope=${encodeURIComponent(appScopes)}&state=34fFs29kd09`;
        window.location.href = baseUrl;        
    }

    const getUrlParam = () => {
        let { origin } = window.location
        let hash       = window.location.hash.replace('#', '?')
        let url        = origin + hash

        let params     = {}
        let parser     = document.createElement('a')
        parser.href    = url
        
        let query      = parser.search.substring(1)
        let vars       = query.split('&')

        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split('=')
            params[pair[0]] = decodeURIComponent(pair[1])
        }

        return params;
    }

    const setNewToken = () => {
        const spotifyToken = getUrlParam().access_token
        
        if (spotifyToken) {
            dispatch(setLoading(true))
            localStorage.setItem('spotifyToken', spotifyToken)

            setTimeout( () => {
                dispatch(fecthUser())
                window.location.href = '/'
            }, 500)
        }
    }

    useEffect(() => {
        dispatch(setLoading(false))
        setNewToken()
    }, [])

    return (
        <Container>
            <Wrapper>
                <LoginLogo />

                <Description>
                    This app is a Spotify concept using <a href="https://vuejs.org/" target="_blank">VueJS</a> and <a href="https://developer.spotify.com" target="_blank">Spotify's API.</a>
                </Description>

                <Buttons>
                    <SignInButton onClick={() => SignIn()}>Sign in</SignInButton>
                    <SignUpButton 
                        href="https://www.spotify.com/co/signup/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >Sign up</SignUpButton>
                </Buttons>
            </Wrapper>

            <Author>
                Designed on <AuthorLink href="https://www.figma.com" target="_blank">Figma</AuthorLink> and built on <AuthorLink href="https://vuejs.org/" target="_blank">VueJS</AuthorLink> with <AuthorHeart>❤</AuthorHeart> by <AuthorLink href="https://www.leonardofunez.com" title="Leonardo Funez">Leonardo Funez</AuthorLink>
            </Author>
        </Container>
    )
}

export default Login