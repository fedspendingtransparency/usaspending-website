/**
 * ReadMore.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    text: PropTypes.string,
    limit: PropTypes.number,
    initiallyExpanded: PropTypes.bool
};

const ReadMore = ({
    children, // pre-determined content to be hidden/ shown by the buttons
    text = '', // a string to be truncated based on the limit
    limit = 300,
    initiallyExpanded
}) => {
    const [expanded, setExpanded] = useState(!!initiallyExpanded);
    if (expanded && children) {
        return (
            <>
                {children}
                <div>
                    <button className="read-more-button" onClick={() => setExpanded(false)}>read less</button>
                </div>
            </>
        );
    }
    if (expanded && (text && text.length > limit)) {
        return (
            <>
                <p>{text}</p>
                <div>
                    <button className="read-more-button" onClick={() => setExpanded(false)}>read less</button>
                </div>
            </>
        );
    }
    if (!expanded && text && text.length > limit) {
        return (
            <div>
                <p>{`${text.substring(0, limit)}...`}</p>
                <button className="read-more-button" onClick={() => setExpanded(true)}>read more</button>
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
            <button className="read-more-button" onClick={() => setExpanded(true)}>read more</button>
        </div>
    );
};

ReadMore.propTypes = propTypes;
export default ReadMore;
