import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import Pagination from "./pagination";

const MAX_TOTAL_RECORDS = 1000;

const PaginatedTabContent = ({
    totalRecords,
    recordsPerPage,
    currentPage,
    children,
    onPageChange,
}) => {
    const [pageSize, setPageSize] = useState(recordsPerPage);
    const maxTotalPages = Math.floor(MAX_TOTAL_RECORDS / recordsPerPage);

    const pagination = (
        <Pagination
            totalPages={maxTotalPages}
            currentPage={currentPage}
            recordsPerPage={pageSize}
            onPageChange={onPageChange}
            onRecordsPerPageChange={setPageSize}
        />
    );

    return (
        <Fragment>
            {pagination}
            {children}
            {pagination}
        </Fragment>
    );
};

PaginatedTabContent.propTypes = {
    children: PropTypes.node.isRequired,
    totalRecords: PropTypes.number.isRequired,
    recordsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default PaginatedTabContent;
