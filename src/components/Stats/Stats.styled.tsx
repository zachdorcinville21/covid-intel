import styled from 'styled-components';
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/theme/index';

interface StatsContainerProps {
    children: React.ReactNode,
}

export const StateSelect = styled.select`
    padding: 5px 10px;
    background-color: #ffffff;
    border: none;
    color: #000000;
    border-radius: 3px;
    transition: ease 0.2s;
    font-family: Nunito;

    &:focus {
        outline: none;
        box-shadow: 0px 0px 10px #000000;
    }

    @media (max-width: 520px) {
        position: relative;
        top: 25px;
    }
`;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-image: ${props => props.color};
    display: flex;
    flex-direction: column;
    gap: 18%;
    justify-content: center;
    align-items: center;

    @media (max-width: 520px) {
        gap: 15%;
    }
`;

const StatsContainer = ({ children }: StatsContainerProps) => {
    const theme = useContext(ThemeContext);
    return (
        <Container color={theme.statsBackground}>
            {children}
        </Container>
    )
}

export default StatsContainer;
