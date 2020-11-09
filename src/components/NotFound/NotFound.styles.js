import styled from "styled-components"
import { COLORS } from "../../helpers/colors"
import { NavLink } from "react-router-dom"

export const Container = styled.div`
    display: grid;
`;

export const Title = styled.h1`
    font-size: 45px;
    margin: 0 0 10px 0;
`;

export const Description = styled.p`
    margin-bottom: 20px;
`;

export const LinkButton = styled(NavLink)`
    background: ${COLORS.green};
    color: ${COLORS.dark};
    border: 0;
    padding: 12px 20px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 2px;
    border: 0;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    max-width: max-content;
`;