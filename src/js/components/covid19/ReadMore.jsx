/**
 * ReadMore.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
    text: PropTypes.string,
    limit: PropTypes.number
};

const ReadMore = ({ children, text = '', limit = 300 }) => {
    const [expanded, setExpanded] = useState(false);

    if (expanded) {
        return (
            <>
                {children || (<p>{text}</p>)}
                <div>
                    <button className="read-more-button" onClick={() => setExpanded(false)}>read less</button>
                </div>
            </>
        );
    }
    if (text && text.length > limit) {
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
