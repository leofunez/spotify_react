import styled from "styled-components"
import { COLORS } from "../../../helpers/colors"
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

export const Album = styled.div`
    &:not(:last-of-type) {
        margin-bottom: 40px;
        border-bottom: 3px solid ${COLORS.dark};
        padding-bottom: 40px;
    }
`;

export const AlbumTop = styled.div`
    margin-bottom: 20px;
    display: grid;
    align-items: center;
    grid-gap: 4px 20px;
    grid-template-columns:
        [photo-start] 100px
        [content-start] 1fr;

    grid-template-rows:
        [date-start] 1fr
        [content-start] max-content
        [content-end] 1fr;
`;

export const AlbumPhoto = styled(NavLink)`
    grid-row: date-start / -1;
    height: 100px;
    border-radius: 30%;
    cursor: pointer;

    ${({src}) => src && `
        background: url(${src}) no-repeat center / cover
    `}
`;

export const AlbumDate = styled.time`
    align-self: end;
    font-size: 12px;
    color: ${COLORS.gray};
`;

export const AlbumTitle = styled(NavLink)`
    font-size: 22px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const AlbumTracks = styled.div`
    align-self: start;
    font-size: 14px;
    color: ${COLORS.green};
`;