import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    overline: PropTypes.object,
    headline: PropTypes.string,
    subhead: PropTypes.string,
    text: PropTypes.string
};

const DefaultTextStyles = ({
                           overline, headline, subhead, text
                       }) => {
    return (
        <>
            <div>{overline}</div>
            <div>{headline}</div>
            <div>{subhead}</div>
            <div>{text}</div>
        </>
    );

};

DefaultTextStyles.propTypes = propTypes;
export default DefaultTextStyles;