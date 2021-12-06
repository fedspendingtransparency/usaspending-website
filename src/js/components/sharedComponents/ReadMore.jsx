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
    initiallyExpanded: PropTypes.bool,
    inline: PropTypes.bool
};

const ReadMore = ({
    children, // pre-determined content to be hidden/ shown by the buttons
    text = '', // a string to be truncated based on the limit
    limit = 300,
    initiallyExpanded = false
}) => {
    const [expanded, setExpanded] = useState(!!initiallyExpanded);
    const readLess = (<button className="read-more-button" onClick={() => setExpanded(false)}>read less</button>);
    const readMore = (<button className="read-more-button" onClick={() => setExpanded(true)}>read more</button>);
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
