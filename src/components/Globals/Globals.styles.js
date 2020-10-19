import styled from "styled-components"

export const Wrapper = styled.div`
    max-width: 1080px;
    margin: 0 auto;

    ${({isFull}) => isFull && `max-width: initial`};
`;

export const PageContainer = styled.div`
    padding-bottom: 60px;
`;

export const PageTitle = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 40px;
`;

export const BlockTitle = styled.h2`
    font-size: 20px;
    margin-bottom: 20px;
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background: $gray;
    margin: 40px 0;
`;

export const CardList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 60px 30px;
`;

export const TrackList = styled.div`
    display: grid;
    grid-gap: 8px;
`;

export const ProfileList = styled.div`
    display: grid;
    grid-gap: 20px;
`;