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
    width: 100%;
    position: relative;
    overflow: initial;
    z-index: 2;

    ${({hasScroll}) => {
        if (hasScroll) {
            return `
                ${breakpoint.md} {
                    overflow: hidden;
                    padding-bottom: 0;
                }
            `
        }
    }}

    ${breakpoint.md} {
        z-index: 1;
        position: initial;
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

    ${({showInDesktop}) => showInDesktop && `
        display: none;
    `}

    ${breakpoint.xs} {
        font-size: 12px;
    }

    ${breakpoint.md} {
        padding-left: 35px;
        margin-bottom: 10px;
        display: block;

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

export const MenuItems = styled.div`
    display: none;
    position: absolute;
    border-radius: 4px;
    z-index: 1;
    box-shadow: 0 0 9px #050e1e;
    
    ${({isOpen}) => isOpen && `
        display: grid;
        background: ${COLORS.dark1};
        text-align: left;
        padding: 10px;
        max-height: 300px;
        overflow: scroll;
        top: 60px;
        width: 200px;
        left: calc(50% - 100px);
    `}

    ${({showInMobile}) => showInMobile && `
        display: grid;
        text-transform: uppercase;
        font-size: 12px;
        position: initial;
    `}

    ${({isRelative}) => isRelative && `
        position: relative;
    `}
    
    ${breakpoint.md} {
        box-shadow: none;
        overflow: initial;
        position: initial;
        display: grid;
        border-radius: 0;
        width: auto;
        background: transparent;
    }
`;

export const MenuItem = styled(NavLink)`
    padding: 10px;
    height: 35px;
    color: ${COLORS.white};
    transition: color .2s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    font-size: 12px;

    &.active {
        color: ${COLORS.green}
    }

    ${breakpoint.md} {
        font-size: 14px;
        padding: 10px 0 10px 35px;
    }
`;

export const Icon = styled.i`
    display: none;
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

    ${breakpoint.md} {
        display: block;
    }
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