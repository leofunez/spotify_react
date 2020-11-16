import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import { Wrapper } from "../Globals/Globals.styles"

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
        [menu-start] 240px
        [content-start] 1fr;
        
        grid-template-rows: 
        [content-start] 1fr
        [player-start] 80px;
    `}
`;

export const MainContent = styled.div`
    ${({isNotLogin}) => isNotLogin && `
        padding: 40px 10px;
        overflow: auto;
        max-height: calc(100vh - 80px);
        background-color: ${COLORS.dark2};
        position: relative;
    `}
`;

export const MainWrapper = styled(Wrapper)``;