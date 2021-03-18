import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import fetchData from "../scripts/fetchData";
import PaginatedTabContent from "./PaginatedTabContent";

const UsersTab = ({ users, recordsPerPage, searchQuery }) => {
    const [userData, setUserData] = useState(users);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchNextPage() {
            try {
                const data = await fetchData(searchQuery, {
                    type: "users",
                    pageSize: recordsPerPage,
                    currentPage,
                });

                setUserData(data);
            } catch (error) {
                // TODO: handle errors
                console.log(error);
            }
        }

        fetchNextPage();
    }, [currentPage, searchQuery, recordsPerPage]);

    return (
        <PaginatedTabContent
            totalRecords={userData.total_count}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
        >
            TODO
        </PaginatedTabContent>
    );
};

UsersTab.propTypes = {
    users: PropTypes.shape().isRequired,
};

export default UsersTab;
