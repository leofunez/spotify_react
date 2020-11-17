import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import loaderSVG from "../../assets/img/loaders/green.svg"

// Breakpoints
import { breakpoint } from "../../helpers/breakpoint"

export const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${loaderSVG}) no-repeat center / 70px ${COLORS.dark};
    z-index: 2;

    ${breakpoint.md} {
        background-position: calc(50% - 100px) center;
    }

    ${breakpoint.lg} {
        background-position: calc(50% - 110px) center;
    }
`;