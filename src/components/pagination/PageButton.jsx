import React from "react";
import PropTypes from "prop-types";

const PageButton = ({ children: text, onClick }) => {
    return (
        <li>
            <button type="button" onClick={onClick}>
                {text}
            </button>
        </li>
    );
};

PageButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        .isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PageButton;
