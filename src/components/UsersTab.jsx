import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import fetchData from "../scripts/fetchData";
import Pagination from "./pagination";
import usePrevious from "./usePrevious";
import User from "./User";

// GitHub API will never return more than 1000 records
// so the total number of pages in the pagination needs to
// factor this in
const MAX_TOTAL_RECORDS = 1000;
const DEFAULT_START_PAGE = 1;

const calculateMaxTotalPages = (totalRecords, pageSize) => {
    const numPagesFound = Math.floor(totalRecords / pageSize);
    const maxPagesAllowed = Math.floor(MAX_TOTAL_RECORDS / pageSize);

    if (numPagesFound <= maxPagesAllowed) {
        return numPagesFound;
    }

    return maxPagesAllowed;
};

const UsersTab = ({ users, recordsPerPage, searchQuery }) => {
    const [currentPage, setCurrentPage] = useState(DEFAULT_START_PAGE);
    const [userData, setUserData] = useState(users);
    const [pageSize, setPageSize] = useState(recordsPerPage);
    const [error, setError] = useState(null);

    const previousCurrentPage = usePrevious(currentPage);

    // I didn't see any performance issue in having the calculation
    // happen on every render. If the app was more complex or the total count
    // was a lot larger (millions for example), we may see performance benefit in using
    // useMemo here to only run the calculation again when total count or page size changes.
    const totalPages = calculateMaxTotalPages(userData.total_count, pageSize);

    useEffect(() => {
        async function fetchNextPage() {
            try {
                const data = await fetchData(searchQuery, {
                    type: "users",
                    pageSize,
                    currentPage,
                });

                setUserData(data);
            } catch (error) {
                setError(error);
            }
        }

        // this ensures we only fetch the next page when page is changed
        // and not when the page is rendered
        if (previousCurrentPage !== currentPage) {
            fetchNextPage();
        }
    }, [currentPage, searchQuery, pageSize, previousCurrentPage]);

    useEffect(() => {
        // reset current page back to 1 when the dropdown is changed
        // because the total number of pages is recalculated and the current page
        // might be greater than the total maximum pages.
        if (pageSize !== recordsPerPage) {
            setCurrentPage(DEFAULT_START_PAGE);
        }
    }, [pageSize, recordsPerPage]);

    return error ? (
        <p aria-live="polite">{error.message}</p>
    ) : (
        <Fragment>
            <Pagination
                label="Primary Pagination"
                totalPages={totalPages}
                currentPage={currentPage}
                recordsPerPage={pageSize}
                onPageChange={setCurrentPage}
                onRecordsPerPageChange={setPageSize}
            />
            <ul className="list">
                {userData.items.map((user) => (
                    <User key={user.id} user={user} />
                ))}
            </ul>
            <Pagination
                label="Secondary Pagination"
                totalPages={totalPages}
                currentPage={currentPage}
                recordsPerPage={pageSize}
                onPageChange={setCurrentPage}
                onRecordsPerPageChange={setPageSize}
            />
        </Fragment>
    );
};

UsersTab.propTypes = {
    users: PropTypes.shape().isRequired,
};

export default UsersTab;
