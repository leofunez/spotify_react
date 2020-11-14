import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import IconsImage from "../../assets/img/icons/icons.svg"

export const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background: ${COLORS.dark + 'D4'};
    z-index: 999;
    left: 0;
    top: 0;
    display: grid;
    justify-content: center;
    align-content: center;
`;

export const Content = styled.div`
    background: ${COLORS.dark4};
    width: calc(100vw - 40px);
    max-width: 480px;
    border-radius: 4px;
    overflow: hidden;
`;

export const Header = styled.header`
    background: ${COLORS.greenGradient};
    display: grid;
    grid-template-columns: 1fr 40px;
`;

export const Title = styled.h2`
    font-size: 15px;
    font-weight: 500;
    align-self: center;
    margin: 0;
    padding-left: 15px;
    color: ${COLORS.dark};

    span {
        font-weight: 700;
    }
`;

export const Close = styled.button`
    height: 40px;
    width: 40px;
    padding: 10px;

    &:after {
        content: "";
        width: 20px;
        height: 20px;
        background: url(${IconsImage}) no-repeat -322px -165px / 494px;
        display: block;
    }

    &:hover {
        opacity: 0.8;
    }
`;

export const Body = styled.div`
    padding: 30px 20px;
    text-align: center;
`;

export const Footer = styled.footer`
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
`;