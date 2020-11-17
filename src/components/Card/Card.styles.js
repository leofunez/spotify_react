import styled from "styled-components"
import { NavLink } from "react-router-dom"

// Helpers
import { COLORS } from "../../helpers/colors"

// Breakpoints
import { breakpoint } from "../../helpers/breakpoint"

export const Container = styled.article``;

export const Link = styled(NavLink)`
    display: grid;
    grid-gap: 2px 20px;
    grid-template-columns:
        [column-image] 40%
        [column-info] 1fr;
    grid-template-rows: 
        [row-title] 1fr
        [row-subtitle] 1fr;
    
    ${breakpoint.xs} {
        display: block;
    }
`;

export const Image = styled.div`
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    border-radius: 10px;
    cursor: pointer;
    grid-row: row-title / span 2;

    ${({src}) => src && `
        background: url(${src}) no-repeat center / cover;
    `}

    ${({isEmpty}) => isEmpty && `
        background-color: ${COLORS.dark2};
        display: grid;
        justify-content: center;
        align-content: center;
    `}

    ${breakpoint.xs} {
        height: 250px;
        padding-bottom: 0;
        margin-bottom: 10px;
    }
`;

export const ImageText = styled.p`
    font-size: 14px;
    color: ${COLORS.dark3};
    text-transform: uppercase;
    font-weight: 800;
`;

export const Title = styled.h2`
    font-size: 16px;
    margin-bottom: 5px;
    cursor: pointer;
    grid-column:column-info;
    grid-row: row-title;
    align-self: end;
`;

export const Subtitle = styled.h3`
    font-size: 13px;
    color: #586782;
    grid-column:column-info;
    grid-row: row-subtitle;

    ${breakpoint.xs} {

    }
`;