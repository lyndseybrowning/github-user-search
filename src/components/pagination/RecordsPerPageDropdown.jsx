import React from "react";
import PropTypes from "prop-types";

const recordsPerPageOptions = [10, 20, 50];

const RecordsPerPageDropdown = ({ selectedOption }) => {
    return (
        <li>
            <select>
                {recordsPerPageOptions.map((option) => (
                    <option key={`option-${option}`} value={option.toString()}>
                        Showing {option} records
                    </option>
                ))}
            </select>
        </li>
    );
};

RecordsPerPageDropdown.propTypes = {
    selectedOption: PropTypes.oneOf(recordsPerPageOptions).isRequired,
};

export default RecordsPerPageDropdown;
