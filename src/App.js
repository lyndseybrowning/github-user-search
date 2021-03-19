import React, { useEffect, useReducer } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./GlobalStyle";
import { lightTheme } from "./theme";
import fetchData from "./scripts/fetchData";
import Search from "./components/search";
import Tabs, { Tab } from "./components/tabs";
import UsersTab from "./components/UsersTab";

const RECORDS_PER_PAGE = 10;

const searchReducer = (state, action) => {
    switch (action.type) {
        case "resultsFound":
            return {
                ...state,
                isLoading: false,
                users: action.users,
                repositories: action.repositories,
                searchQuery: action.searchQuery,
            };
        case "searchingResults":
            return {
                ...state,
                isLoading: true,
            };
        case "error":
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
        case "setSearchQuery":
            return {
                ...state,
                searchQuery: action.searchQuery,
            };
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(searchReducer, {
        users: null,
        repositories: null,
        error: null,
        isLoading: false,
        searchQuery: null,
    });

    useEffect(() => {
        async function handleSearch() {
            try {
                dispatch({ type: "searchingResults" });

                const data = await fetchData(state.searchQuery, {
                    pageSize: RECORDS_PER_PAGE,
                });

                dispatch({
                    type: "resultsFound",
                    users: data,
                    searchQuery: state.searchQuery,
                });
            } catch (error) {
                dispatch({ type: "error", error });
            }
        }

        if (state.searchQuery) {
            handleSearch();
        }
    }, [state.searchQuery]);

    const renderContent = () => {
        if (state.isLoading) {
            return <p>Loading results, please wait...</p>;
        }

        if (state.error) {
            return <p>{state.error.message}</p>;
        }

        if (state.users === null) {
            return <p>Enter a search term to find results.</p>;
        }

        return (
            <Tabs label="Search Results">
                <Tab name={`Users ${state.users.total_count}`}>
                    <UsersTab
                        users={state.users}
                        recordsPerPage={RECORDS_PER_PAGE}
                        searchQuery={state.searchQuery}
                    />
                </Tab>
                <Tab name="Repos">TODO</Tab>
            </Tabs>
        );
    };

    return (
        <ThemeProvider theme={lightTheme}>
            <GlobalStyle />
            <header className="page-header">
                <div className="container">
                    <h1>Search GitHub API</h1>
                </div>
            </header>
            <main>
                <div className="container">
                    <Search
                        onSearch={(searchQuery) =>
                            dispatch({ type: "setSearchQuery", searchQuery })
                        }
                    />
                    {renderContent()}
                </div>
            </main>
        </ThemeProvider>
    );
}

export default App;
