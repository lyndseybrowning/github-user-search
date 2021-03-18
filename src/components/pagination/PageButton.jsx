import React from "react";
import PropTypes from "prop-types";

const PageButton = ({ children: text, isCurrent, pageNumber, onClick }) => {
    return (
        <button
            type="button"
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isCurrent}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

PageButton.propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        .isRequired,
    isCurrent: PropTypes.bool.isRequired,
    pageNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PageButton;
