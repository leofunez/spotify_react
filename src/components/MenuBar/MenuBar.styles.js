import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import { NavLink } from "react-router-dom"
import IconsImage from "../../assets/img/icons/icons.svg"
import { Logo } from "../Globals/Globals.styles"

// Breakpoints
import { breakpoint } from "../../helpers/breakpoint"

export const Container = styled.section`
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 40px repeat(4, 1fr);
    align-content: center;
    text-align: center;
    padding: 10px;
    width: 100%;

    ${breakpoint.xs} {
        padding: 20px 10px;
        grid-gap: 20px;
    }

    ${breakpoint.sm} {
        grid-template-columns: 125px repeat(3, 1fr) 120px;
    }

    ${breakpoint.md} {
        grid-template-rows: 40px 55px 160px 1fr 35px;
        grid-template-columns: 1fr;
        grid-gap: 40px;
        align-content: flex-start;
        text-align: left;
        padding: 0;
        width: 200px;
        max-height: calc(100vh - 80px);
        padding: 40px 10px 40px 20px;
    }

    ${breakpoint.lg} {
        width: 240px;
        padding-left: 30px;
    }
`;

export const Group = styled.div `
    display: grid;
    font-size: 14px;
    align-content: center;

    ${({hasScroll}) => {
        if (hasScroll) {
            return `
                overflow: hidden;
                padding-bottom: 0;
            `
        }
    }}

    ${breakpoint.md} {
        align-content: start;
    }
`;

export const GroupScroll = styled.div`
    overflow-y: auto;
    height: 100%;
`;

export const GroupTitle = styled.h2 `
    text-transform: uppercase;
    font-size: 10px;
    position: relative;

    ${breakpoint.xs} {
        font-size: 12px;
    }

    ${breakpoint.md} {
        padding-left: 35px;
        margin-bottom: 10px;

        &:before {
            content: "";
            height: 2px;
            background-color: ${COLORS.gray};
            opacity: 0.4;
            width: 30px;
            position: absolute;
            left: 0;
            top: 6px;
        }
    }
`;

export const MenuItem = styled(NavLink)`
    padding: 10px 0 10px 35px;
    height: 35px;
    color: ${COLORS.white};
    transition: color .2s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    display: none;

    &.active {
        color: ${COLORS.green}
    }

    ${breakpoint.md} {
        display: block;
    }
`;

export const Icon = styled.i`
    display: block;
    height: 20px;
    width: 20px;
    position: absolute;
    left: 0;
    top: 7px;

    background-image: url(${IconsImage});
    background-repeat: no-repeat;
    background-size: ${({size}) => size && `${size}px`};
    background-position-x: ${({posX}) => posX && `${posX}px`};
    background-position-y: ${({posY}) => posY && `${posY}px`};
`;

export const StyledLogo = styled(Logo)`
    width: 40px;

    ${breakpoint.sm} {
        width: 125px;
    }
    
    ${breakpoint.md} {
        width: 132px;
    }
`;

export const Add = styled.button`
    font-size: 12px;
    font-weight: 600;
    text-align: center;
    position: relative;
    padding: 10px 0;
    color: ${COLORS.green};

    i {
        height: 16px;
        width: 16px;
        top: 13px;
        display: none;
    }

    ${breakpoint.xs} {
        font-size: 14px;
    }

    ${breakpoint.sm} {
        text-align: left;
        padding-left: 25px;

        i {
            display: block;
        }
    }

    ${breakpoint.md} {
        padding-left: 35px;

        i {
            top: 10px;
        }
    }
`;