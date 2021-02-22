import styled from "styled-components"
import { NavLink } from "react-router-dom"
import IconsImage from "../../assets/img/icons/icons.svg"

// Helpers
import { COLORS } from "../../helpers/colors"

// Breakpoints
import { breakpoint } from "../../helpers/breakpoint"

export const Wrapper = styled.div`
    max-width: 1080px;
    margin: 0 auto;

    ${({isFull}) => isFull && `max-width: initial`};
`;

export const PageContainer = styled.div`
    padding-bottom: 30px;
    
    ${breakpoint.sm} {
        padding-bottom: 60px;
    }
`;

export const PageTitle = styled.h1`
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;

    ${breakpoint.xs} {
        font-size: 24px;
        margin-bottom: 40px;
    }
`;

export const BlockTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 20px;
`;

export const Logo = styled.div`
    background: url(${IconsImage}) no-repeat -174px -354px / 1058px;
    width: 132px;
    height: 40px;
    display: block;
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: ${COLORS.green};
    margin: 40px 0;
`;

export const CardList = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;

    ${breakpoint.xs} {
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 30px 10px;
    }

    ${breakpoint.sm} {
        grid-template-columns: repeat(3, 1fr);
    }

    ${breakpoint.xl} {
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 60px 30px;
    }
`;

export const TrackList = styled.div`
    display: grid;
    grid-gap: 8px;
`;

export const ProfileList = styled.div`
    display: grid;
    grid-gap: 20px;
`;

export const Button = styled.button`
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

    ${({isOutlined}) => isOutlined && `
        border: 2px solid ${COLORS.green};
        background-color: transparent;
        color: ${COLORS.green};
    `}

    ${({isDark}) => isDark && `
        background-color: ${COLORS.dark};
        color: ${COLORS.green};
        padding: 12px 6px;

        &:hover {
            color: ${COLORS.white};
        }
    `}

    ${({isRounded}) => isRounded && `
        border-radius: 20px;
        padding: 10px 20px 9px;
    `}

    ${({isText}) => isText && `
        border: 0;
        background-color: transparent;
        color: ${COLORS.green};

        &:hover {
            box-shadow: none;
            opacity: 0.8;
        }
    `}
`;

export const ButtonLink = styled(NavLink)`
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

export const ButtonLike = styled(Button)`
    border-radius: 50%;
    height: 36px;
    width: 36px;
    padding: 0;
    background: url(${IconsImage}) no-repeat -237px -59px / 494px transparent;
    transition: none;

    &:hover {
        opacity: 0.8;
        box-shadow: none;
    }

    ${({isActive}) => isActive && `
        background-position: -237px -115px;
    `}
`;

export const Input = styled.input`
    background-color: #0c1728;
    border: 0;
    border-radius: 10px;
    height: 46px;
    width: 100%;
    padding: 10px 15px;
    color: ${COLORS.white};
    font-size: 12px;
    font-weight: 500;
    border: 1px solid transparent;

    ${({isFilter}) => isFilter && `
        margin-bottom: 20px;
        border-radius: 25px;
    `}

    ${({hasError}) => hasError &&`
        border-color: ${COLORS.green};
    `}

    ${breakpoint.xs} {
        padding: 10px 30px;
        font-size: 14px;
    }
`;

export const TextArea = styled.textarea`
    background-color: #0c1728;
    border: 0;
    border-radius: 10px;
    width: 100%;
    color: ${COLORS.white};
    font-size: 12px;
    font-weight: 500;
    border: 1px solid transparent;
    resize: none;
    height: 200px;
    padding: 20px 15px;

    ${({hasError}) => hasError &&`
        border-color: ${COLORS.green};
    `}

    ${breakpoint.xs} {
        padding: 20px 30px;
        font-size: 14px;
    }
`;

export const InputMessage = styled.span`
    font-size: 12px;
    text-align: left;
    display: none;
    margin-top: 10px;
    padding-left: 5px;
    color: ${COLORS.green};

    ${({isHide}) => isHide && `
        display: block;
    `}
`;

export const FormItem = styled.div`
    margin-bottom: 20px;
`;

export const Slider = styled.input.attrs({ type: "range" })`
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    background: transparent;
    outline: none;
    border-radius: 2px;
    width: 100%;
    cursor: pointer;
    position: relative;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 8px;
        height: 8px;
        background: ${COLORS.white};
        border: 0;
        box-shadow: 0 0 5px ${COLORS.dark};
        border-radius: 50%;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 8px;
        height: 8px;
        background: ${COLORS.white};
        border: 0;
        box-shadow: 0 0 5px ${COLORS.dark};
        border-radius: 50%;
        cursor: pointer;
    }
`;

export const SliderBar = styled.div`
    position: absolute;
    height: 2px;
    width: calc(100% - 33px);
    background-color: ${COLORS.dark};
    right: 0;
    top: calc(50% - 1px);
    border-radius: 2px;
`;