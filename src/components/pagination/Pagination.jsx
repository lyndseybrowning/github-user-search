import React from "react";
import PropTypes from "prop-types";

import createPagination from "./createPagination";
import PageButton from "./PageButton";
import RecordsPerPageDropdown from "./RecordsPerPageDropdown";

const Pagination = ({
    recordsPerPage,
    totalPages,
    currentPage,
    pageRange,
    onPageChange,
}) => {
    const pages = createPagination({
        totalPages,
        currentPage,
        range: pageRange,
    });

    const renderPages = () => {
        return pages.map((page) => (
            <PageButton key={page} onClick={() => onPageChange(page)}>
                Page {page}
            </PageButton>
        ));
    };

    return (
        <nav aria-label="Pagination">
            <ul>
                <RecordsPerPageDropdown selectedOption={recordsPerPage} />
                <PageButton onClick={() => onPageChange(1)}>
                    First Page
                </PageButton>
                <PageButton onClick={() => onPageChange(currentPage - 1)}>
                    Previous Page
                </PageButton>
                {renderPages()}
                <PageButton onClick={() => onPageChange(currentPage + 1)}>
                    Next Page
                </PageButton>
                <PageButton onClick={() => onPageChange(totalPages)}>
                    Last Page
                </PageButton>
            </ul>
        </nav>
    );
};

Pagination.defaultProps = {
    recordsPerPage: 10,
    currentPage: 1,
    pageRange: 5,
};

Pagination.propTypes = {
    totalPages: PropTypes.number.isRequired,
    recordsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    pageRange: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
