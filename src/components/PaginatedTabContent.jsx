import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import Pagination from "./pagination";

const PaginatedTabContent = ({ totalRecords, recordsPerPage, children }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(recordsPerPage);
    const totalPages = Math.floor(totalRecords / recordsPerPage);

    const pagination = (
        <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            recordsPerPage={pageSize}
            onPageChange={setCurrentPage}
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
};

export default PaginatedTabContent;
