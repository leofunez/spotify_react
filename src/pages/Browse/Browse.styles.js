import styled from "styled-components"
import { COLORS } from "../../helpers/colors"

export const Tabs = styled.div``;

export const TabsButtons = styled.div`
    display: flex;
    margin-bottom: 40px;
`;

export const TabButton = styled.div`
    position: relative;
    cursor: pointer;
    padding: 0px 0 14px;

    &:after {
        content: "";
        position: absolute;
        width: 0;
        height: 1px;
        background: ${COLORS.green};
        bottom: 0;
        left: 0;
        box-shadow: 0 0 8px ${COLORS.green};
        transition: width .2s ease-in-out;
    }

    &:not(:last-of-type) {
        margin-right: 20px;
    }

    &:hover {
        &:after {
            width: 10px;
        }
    }

    ${({isActive}) => isActive && `
        &:after {
            width: 40px;
        }
    `}
`;

export const TabsContent = styled.div``;

export const TabBody = styled.div`
    ${({isActive}) => !isActive && `display: none`}
`;