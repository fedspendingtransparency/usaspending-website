/**
 * ReadMoreUpdated.jsx
 * Created by Nick Torres 06/15/2022
 */

import React, { useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    children: oneOfType([PropTypes.element, PropTypes.array]),
    text: oneOfType([PropTypes.element, PropTypes.string, PropTypes.object]),
    limit: oneOfType([PropTypes.string, PropTypes.number]),
    initiallyExpanded: PropTypes.bool,
    inline: PropTypes.bool,
    openIcon: PropTypes.string,
    closeIcon: PropTypes.string,
    openPrompt: PropTypes.string,
    closePrompt: PropTypes.string,
    iconColor: PropTypes.string
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
    const readLess = (<button className="readMoreUpdated__expand-button" onClick={() => setExpanded(false)}>{closePrompt}{' '}<span className="usa-button-link__icon"><FontAwesomeIcon className="readMoreUpdated__link-icon" icon={closeIcon} /></span></button>);
    const readMore = (<button className="readMoreUpdated__contract-button" onClick={() => setExpanded(true)}>{openPrompt}{' '}<span className="usa-button-link__icon"><FontAwesomeIcon className="readMoreUpdated__link-icon" icon={openIcon} /></span></button>);
    if (expanded && children) {
        return (
            <>
                {children}
                <div>
                    {readLess}
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
                </div>
            </>
        );
    }
    if (!expanded && text && text.length > limit) {
        return (
            <div>
                <p>{`${text.substring(0, limit)}...`}</p>
                {readMore}
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
        </div>
    );
};

ReadMoreUpdated.propTypes = propTypes;
export default ReadMoreUpdated;
