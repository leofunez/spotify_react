import styled from "styled-components"
import { NavLink } from "react-router-dom"
import IconsImage from "../../../assets/img/icons/icons.svg"

// Helpers
import { COLORS } from "../../../helpers/colors"

// Components
import { BlockTitle } from "../../../components/Globals/Globals.styles"

// Breakpoints
import { breakpoint } from "../../../helpers/breakpoint"

export const TopContent = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
`;

export const Photo = styled.div`
    height: 100px;
    width: 100px;
    border-radius: 20%;
    margin-right: 10px;

    ${({src}) => src && `background: url(${src}) no-repeat center / cover;`}

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

export const Info = styled.div`
    font-size: 14px;
`;

export const Pretitle = styled.span`
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

export const Title = styled.h1`
    font-size: 26px;
    margin: 10px 0;

    ${breakpoint.sm}{
        font-size: 35px;
    }

    ${breakpoint.md}{
        font-size: 50px;
    }
`;

export const Author = styled.div``;

export const AuthorLink = styled(NavLink)`
    color: ${COLORS.green};

    &:hover {
        text-decoration: underline;
    }
`;

export const Albums = styled.div`
    margin-top: 40px;
`;

export const AlbumsTitle = styled(BlockTitle)`
    font-size: 18px;
    margin-bottom: 20px;
`;

export const AlbumsAuthor = styled(NavLink)`
    &:hover {
        color: ${COLORS.green};
        text-decoration: underline;
    }
`;