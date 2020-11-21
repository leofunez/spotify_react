import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import { NavLink } from "react-router-dom"
import IconsImage from "../../assets/img/icons/icons.svg"
import { Slider, SliderBar } from "../Globals/Globals.styles"

// Breakpoints
import { breakpoint } from "../../helpers/breakpoint"

export const Container = styled.section`
    grid-column: content-start / span 2;
    grid-row: player-start;
    display: grid;
    grid-template-rows: 
        [player-top] 50px 
        [player-bottom] 50px;
    grid-template-columns:
        [player-left] 1fr
        [player-right] 40%;
    
    background-color: ${COLORS.green};
    background-image: ${COLORS.greenGradient};
    box-shadow: inset 0 7px 18px -7px rgba(0, 0, 0, .8);
    color: ${COLORS.dark};
    padding: 10px;
    position: relative;

    ${breakpoint.sm} {
        grid-template-rows: 1fr;
        grid-template-columns: 
            [player-left] 1fr 
            [player-center] 300px 
            [player-right] 1fr;
        padding: 0 30px;
    }

    ${breakpoint.md} {
        grid-column: menu-start / span 2;
    }
`;

export const ProgressBar = styled.div`
    position: absolute;
    height: 2px;
    width: 50%;
    top: 0;
    left: 0;
    background: ${COLORS.green3};

    ${({widthBar}) => widthBar && `width: ${widthBar}%;`}
`;

export const Track = styled.div`
    display: flex;
    align-items: center;
    grid-row: player-top;
    grid-column: player-left;

    ${breakpoint.sm} {
        grid-column: player-left;
        grid-row: 1;
    }
`;

export const Photo = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 30%;
    margin-right: 10px;

    ${({src}) => src && `background: url(${src}) no-repeat center / cover ${COLORS.white};`}

    ${breakpoint.sm} {
        height: 55px;
        width: 55px;
    }
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

    &:hover {
        text-decoration: underline;
    }
`;

export const Controls = styled.div`
    display: flex;
    justify-self: center;
    align-self: center;

    grid-row: player-bottom;
    grid-column: player-left / span 2;

    ${breakpoint.sm} {
        grid-column: player-center;
        grid-row: 1;
    }
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

    &:after {
        height: 4px;
        width: 4px;
        position: absolute;
        border-radius: 50%;
        background-color: ${COLORS.dark};
    }
    
    ${({isShuffle}) => isShuffle && `
        &:after {
            content: "";
            top: 14px;
            right: 7px;
        }
    `}

    ${({isRepeat}) => isRepeat && `
        &:after {
            content: "";
            top: 14px;
            right: 7px;
        }
    `}

    &:hover {
        background-color: rgba(${COLORS.white}, $alpha: 0.3);
    }
`;

export const Volume = styled.div`
    width: 100%;
    max-width: 175px;
    display: flex;
    align-items: center;
    justify-self: end;
    position: relative;

    grid-row: player-top;
    grid-column: player-right;

    ${breakpoint.sm} {
        grid-column: player-right;
        grid-row: 1;
    }
`;

export const VolumeButton = styled.div`
    background: url(${IconsImage}) no-repeat -292px -184px / 560px;
    ${({isMuted}) => isMuted && `background-position: -171px -184px;`}
    ${({isLow})   => isLow   && `background-position: -211px -184px;`}
    ${({isMid})   => isMid   && `background-position: -252px -184px;`}
    ${({isHigh})  => isHigh  && `background-position: -292px -184px;`}
    
    height: 30px;
    width: 32px;
    cursor: pointer;
    margin-right: 5px;
`;

export const VolumeSlider = styled(Slider)`
    width: 142px;
`;

export const VolumeSliderBar = styled(SliderBar)``;