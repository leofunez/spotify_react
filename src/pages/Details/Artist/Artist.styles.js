import styled from "styled-components"
// import { COLORS } from "../../helpers/colors"
import { NavLink } from "react-router-dom"

export const TopContent = styled.section`
    display: grid;
    grid-template-columns: 1fr 250px;
    grid-gap: 40px;
    margin-bottom: 60px;

    ${({isFullWidth}) => isFullWidth && `
        grid-template-columns: 1fr;
    `}
`;

export const TopPopular = styled.div``;

export const TopRelated = styled.div``;

export const AlbumList = styled.section``;