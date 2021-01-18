import styled from 'styled-components';


export const CityInput = styled.input`
    border: none;
    outline: none;
    border-radius: 3px;
    background-color: #ffffff;
    padding: 6px 10px;
    transition: ease 0.2;
    font-family: Nunito;

    @media (max-width: 520px) {
        font-size: 16px;
    }
`;

export const StateSelectGT = styled.select`
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
        font-size: 16px;
    }
`;


