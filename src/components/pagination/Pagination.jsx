import React from "react";
import PropTypes from "prop-types";

import PageButton from "./PageButton";
import RecordsPerPageDropdown from "./RecordsPerPageDropdown";

const Pagination = ({ recordsPerPage }) => {
    return (
        <nav aria-label="Pagination">
            <ul>
                <RecordsPerPageDropdown selectedOption={recordsPerPage} />
                <PageButton>First Page</PageButton>
                <PageButton>Previous Page</PageButton>
                <PageButton>Next Page</PageButton>
                <PageButton>Last Page</PageButton>
            </ul>
        </nav>
    );
};

Pagination.defaultProps = {
    recordsPerPage: 10,
};

Pagination.propTypes = {
    recordsPerPage: PropTypes.number,
};

export default Pagination;
