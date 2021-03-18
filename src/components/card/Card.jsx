import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, subtitle, children, img }) => {
    return (
        <div className="card">
            {img && (
                <img
                    className="card__image"
                    src={img.src}
                    alt={img.alt || ""}
                />
            )}
            <h2 className="card__title">
                <a href={title.url} rel="nooopener noreferrer" target="_blank">
                    {title.text}
                </a>
            </h2>
            {subtitle && <span className="card__subtitle">{subtitle}</span>}
            {children}
        </div>
    );
};

Card.defaultProps = {
    subtitle: null,
    children: null,
    img: null,
};

Card.propTypes = {
    title: PropTypes.shape({
        url: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
    }).isRequired,
    subtitle: PropTypes.string,
    children: PropTypes.node,
    img: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
    }),
};

export default Card;
