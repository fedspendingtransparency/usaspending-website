/**
 * ReadMore.jsx
 * Created by Lizzie Salita 7/24/20
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
    closePrompt: PropTypes.string,
    iconColor: PropTypes.string,
    additionalFunctionality: PropTypes.func
};

const ReadMore = ({
    children, // pre-determined content to be hidden/ shown by the buttons
    text = '', // a string to be truncated based on the limit
    limit = 300,
    initiallyExpanded = false,
    openIcon = "",
    closeIcon = "",
    openPrompt = "",
    closePrompt = "",
    additionalFunctionality = null
}) => {
    const [expanded, setExpanded] = useState(!!initiallyExpanded);
    const readLess = closeIcon ? (
        <button
            className="readMoreUpdated__button"
            onClick={() => {
                setExpanded(false);
                if (additionalFunctionality !== null) {
                    additionalFunctionality(expanded);
                }
            }}>{closePrompt}{' '}<span className="usa-button-link__icon"><FontAwesomeIcon className="readMoreUpdated__link-icon" icon={closeIcon} /></span>
        </button>) : (<button className="read-more-button" onClick={() => setExpanded(false)}>Read Less</button>);
    const readMore = openIcon ? (
        <button
            className="readMoreUpdated__button"
            onClick={() => {
                setExpanded(true);
                if (additionalFunctionality !== null) {
                    additionalFunctionality();
                }
            }}>{openPrompt}{' '}<span className="usa-button-link__icon"><FontAwesomeIcon className="readMoreUpdated__link-icon" icon={openIcon} /></span>
        </button>) : (<button className="read-more-button" onClick={() => setExpanded(true)}>Read More</button>);
    if (expanded && children) {
        return (
            <>
                {children}
                <div>{readLess}</div>
            </>
        );
    }
    if (expanded && (text && text.length > limit)) {
        return (
            <>
                <p>{text}</p>
                <div>{readLess}</div>
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

ReadMore.propTypes = propTypes;
export default ReadMore;
