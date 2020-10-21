import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import IconsImage from "../../assets/img/icons/icons.svg"

export const Wrapper = styled.div`
    max-width: 1080px;
    margin: 0 auto;

    ${({isFull}) => isFull && `max-width: initial`};
`;

export const PageContainer = styled.div`
    padding-bottom: 60px;
`;

export const PageTitle = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 40px;
`;

export const BlockTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 20px;
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: $gray;
    margin: 40px 0;
`;

export const CardList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 60px 30px;
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
    color: $dark;
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
    padding: 10px 30px;
    color: ${COLORS.white};
    font-size: 14px;
    font-weight: 500;
    border: 1px solid transparent;
`;