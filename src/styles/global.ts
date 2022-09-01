import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: 0;
        box-shadow: 0 0 0 2px ${(props) => props.theme['yellow-500']};
    }

    body {
        margin: auto;

        background: #F9F5EB;
        color: ${(props) => props.theme['gray-600']};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }

    h1, h2, h3 {
        color: ${props => props.theme['gray-600']};
    }
`;
