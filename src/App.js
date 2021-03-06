import React, { useEffect, useReducer, useState } from "react";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "./GlobalStyle";
import { lightTheme, darkTheme } from "./theme";
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
        case "setSearchQuery":
            return {
                ...state,
                searchQuery: action.searchQuery,
            };
        case "error":
        default:
            return {
                ...state,
                isLoading: false,
                error: action.error,
            };
    }
};

function App() {
    const [theme, setTheme] = useState(lightTheme);
    const [state, dispatch] = useReducer(searchReducer, {
        users: null,
        repositories: null,
        error: null,
        isLoading: false,
        searchQuery: null,
    });
    const nextTheme = theme.name === "light" ? "dark" : "light";

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

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            if (prevTheme.name === "light") {
                return darkTheme;
            }
            return lightTheme;
        });
    };

    const renderContent = () => {
        if (state.isLoading) {
            return <p aria-live="polite">Loading results, please wait...</p>;
        }

        if (state.error) {
            return <p aria-live="polite">{state.error.message}</p>;
        }

        if (state.users === null) {
            return (
                <p aria-live="polite">Enter a search term to find results.</p>
            );
        }

        const totalUsersFound = state.users.total_count;
        const tabName = `Users (${totalUsersFound})`;
        const tabLabel = `Users. ${totalUsersFound} records found.`;

        return (
            <Tabs label="Search Results">
                <Tab id="users" name={tabName} label={tabLabel}>
                    <UsersTab
                        users={state.users}
                        recordsPerPage={RECORDS_PER_PAGE}
                        searchQuery={state.searchQuery}
                    />
                </Tab>
                <Tab id="repos" name="Repos">
                    <p>
                        I didn't get to complete this feature but here's what I
                        wanted to do.
                    </p>
                    <p>
                        I wanted to have a "Show Repositories" button inside the
                        &lt;User /&gt; component that would open and populate
                        this tab programmatically. It would go away to the
                        GitHub API to fetch a list of all public repositories
                        owned by the selected user.
                    </p>
                </Tab>
            </Tabs>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <header className="page-header">
                <div className="container">
                    <h1>Search GitHub API</h1>
                    <button
                        type="button"
                        data-testid="btn-switch-theme"
                        onClick={toggleTheme}
                    >
                        Switch to {nextTheme} mode.
                    </button>
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
