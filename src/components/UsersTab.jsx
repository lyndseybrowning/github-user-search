import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

import fetchData from "../scripts/fetchData";
import Pagination from "./pagination";
import User from "./User";

// GitHub API will never return more than 1000 records
// so the total number of pages in the pagination needs to
// factor this in
const MAX_TOTAL_RECORDS = 1000;
const DEFAULT_CURRENT_PAGE = 1;

const UsersTab = ({ users, recordsPerPage, searchQuery }) => {
    const [currentPage, setCurrentPage] = useState(DEFAULT_CURRENT_PAGE);
    const [userData, setUserData] = useState(users);
    const [pageSize, setPageSize] = useState(recordsPerPage);

    const totalUserPages = Math.floor(userData.total_count / pageSize);
    const maxTotalPages = Math.floor(MAX_TOTAL_RECORDS / pageSize);
    const totalPages =
        totalUserPages <= maxTotalPages ? totalUserPages : maxTotalPages;

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
                // TODO: handle errors
                console.log(error);
            }
        }

        fetchNextPage();
    }, [currentPage, searchQuery, pageSize]);

    useEffect(() => {
        // reset current page back to 1 when the dropdown is changed
        // because the total number of pages is recalculated
        if (pageSize !== recordsPerPage) {
            setCurrentPage(DEFAULT_CURRENT_PAGE);
        }
    }, [pageSize, recordsPerPage]);

    return (
        <Fragment>
            <Pagination
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
