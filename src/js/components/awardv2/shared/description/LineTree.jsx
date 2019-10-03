import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const propTypes = {
    type: PropTypes.oneOf(["naics", "psc"]),
    data: PropTypes.shape({})
};

const parentMargin = 14;

const LineTree = ({
    type,
    data
}) => {
    const parsedData = Object.keys(data)
        .filter((tierType) => Object.keys(data[tierType]).includes('code') && Object.keys(data[tierType]).includes('description'))
        .sort((tierType1, tierType2) => {
            const first = data[tierType1];
            const second = data[tierType2];
            if (first.code === 'SERVICES') return -1;
            if (second.code === 'SERVICES') return 1;
            if (first.code > second.code) return -1;
            if (second.code > first.code) return 1;
            return 0;
        })
        .reduce((acc, tierType) => ({ ...acc, [tierType]: data[tierType] }), {});

    const tiersInHierarchialOrder = Object.keys(parsedData);
    const numberOfSections = tiersInHierarchialOrder.length;

    const getTierData = (index) => {
        if (tiersInHierarchialOrder.length - 1 >= index) {
            return parsedData[tiersInHierarchialOrder[index]];
        }
        // no more available data
        return false;
    };

    return (
        <div style={{ margin: `${parentMargin}px 0px` }} className={`line-tree-${type}`}>
            {getTierData(0) && (
                <div className="line-tree__section">
                    <span>{`${getTierData(0).code}: `}</span>
                    <span>{`${getTierData(0).description}`}</span>
                    {getTierData(1) && (
                        <div className={`${numberOfSections >= 2 ? 'line-tree__section--last' : 'line-tree__section'}`}>
                            <span>{`${getTierData(1).code}: `}</span>
                            <span>{`${getTierData(1).description}`}</span>
                            {getTierData(2) && (
                                <div className={`${numberOfSections >= 3 ? 'line-tree__section--last' : 'line-tree__section'}`}>
                                    <span>{`${getTierData(2).code}: `}</span>
                                    <span>{`${getTierData(2).description}`}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

LineTree.propTypes = propTypes;
export default LineTree;
