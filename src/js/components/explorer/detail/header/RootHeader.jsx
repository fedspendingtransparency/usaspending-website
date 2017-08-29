/**
 * RootHeader.jsx
 * Created by Kevin Li 8/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import { formatTreemapValues } from 'helpers/moneyFormatter';

const propTypes = {
    root: PropTypes.string,
    fy: PropTypes.string,
    total: PropTypes.number,
    lastUpdate: PropTypes.string
};

const singularType = (type) => {
    const firstLetter = type.substring(0, 1).toLowerCase();
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    if (vowels.indexOf(firstLetter) === -1) {
        return `a ${type.toLowerCase()}`;
    }
    return `an ${type.toLowerCase()}`;
};

const RootHeader = (props) => {
    const type = sidebarTypes[props.root];
    return (
        <div className="root-header">
            <div className="left-side">
                <h2>
                    You are viewing FY {props.fy} spending by <span className="capitalize">{type}</span>
                </h2>
                <div className="instructions">
                    Choose {singularType(type)} below to start your exploration.
                </div>
            </div>
            <div className="right-side">
                <div className="amount-header">
                    FY {props.fy} obligated amount
                </div>
                <div className="amount-value">
                    {formatTreemapValues(props.total)}
                </div>
                <div className="update-date">
                    Data as of {moment(props.lastUpdate, 'YYYY-MM-DD').format('MMMM D, YYYY')}
                </div>
            </div>
        </div>
    );
};

RootHeader.propTypes = propTypes;

export default RootHeader;
