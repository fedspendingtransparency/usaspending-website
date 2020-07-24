/**
 * ReadMore.jsx
 * Created by Lizzie Salita 7/24/20
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = { children: PropTypes.element };

const ReadMore = ({ children }) => {
    const [expanded, setExpanded] = useState(false);

    if (expanded) {
        return (
            <>
                {children}
                <div>
                    <button className="read-more-button" onClick={() => setExpanded(false)}>read less</button>
                </div>
            </>
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
