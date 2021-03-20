import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 62.5%;
    }

    h2 {
        font-size: 1.4rem;
    }

    a {
        color: ${(props) => props.theme.highlight};
        
        &:visited {
            color: ${(props) => props.theme.highlight};
        }
    }

    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 1.6rem;
        background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.bodyText};
    }

    button {
        border: none;
        background-color: ${(props) => props.theme.primaryColor};
        color: ${(props) => props.theme.primaryText};
        cursor: pointer;

        &[aria-disabled="true"] {
            cursor: not-allowed;
        }
    }

    input[type="text"], select {
        border: .1rem solid ${(props) => props.theme.outline};
    }

    ul {
        padding-left: 0;
        padding-right: 0;
    }

    dt, dd {
        display: block;
        margin: 0;
    }

    dt {
        font-weight: bold;
    }

    dd {
        margin-bottom: 1rem;
    }

    details {
        cursor: pointer; 
        padding: 1rem;
        background-color: ${(props) => props.theme.highlightBg};
    }

    &:focus {
        outline: .1rem solid ${(props) => props.theme.highlight};
    }

    .page-header {
        background-color: ${(props) => props.theme.primaryColor};
        color: ${(props) => props.theme.primaryText};
    }

    .container {
        max-width: 120rem;
        margin-left: auto;
        margin-right: auto;
        padding: 1rem 3rem;
    }

    .search {
        display: flex;
        justify-content: space-between;
        margin-bottom: 3rem;
        margin-top: 3rem;

        &__input,
        &__button {
            padding: 1rem;
        }

        &__input {
            flex: 1;
        }

        &__button {

        }
    }

    .tabs {
        &__tab {
            padding: 1rem;
            margin-right: 1rem;
            border-top-left-radius: 1rem;
            border-top-right-radius: 1rem;
            min-width: 10rem;
        }

        &__panel {
            padding: 1rem;
            border: .1rem solid ${(props) => props.theme.outline};
            border-bottom-left-radius: 1rem;
            border-bottom-right-radius: 1rem;
        }
    }

    .pagination {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        padding-top: 2rem;

        &__list,
        &__dropdown {
            margin-bottom: 1rem;
        }

        &__list {
            margin: 0;

            li {
                list-style: none;
                display: inline-block;
                margin-bottom: 1rem;
            }
        }

        &__dropdown {
            display: inline-block;
            margin-right: 2rem;

            select {
                padding: 1rem;
            }
        }

        &__button {
            margin: 0 .5rem;
            padding: 1rem;
            background-color: ${(props) => props.theme.body};
            color: ${(props) => props.theme.bodyText};
            border: .1rem solid ${(props) => props.theme.outline};

            &--current {
                background-color: ${(props) => props.theme.highlight};
                border-color: ${(props) => props.theme.highlight};
                color: ${(props) => props.theme.highlightText};
            }
        }
    }

    .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        list-style: none;

        &__item {
            flex: 1 0 calc(25% - 2rem);
            margin-left: 1rem;
            margin-right: 1rem;
            max-width: 20rem;
        }
    }

    .card {
        padding: 1rem;
        word-wrap: break-word;
        border: 1px solid red;
        border-radius: .5rem;
        margin-bottom: 1rem;
        border: .1rem solid ${(props) => props.theme.outline};

        &__image {
            width: 100%;
        }
    }

    .u-hide-visually {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }

    .u-emphasis {
        font-style: italic;
    }
`;
export default GlobalStyle;
