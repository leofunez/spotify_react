import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import { NavLink } from "react-router-dom"

export const Container = styled(NavLink)`
    display: flex;
    align-items: center;

    &:hover {
        h2 {
            color: ${COLORS.green}
        }
    }

    ${({padding}) => padding && `
        padding: ${padding};
    `}
`;

export const Avatar = styled.div`
    height: 40px;
    width: 40px;
    min-width: 40px;
    border-radius: 30%;
    margin-right: 10px;
    background-color: ${COLORS.dark};

    ${({src}) => src && `
        background : url(${src}) no-repeat center top / cover;
    `}

    ${({isSmall}) => isSmall && `
        height: 30px;
        width: 30px;
        min-width: 30px;
    `}
`;

export const Title = styled.h2`
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({isSmall}) => isSmall && `
        font-size: 12px;
    `}
`;