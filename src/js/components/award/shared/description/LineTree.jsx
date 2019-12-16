import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const propTypes = {
    type: PropTypes.oneOf(["naics", "psc"]),
    data: PropTypes.shape({})
};

const LineTree = ({
    type,
    data
}) => {
    const parsedData = Object.keys(data)
        .filter((tierType) => !isEmpty(data[tierType]))
        .sort((tierType1, tierType2) => {
            const first = data[tierType1].code;
            const second = data[tierType2].code;
            if (first === "--") return -1;
            if (second === "--") return 1;
            if (first.length < second.length) return -1;
            if (second.length < first.length) return 1;
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
        <div className={`line-tree-${type}`}>
            {getTierData(0) && (
                <div className="tier--1">
                    <span>{type === 'psc'
                        ? getTierData(0).description
                        : `${getTierData(0).code} : ${getTierData(0).description}`}
                    </span>
                    {getTierData(1) && (
                        <div className={`tier--2 ${numberOfSections <= 2 ? 'tier--last' : ''}`}>
                            <span>{`${getTierData(1).code}: ${getTierData(1).description}`}</span>
                            {getTierData(2) && (
                                <div className={`tier--3 ${numberOfSections <= 3 ? 'tier--last' : ''}`}>
                                    <span>{`${getTierData(2).code}: ${getTierData(2).description}`}</span>
                                    {getTierData(3) && (
                                        <div className={`tier--4 ${numberOfSections <= 4 ? 'tier--last' : ''}`}>
                                            <span>{`${getTierData(3).code}: ${getTierData(3).description}`}</span>
                                        </div>
                                    )}
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
