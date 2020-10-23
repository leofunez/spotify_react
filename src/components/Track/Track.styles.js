import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import { NavLink } from "react-router-dom"
import { ButtonLike } from "../../components/Globals/Globals.styles"
import IconsImage from "../../assets/img/icons/icons.svg"

export const Container = styled.div`
    font-size: 14px;
    font-weight: 500;
    padding: 8px 10px;
    background-color: ${COLORS.dark};
    display: grid;
    grid-template-columns: 30px 25px 2fr 1fr 30px 40px;
    grid-gap: 10px;
    align-items: center;
    color: ${COLORS.white};
    border-radius: 25px;
`;

export const Play = styled.button`
    height: 30px;
    width: 30px;
    padding: 2px;

    &:before {
        content: "";
        background: url(${IconsImage}) no-repeat -39px -33px / 457px;
        height: 25px;
        width: 25px;
        display: block;
    }

    &:hover {
        &:before {
            background-position: -39px -59px;
        }
    }
`;

export const Pause = styled(Play)`
    &:before {
        background-position: -70px -111px;
        background-size: 457px;
    }

    &:hover {
        &:before {
            background-position: -70px -111px;
        }
    }
`;

export const More = styled.div`
    height: 30px;
    width: 25px;
    padding: 4px 2px;
    position: relative;
    cursor: pointer;

    &:before {
        content: "";
        height: 22px;
        width: 22px;
        background: url(${IconsImage}) no-repeat -271px -18px / 300px;
        display: block;
    }

    &:hover {
        &:before {
            background-position: -271px -35px;
        }
    }
`;

export const MoreList = styled.ul`
    position: absolute;
    top: -37px;
    left: 25px;
    margin: 0;
    padding: 5px 0;
    background-color: $dark4;
    min-width: 150px;
    width: max-content;
    z-index: 1;
    display: none;
    border-radius: 4px;
    box-shadow: 0 0 6px $dark;

    ${({isOpen}) => isOpen && `display: block;`}
`;

export const MoreListItem = styled.li`
    list-style: none;
    padding: 8px 20px;
    font-size: 13px;
    width: 100%;
    position: relative;

    &:hover {
        background-color: ${COLORS.dark3};

        .track__more-list {
            display: block;
        }
    }

    ul {
        display: none;
        top: auto;
        bottom: -5px;
        right: calc(-100% + 8px);
        left: auto;
        max-height: 260px;
        overflow-y: auto;
        width: 180px;
    }
`;

export const MoreText = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
`;

export const Name = styled.p`
    font-size: 14px;  
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({isActive}) => isActive && `color: ${COLORS.green};`}
`;

export const Artist = styled(NavLink)`
    color: ${COLORS.white};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        color: ${COLORS.green};
    }
`;

export const Like = styled(ButtonLike)`
    height: 30px;
    width: 30px;
    background: transparent;
    padding: 5px;

    &:before {
        content: "";
        background: url(${IconsImage}) no-repeat -176px -26px / 360px;
        height: 20px;
        width: 20px;
        display: block;
    }

    &:hover {
        opacity: 0.7;
    }

    ${({isActive}) => isActive && `
        &:before {
            background-position: -176px -87px;
        }
    `}
`;

export const Duration = styled.p``;