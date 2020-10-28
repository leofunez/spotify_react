import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import { NavLink } from "react-router-dom"
import IconsImage from "../../assets/img/icons/icons.svg"

export const Container = styled.section`
    grid-column: menu-start / span 2;
    background-color: ${COLORS.green};
    background-image: ${COLORS.greenGradient};
    box-shadow: inset 0 7px 18px -7px rgba(${COLORS.dark}, $alpha: 1.0);
    display: grid;
    grid-template-columns: 1fr 300px 1fr;
    color: ${COLORS.dark};
    padding: 0 30px;
    position: relative;
`;

export const ProgressBar = styled.div`
    position: absolute;
    height: 2px;
    width: 50%;
    top: 0;
    left: 0;
    background: ${COLORS.green3};
`;

export const Track = styled.div`
    display: flex;
    align-items: center;
`;

export const Photo = styled.div`
    background-color: rgba(${COLORS.white}, $alpha: 0.7);
    height: 55px;
    width: 55px;
    border-radius: 30%;
    margin-right: 10px;

    ${({src}) => src && `background: url(${src}) no-repeat center / cover;`}
`;

export const Info = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SongName = styled.p`
    font-size: 14px;
`;

export const ArtistName = styled(NavLink)`
    font-size: 12px;
    font-weight: 500;
    color: ${COLORS.dark};
`;

export const Controls = styled.div`
    display: flex;
    justify-self: center;
    align-self: center;
`;

export const Control = styled.button`
    height: 40px;
    width: 40px;
    margin: 0 10px;
    border-radius: 6px;
    position: relative;

    ${({noPadding}) => noPadding ? `padding: 0;` : `padding: 10px;`}

    &:before {
        content: "";
        display: block;

        ${({posX}) => posX && `background-position-x: ${posX}px;`}
        ${({posY}) => posY && `background-position-y: ${posY}px;`}
        ${({size}) => size && `background-size: ${size}px;`}

        background-image: url(${IconsImage});
        background-repeat: no-repeat;

        ${({noPadding}) => noPadding ? `
            height: 40px;
            width: 40px;
        ` : `
            height: 20px;
            width: 20px;
        `}
    }

    &:hover {
        background-color: rgba(${COLORS.white}, $alpha: 0.3);
    }
`;

export const Volume = styled.div``;