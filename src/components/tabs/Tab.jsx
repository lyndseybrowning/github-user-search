import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const Tab = forwardRef(({ name, ...props }, ref) => {
    return (
        <button role="tab" ref={ref} {...props}>
            {name}
        </button>
    );
});

Tab.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Tab;
