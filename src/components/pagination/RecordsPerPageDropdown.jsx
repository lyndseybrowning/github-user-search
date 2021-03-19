import React from "react";
import PropTypes from "prop-types";
import { useUID } from "react-uid";

const recordsPerPageOptions = [10, 20, 50];

const RecordsPerPageDropdown = ({ selectedOption, onRecordsPerPageChange }) => {
    const id = useUID();

    return (
        <form className="pagination__dropdown">
            <label
                htmlFor={`records-per-page-${id}`}
                className="u-hide-visually"
            >
                Choose display option
            </label>
            <select
                id={`records-per-page-${id}`}
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
