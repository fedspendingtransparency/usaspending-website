/**
 * DetailHeader.jsx
 * Created by Kevin Li 8/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import { formatTreemapValues } from 'helpers/moneyFormatter';

const propTypes = {
    type: PropTypes.string,
    fy: PropTypes.number,
    total: PropTypes.number,
    title: PropTypes.string
};

const singularType = (type) => {
    const firstLetter = type.substring(0, 1).toLowerCase();
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    let singular = 'An';

    if (vowels.indexOf(firstLetter) === -1) {
        singular = 'A';
    }
    return (
        <div className="data-type">
            {singular} <span className="bold">{type}</span>
        </div>
    );
};

const DetailHeader = (props) => {
    const type = sidebarTypes[props.type];
    return (
        <div className="detail-header">
            <div className="left-side">
                <div className="you-did-this">
                    You&apos;ve chosen
                </div>
                <h2>
                    {props.title}
                </h2>
                {singularType(type)}
            </div>
            <div className="right-side">
                <div className="amount-header">
                    FY {props.fy} obligated amount
                </div>
                <div className="amount-value">
                    {formatTreemapValues(props.total)}
                </div>
            </div>
        </div>
    );
};

DetailHeader.propTypes = propTypes;

export default DetailHeader;
