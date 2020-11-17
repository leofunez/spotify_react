import styled from "styled-components"
import IconsImage from "../../../assets/img/icons/icons.svg"

// Breakpoints
import { breakpoint } from "../../../helpers/breakpoint"

export const UserTop = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
`;

export const UserPhoto = styled.div`
    height: 100px;
    width: 100px;
    border-radius: 20%;
    margin-right: 10px;
    filter: contrast(130%);

    ${({src}) => src && `
        background: url(${src}) no-repeat center / cover;
    `}

    ${breakpoint.xs}{
        height: 120px;
        width: 120px;
        margin-right: 20px;
    }

    ${breakpoint.sm}{
        height: 150px;
        width: 150px;
    }
`;

export const UserInfo = styled.div`
    font-size: 14px;
`;

export const UserPretitle = styled.span`
    font-size: 16px;
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

    ${breakpoint.sm}{
        font-size: 20px;
    }
`;

export const UserName = styled.h1`
    font-size: 18px;
    margin: 5px 0 10px;

    ${breakpoint.xxs}{
        font-size: 22px;
    }

    ${breakpoint.xs}{
        font-size: 35px;
    }

    ${breakpoint.sm}{
        font-size: 45px;
        margin: 10px 0;
    }
`;

export const UserFollowers = styled.p``;