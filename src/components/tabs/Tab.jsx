import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Tab = forwardRef(({ label, name, ...props }, ref) => {
    return (
        <button role="tab" aria-label={label} ref={ref} {...props}>
            {name}
        </button>
    );
});

Tab.defaultProps = {
    label: null,
};

Tab.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
};

export default Tab;
