import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import { NavLink } from "react-router-dom"
import IconsImage from "../../assets/img/icons/icons.svg"

export const Container = styled.section`
    display: grid;
    grid-template-rows: 40px 90px 160px 1fr 35px;
    grid-gap: 40px;
    width: 240px;
    max-height: calc(100vh - 80px);
    padding: 40px 10px 40px 30px;
`;

export const Group = styled.div `
    display: grid;
    font-size: 14px;
    align-content: start;

    ${({hasScroll}) => {
        if (hasScroll) {
            return `
                overflow: hidden;
                padding-bottom: 25px;
            `
        }
    }}
`;

export const GroupScroll = styled.div`
    overflow-y: auto;
    height: 100%;
`;

export const GroupTitle = styled.h2 `
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 10px;
    padding-left: 35px;
    position: relative;

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
    display: block;

    &.active {
        color: ${COLORS.green}
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

export const Add = styled.button`
    font-size: 14px;
    font-weight: 600;
    text-align: left;
    position: relative;
    padding: 10px 0 10px 35px;
    color: ${COLORS.green};

    i {
        height: 16px;
        width: 16px;
        top: 10px;
    }
`;