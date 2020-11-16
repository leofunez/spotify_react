import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import IconsImage from "../../assets/img/icons/icons.svg"
import LoginBg from "../../assets/img/bg/login.jpg"
import { Button, ButtonLink, Logo } from "../../components/Globals/Globals.styles"

export const Container = styled.div`
    background: ${COLORS.dark};
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(${LoginBg}) no-repeat center / cover;
        opacity: 0.1;
        filter: contrast(200%);
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${COLORS.dark};
    height: 420px;
    width: 420px;
    color: ${COLORS.white};
    z-index: 1;
    position: relative;
    overflow: hidden;
`;

export const LoginLogo = styled(Logo)`
    width: 182px;
    height: 60px;
    background-position: -232px -484px;
    background-size: 1460px;
`;

export const Description = styled.p`
    margin: 10px 0 30px;
    text-align: center;
    max-width: 80%;
    line-height: 1.6;

    a {
        &:hover {
            color: ${COLORS.green};
        }
    }
`;

export const Buttons = styled.div`
    display: flex;
`;

export const SignInButton = styled(Button)`
    margin: 0 10px;
`;

export const SignUpButton = styled.a`
    background: ${COLORS.green};
    color: ${COLORS.dark};
    border: 0;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 2px;
    border: 0;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
`;

export const Author = styled.div`
    position: absolute;
    bottom: 0;
    font-size: 13px;
    padding: 20px;
`;

export const AuthorLink = styled.a`
    text-decoration: underline;

    &:hover {
        color: ${COLORS.green};
    }
`;

export const AuthorHeart = styled.span`
    color: ${COLORS.green};
`;