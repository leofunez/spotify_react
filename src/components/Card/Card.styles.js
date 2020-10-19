import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { COLORS } from "../../helpers/colors"

export const Container = styled.article``;

export const Image = styled.div`
    height: 250px;
    width: 100%;
    margin-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;

    ${({src}) => src && `
        background: url(${src}) no-repeat center / cover;
    `}

    ${({isEmpty}) => isEmpty && `
        background-color: ${COLORS.dark2};
        display: grid;
        justify-content: center;
        align-content: center;
    `}
`;

export const ImageText = styled.p`
    font-size: 14px;
    color: ${COLORS.dark3};
    text-transform: uppercase;
    font-weight: 800;
`;

export const Title = styled.h2`
    font-size: 16px;
    margin-bottom: 5px;
    cursor: pointer;
`;

export const Subtitle = styled.h3`
    font-size: 13px;
    color: #586782;
`;