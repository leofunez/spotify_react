import styled from "styled-components"
import IconsImage from "../../assets/img/icons/icons.svg"

// Helpers
import { COLORS } from "../../helpers/colors"

// Breakpoints
import { breakpoint } from "../../helpers/breakpoint"

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
    align-content: flex-start;
    padding-top: 20px;

    ${breakpoint.sm} {
        align-content: center;
        padding-top: 0;
    }
`;

export const Content = styled.div`
    background: ${COLORS.dark4};
    width: calc(100vw - 40px);
    max-width: 640px;
    border-radius: 4px;
    overflow: hidden;
`;

export const Header = styled.header`
    background: ${COLORS.greenGradient};
    display: grid;
    grid-template-columns: 1fr 40px;
    text-align: left;
`;

export const Title = styled.h2`
    font-size: 12px;
    font-weight: 500;
    align-self: center;
    margin: 0;
    padding-left: 25px;
    color: ${COLORS.dark};

    span {
        font-weight: 700;
    }

    ${breakpoint.xs} {
        font-size: 15px;
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
    padding: 30px 20px 10px 20px;
    text-align: center;
`;

export const Footer = styled.footer`
    display: flex;
    justify-content: center;
    padding-bottom: 10px;
`;