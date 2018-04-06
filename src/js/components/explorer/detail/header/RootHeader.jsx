/**
 * RootHeader.jsx
 * Created by Kevin Li 8/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import { formatTreemapValues } from 'helpers/moneyFormatter';
import { generateSingular } from 'helpers/singularityHelper';

const propTypes = {
    root: PropTypes.string,
    fy: PropTypes.string,
    total: PropTypes.number,
    lastUpdate: PropTypes.string
};

const RootHeader = (props) => {
    const type = sidebarTypes[props.root];
    return (
        <div className="detail-header">
            <div className="detail-header__labels">
                <h2 className="detail-header__title">
                    You are viewing FY {props.fy} spending
                    by <span className="detail-header__title detail-header__title_capitalize">{type}</span>
                </h2>
                <div className="detail-header__instructions">
                    Choose {generateSingular(type, false)} {type.toLowerCase()} below to start
                    your exploration.
                </div>
            </div>
            <div className="detail-header__amounts">
                <div className="detail-header__fy">
                    FY {props.fy} obligated amount
                </div>
                <div className="detail-header__value">
                    {formatTreemapValues(props.total)}
                </div>
                <div className="detail-header__update">
                    Data as of {moment(props.lastUpdate, 'YYYY-MM-DD').format('MMMM D, YYYY')}
                </div>
            </div>
        </div>
    );
};

RootHeader.propTypes = propTypes;

export default RootHeader;
