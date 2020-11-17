import styled from "styled-components"
import { NavLink } from "react-router-dom"
import AvatarIcon from "../../assets/img/icons/profile_green.svg"

// Helpers
import { COLORS } from "../../helpers/colors"

// Components
import { Wrapper, Input } from "../../components/Globals/Globals.styles"

// Breakpoints
import { breakpoint } from "../../helpers/breakpoint"

export const Container = styled.section`
    margin-bottom: 40px;
    position: relative;
`;

export const ContainerWrapper = styled(Wrapper)`
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;

    ${breakpoint.xs} {
        grid-template-columns: 1fr minmax(145px, auto);
        grid-gap: 20px;
    }
`;

export const Search = styled.div`
    ${breakpoint.md} {
        width: 60%;
    }
`;

export const SearchInput = styled(Input)``;

export const SearchResult = styled.div`
    background-color: ${COLORS.dark2};
    border: 2px solid rgba($gray, 0.25);
    color: ${COLORS.white};
    width: max-content;
    border-radius: 4px;
    max-height: 230px;
    overflow: hidden;
    position: absolute;
    box-shadow: 4px 4px 8px rgba(${COLORS.dark}, 0.2);
    z-index: 5;
    display: none;

    ${({isActive}) => isActive && `
        display: flex;
    `}
`;

export const SearchResultList = styled.div`
    width: 200px;
`;

export const SearchResultTitle = styled.h2`
    font-size: 14px;
    padding: 10px;
`;

export const SearchResultItems = styled.div`
    overflow-y: scroll;
    height: 100%;
`;

export const User = styled(NavLink)`
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
`;

export const UserName = styled.span`
    display: none;

    ${breakpoint.xs} {
        display: block;
    }
`;

export const Avatar = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 30%;
    filter: contrast(130%);
    cursor: pointer;
    
    ${({src}) => src && `
        background: url(${src}) no-repeat center / cover;
    `}

    ${({isEmpty}) => {
        if (isEmpty) {
            return `
                background: url(${AvatarIcon}) no-repeat center / 22px;
            `
        } 
    }}

    ${breakpoint.xs} {
        margin-left: 10px;
    }
`;