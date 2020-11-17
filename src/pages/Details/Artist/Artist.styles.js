import styled from "styled-components"
import { NavLink } from "react-router-dom"

// Helpers
import { COLORS } from "../../../helpers/colors"

// Breakpoints
import { breakpoint } from "../../../helpers/breakpoint"

export const TopContent = styled.section`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 40px;
    margin-bottom: 60px;

    ${({isFullWidth}) => isFullWidth && `
        grid-template-columns: 1fr;
    `}

    ${breakpoint.sm}{
        grid-template-columns: 1fr 250px;
    }
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
    grid-gap: 4px 10px;
    grid-template-columns:
        [photo-start] 80px
        [content-start] 1fr;

    grid-template-rows:
        [date-start] 1fr
        [content-start] max-content
        [content-end] 1fr;
    
    ${breakpoint.sm}{
        grid-template-columns:
            [photo-start] 100px
            [content-start] 1fr;
            
        grid-gap: 4px 20px;
    }
`;

export const AlbumPhoto = styled(NavLink)`
    grid-row: date-start / -1;
    grid-column: photo-start;
    height: 80px;
    width: 80px;
    border-radius: 30%;
    cursor: pointer;

    ${({src}) => src && `
        background: url(${src}) no-repeat center / cover;
    `}

    ${breakpoint.sm}{
        height: 100px;
        width: 100px;
    }
`;

export const AlbumDate = styled.time`
    align-self: end;
    font-size: 12px;
    color: ${COLORS.gray};
`;

export const AlbumTitle = styled(NavLink)`
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${breakpoint.sm}{
        font-size: 22px;
    }
`;

export const AlbumTracks = styled.div`
    align-self: start;
    font-size: 14px;
    color: ${COLORS.green};
`;