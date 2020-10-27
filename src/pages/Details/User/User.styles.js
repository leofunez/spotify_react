import styled from "styled-components"
import { COLORS } from "../../../helpers/colors"
import { NavLink } from "react-router-dom"
import IconsImage from "../../../assets/img/icons/icons.svg"

export const UserTop = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
`;

export const UserPhoto = styled.div`
    height: 150px;
    width: 150px;
    border-radius: 20%;
    margin-right: 20px;
    filter: contrast(130%);

    ${({src}) => src && `
        background: url(${src}) no-repeat center / cover;
    `}
`;

export const UserInfo = styled.div`
    font-size: 14px;
`;

export const UserPretitle = styled.span`
    font-size: 20px;
    position: relative;
    display: flex;
    align-items: center;

    &:after {
        content: "";
        height: 20px;
        width: 15px;
        display: block;
        margin-left: 10px;
        background: url(${IconsImage}) no-repeat -9px -22px / 340px;
    }
`;

export const UserName = styled.h1`
    font-size: 45px;
    margin: 10px 0;
`;

export const UserFollowers = styled.p``;