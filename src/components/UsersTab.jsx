import React from "react";
import PropTypes from "prop-types";

import PaginatedTabContent from "./PaginatedTabContent";

const UsersTab = ({ users, recordsPerPage }) => {
    return (
        <PaginatedTabContent
            totalRecords={users.total_count}
            recordsPerPage={recordsPerPage}
        >
            Hello World
        </PaginatedTabContent>
    );
};

UsersTab.propTypes = {
    users: PropTypes.shape().isRequired,
};

export default UsersTab;
