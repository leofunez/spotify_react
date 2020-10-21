import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import { NavLink } from "react-router-dom"
import { Input } from "../../components/Globals/Globals.styles"
import IconsImage from "../../assets/img/icons/icons.svg"

// Components
import {
    Button,
    LikeButton
} from "../../components/Globals/Globals.styles"

export const Container = styled.section`
    padding: 10px 0 60px;
    position: relative;

    ${({noButtons}) => noButtons && `padding-bottom: 20px;`}
`;

export const Bg = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    box-shadow: inset 0 0 80px 80px ${COLORS.dark2};
`;

export const BgImage = styled(Bg)`
    opacity: 0.6;

    ${({src}) => src && `
        background: url(${src}) no-repeat center / cover;
    `}
`;

export const Info = styled.div`
    position: relative;
    z-index: 1;
`;

export const Pretitle = styled.p`
    font-size: 20px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;

    &:after {
        content: "";
        background: url(${IconsImage}) no-repeat -9px -22px / 340px;
        height: 20px;
        width: 15px;
        display: block;
        margin-left: 10px;
    }
`;

export const Title = styled.h1`
    font-size: 50px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Description = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
`;

export const Owner = styled.div`
    font-size: 14px;
    font-weight: 400;
`;

export const OwnerText = styled.span``;

export const OwnerLink = styled(NavLink)`
    color: ${COLORS.green};
    font-weight: 600;

    &:hover {
        text-decoration: underline;
    }
`;

export const Buttons = styled.div`
    margin-top: 30px;
    display: flex;
`;

export const ButtonPlay = styled(Button)`
    width: 90px;
    margin-right: 10px;
    position: relative;
    padding-left: 34px;
    text-align: left;

    &:before {
        content: "";
        position: absolute;
        background: url(${IconsImage}) no-repeat -68px -21px / 657px;
        height: 14px;
        width: 14px;
        left: 15px;
        top: 11px;
    }

    ${({isActive}) => isActive && `
        &:before {
            background: url(${IconsImage}) no-repeat -111px -58px / 657px;
        }
    `}
`;

export const ButtonLike = styled(Button)``;