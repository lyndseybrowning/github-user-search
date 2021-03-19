import React from "react";
import PropTypes from "prop-types";

const recordsPerPageOptions = [10, 20, 50];

const RecordsPerPageDropdown = ({ selectedOption, onRecordsPerPageChange }) => {
    return (
        <form>
            <label htmlFor="recordsPerPage">Choose display option</label>
            <select
                id="recordsPerPage"
                value={selectedOption}
                onChange={(e) => onRecordsPerPageChange(Number(e.target.value))}
            >
                {recordsPerPageOptions.map((option) => (
                    <option key={`option-${option}`} value={option}>
                        {option} records per page
                    </option>
                ))}
            </select>
        </form>
    );
};

RecordsPerPageDropdown.propTypes = {
    selectedOption: PropTypes.oneOf(recordsPerPageOptions).isRequired,
};

export default RecordsPerPageDropdown;
