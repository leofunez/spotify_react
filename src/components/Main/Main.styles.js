import styled from "styled-components"

// Helpers
import { COLORS } from "../../helpers/colors"

// Components
import { Wrapper } from "../Globals/Globals.styles"

// Breakpoints
import { breakpoint } from "../../helpers/breakpoint"

export const Main = styled.main`
    font-family: Roboto, "Libre Franklin", Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${COLORS.white};
    display: grid;

    font-weight: 500;
    background-color: ${COLORS.dark};
    min-height: 100vh;

    ${({isNotLogin}) => isNotLogin && `
        grid-template-columns:
        [content-start] 1fr;
        
        grid-template-rows: 
        [header-start] 60px
        [content-start] 1fr
        [player-start] 120px;

        ${breakpoint.xs} {
            grid-template-rows: 
            [header-start] 80px
            [content-start] 1fr
            [player-start] 120px;
        }

        ${breakpoint.sm} {
            grid-template-rows: 
            [header-start] 80px
            [content-start] 1fr
            [player-start] 80px;
        }

        ${breakpoint.md} {
            grid-template-columns:
            [menu-start] 200px
            [content-start] 1fr;

            grid-template-rows: 
            [content-start] 1fr
            [player-start] 80px;

            min-height: 100vh;
        }

        ${breakpoint.lg} {
            grid-template-columns:
            [menu-start] 240px
            [content-start] 1fr;
        }
    `}
`;

export const MainContent = styled.div`
    ${({isNotLogin}) => isNotLogin && `
        padding: 20px 10px 40px;
        overflow: auto;
        max-height: calc(100vh - 180px);
        background-color: ${COLORS.dark2};
        position: relative;
        grid-row: content-start;

        ${breakpoint.xs} {
            max-height: calc(100vh - 200px);
        }

        ${breakpoint.sm} {
            max-height: calc(100vh - 160px);
        }
        
        ${breakpoint.md} {
            max-height: calc(100vh - 80px);
            padding: 40px 10px;
            grid-column: content-start;
        }
    `}

    ${({isLoading}) => isLoading && `
        overflow: hidden;
    `}
`;

export const MainWrapper = styled(Wrapper)``;