import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { COLORS } from "../../helpers/colors"
import { Wrapper, Input } from "../../components/Globals/Globals.styles"
import AvatarIcon from "../../assets/img/icons/profile_green.svg"

export const Container = styled.section`
    margin-bottom: 40px;
    position: relative;
`;

export const ContainerWrapper = styled(Wrapper)`
    display: grid;
    grid-template-columns: 1fr minmax(145px, auto);
    grid-gap: 20px;
`;

export const Search = styled.div`
    width: 60%;
`;

export const SearchInput = styled(Input)``;

export const User = styled(NavLink)`
    display: flex;
    align-items: center;
    font-size: 13px;
    font-weight: 600;
`;

export const UserName = styled.span``;

export const Avatar = styled.div`
    height: 40px;
    width: 40px;
    border-radius: 30%;
    margin-left: 10px;
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
`;