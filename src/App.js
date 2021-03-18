import React, { Fragment, useReducer } from "react";

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

    const handleSearch = async (searchQuery) => {
        try {
            dispatch({ type: "searchingResults" });

            Promise.all([
                await fetchData(searchQuery, {
                    pageSize: RECORDS_PER_PAGE,
                }),
                await fetchData(searchQuery, {
                    type: "repositories",
                    pageSize: RECORDS_PER_PAGE,
                }),
            ]).then(([users, repositories]) => {
                dispatch({
                    type: "resultsFound",
                    users,
                    repositories,
                    searchQuery,
                });
            });
        } catch (error) {
            dispatch({ type: "error", error });
        }
    };

    const renderContent = () => {
        if (state.isLoading) {
            return <p>Loading results, please wait...</p>;
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
                <Tab name={`Repos ${state.repositories.total_count}`}>
                    Repos Tab Content
                </Tab>
            </Tabs>
        );
    };

    return (
        <Fragment>
            <header>
                <h1>Search GitHub API</h1>
            </header>
            <main>
                <Search onSearch={handleSearch} />
                {renderContent()}
            </main>
        </Fragment>
    );
}

export default App;
