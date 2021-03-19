import React from "react";
import PropTypes from "prop-types";

const PageButton = ({
    className,
    children: text,
    isCurrent,
    pageNumber,
    onClick,
}) => {
    return (
        <button
            className={className}
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
    className: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
        .isRequired,
    isCurrent: PropTypes.bool.isRequired,
    pageNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PageButton;
