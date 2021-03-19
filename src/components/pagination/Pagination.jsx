import React from "react";
import PropTypes from "prop-types";

import createPagination from "./createPagination";
import RecordsPerPageDropdown from "./RecordsPerPageDropdown";
import PageButton from "./PageButton";

const Pagination = ({
    label,
    recordsPerPage,
    totalPages,
    currentPage,
    pageRange,
    onPageChange,
    onRecordsPerPageChange,
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
        return pages.map((page) => {
            const isCurrentPage = currentPage === page;
            const classNames = [
                "pagination__button",
                isCurrentPage ? "pagination__button--current" : null,
            ];
            const className = classNames.filter(Boolean).join(" ");

            return (
                <li key={page}>
                    <PageButton
                        className={className}
                        key={page}
                        isCurrent={isCurrentPage}
                        pageNumber={page}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </PageButton>
                </li>
            );
        });
    };

    return (
        <nav className="pagination" aria-label={label}>
            <RecordsPerPageDropdown
                selectedOption={recordsPerPage}
                onRecordsPerPageChange={onRecordsPerPageChange}
            />
            <ul className="pagination__list">
                <li>
                    <button
                        className="pagination__button"
                        type="button"
                        aria-disabled={isFirstPage}
                        onClick={() => handlePageChange(1)}
                    >
                        First Page
                    </button>
                </li>
                <li>
                    <button
                        className="pagination__button"
                        type="button"
                        aria-disabled={isFirstPage}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        <span aria-hidden>&lt;</span>
                        <span className="u-hide-visually">
                            Go to previous page
                        </span>
                    </button>
                </li>
                {renderPageButtons()}
                <li>
                    <button
                        className="pagination__button"
                        type="button"
                        aria-disabled={isLastPage}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        <span aria-hidden>&gt;</span>
                        <span className="u-hide-visually">Go to next page</span>
                    </button>
                </li>
                <li>
                    <button
                        className="pagination__button"
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
    label: PropTypes.string.isRequired,
    totalPages: PropTypes.number.isRequired,
    recordsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    pageRange: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
