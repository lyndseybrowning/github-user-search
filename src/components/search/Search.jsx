import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        if (searchTerm === "") {
            return;
        }

        return onSearch(searchTerm);
    };

    return (
        <form className="search" onSubmit={handleSearch}>
            <label htmlFor="input-search" className="u-hide-visually">
                Search GitHub
            </label>
            <input
                className="search__input"
                type="text"
                name="search"
                id="input-search"
                placeholder="e.g. Lyndsey Browning"
                spellCheck={false}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                className="search__button"
                type="submit"
                aria-disabled={searchTerm === ""}
            >
                Search
            </button>
        </form>
    );
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Search;
