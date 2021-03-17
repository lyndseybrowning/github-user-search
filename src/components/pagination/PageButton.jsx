import React from "react";
import PropTypes from "prop-types";

const PageButton = ({ children: text }) => {
    return (
        <li>
            <button type="button">{text}</button>
        </li>
    );
};

PageButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        .isRequired,
};

export default PageButton;
