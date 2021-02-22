import styled from "styled-components"
import { COLORS } from "../../helpers/colors"

// Breakpoints
import { breakpoint } from "../../helpers/breakpoint"

export const Container = styled.aside`
    background-color: ${COLORS.dark2};
    grid-column: aside;
    width: 240px;
    padding: 20px;
    display: none;
    justify-content: center;
    align-items: center;
    position: relative;

    &:before {
        content: "";
        height: 100%;
        width: 1px;
        position: absolute;
        left: 0;
        top: 0;
        background-image: linear-gradient(to bottom, transparent, #0c1728, transparent);
    }

    ${breakpoint.lg} {
        display: flex;
    }
`;

export const Signature = styled.div`
    text-align: center;
    font-size: 12px;
    line-height: 1.6;
    max-width: 170px;
`;

export const Link = styled.a`
    color: ${COLORS.green};

    &:hover {
        text-decoration: underline;
    }
`;

export const Heart = styled.span`
    color: red;
`;