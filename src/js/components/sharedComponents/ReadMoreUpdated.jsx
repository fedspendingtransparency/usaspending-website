/**
 * ReadMoreUpdated.jsx
 * Created by Nick Torres 06/15/2022
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    text: PropTypes.string,
    limit: PropTypes.number,
    initiallyExpanded: PropTypes.bool,
    inline: PropTypes.bool,
    openIcon: PropTypes.string,
    closeIcon: PropTypes.string,
    openPrompt: PropTypes.string,
    closePrompt: PropTypes.string
};

const ReadMoreUpdated = ({
    children, // pre-determined content to be hidden/ shown by the buttons
    text = '', // a string to be truncated based on the limit
    limit = 350,
    initiallyExpanded = false,
    openIcon = "angle-down",
    closeIcon = "angle-up",
    openPrompt = "Read More",
    closePrompt = "Read Less"

}) => {
    const [expanded, setExpanded] = useState(initiallyExpanded);
    const readLess = (<button className="readMore__expand-button" onClick={() => setExpanded(false)}>{openPrompt}</button>);
    const readMore = (<button className="readMore__contract-button" onClick={() => setExpanded(true)}>{closePrompt}</button>);
    if (expanded && children) {
        return (
            <>
                {children}
                <div>
                    {readLess}
                    <span className="usa-button-link__icon"><FontAwesomeIcon icon={closeIcon} /></span>
                </div>
            </>
        );
    }
    if (expanded && (text && text.length > limit)) {
        return (
            <>
                <p>{text}</p>
                <div>
                    {readLess}
                    <span className="usa-button-link__icon"><FontAwesomeIcon icon={closeIcon} /></span>
                </div>
            </>
        );
    }
    if (!expanded && text && text.length > limit) {
        return (
            <div>
                <p>{`${text.substring(0, limit)}...`}</p>
                {readMore}
                <span className="usa-button-link__icon"><FontAwesomeIcon icon={openIcon} /></span>
            </div>
        );
    }
    if (text && text.length <= limit) {
        return (
            <div>
                <p>{text}</p>
            </div>
        );
    }
    return (
        <div>
            {readMore}
            <span className="usa-button-link__icon"><FontAwesomeIcon icon={openIcon} /></span>
        </div>
    );
};

ReadMoreUpdated.propTypes = propTypes;
export default ReadMoreUpdated;
