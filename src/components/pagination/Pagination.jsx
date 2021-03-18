import React from "react";
import PropTypes from "prop-types";

import createPagination from "./createPagination";
import RecordsPerPageDropdown from "./RecordsPerPageDropdown";
import PageButton from "./PageButton";

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

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handlePageChange = (page) => {
        if (page === currentPage || page === 0 || page > totalPages) {
            return;
        }
        return onPageChange(page);
    };

    const renderPageButtons = () => {
        return pages.map((page) => (
            <li key={page}>
                <PageButton
                    key={page}
                    isCurrent={currentPage === page}
                    pageNumber={page}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </PageButton>
            </li>
        ));
    };

    return (
        <nav aria-label="Pagination">
            <RecordsPerPageDropdown selectedOption={recordsPerPage} />
            <ul>
                <li>
                    <button
                        type="button"
                        aria-disabled={isFirstPage}
                        onClick={() => handlePageChange(1)}
                    >
                        First Page
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        aria-disabled={isFirstPage}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous Page
                    </button>
                </li>
                {renderPageButtons()}
                <li>
                    <button
                        type="button"
                        aria-disabled={isLastPage}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next Page
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        aria-disabled={isLastPage}
                        onClick={() => handlePageChange(totalPages)}
                    >
                        Last Page
                    </button>
                </li>
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
