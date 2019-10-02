import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    type: PropTypes.oneOf(["naics", "psc"]),
    data: PropTypes.shape({})
};

const LineTree = ({
    type,
    data
}) => {
    const handleSort = (a, b) => {
        return 0;
        // return 1 returns a
        // return -1 returns b
        // return 0 returns equivalent
        // not sure how to sort ATM
    };
    return (
        <ul className={`line-tree-${type}`}>
            {Object.keys(data)
                .filter((tierType) => Object.keys(data[tierType]).includes('code') && Object.keys(data[tierType]).includes('description'))
                .sort(handleSort)
                .map((tierType) => {
                    return (
                        <li className={`line-tree__${tierType}`}>
                            <span>{`${data[tierType].code}: `}</span>
                            <span>{`${data[tierType].description}`}</span>
                        </li>
                    );
                })
            }
        </ul>
    );
};

LineTree.propTypes = propTypes;
export default LineTree;
