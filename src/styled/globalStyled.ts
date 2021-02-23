import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        line-height: 1.5;
        color: #FFF;
        font-family: sans-serif;
        background-color: #212529;
    }

    button {
        border: none;
        font-family: sans-serif;
        padding: 0;
        color: inherit;
        background-color: transparent;
    }
`;
