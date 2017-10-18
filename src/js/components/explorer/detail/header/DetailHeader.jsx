/**
 * DetailHeader.jsx
 * Created by Kevin Li 8/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import { formatTreemapValues } from 'helpers/moneyFormatter';
import { generateSingular } from 'helpers/singularityHelper';

const propTypes = {
    within: PropTypes.string,
    fy: PropTypes.string,
    lastUpdate: PropTypes.string,
    total: PropTypes.number,
    title: PropTypes.string,
    id: PropTypes.string,
    parent: PropTypes.string
};

const dataType = (type, parent) => {
    if (!type) {
        return null;
    }

    const singular = generateSingular(type, true);

    let parentRelation = null;
    if (parent) {
        let descriptor = 'of';
        if (type === 'Recipient') {
            descriptor = 'within';
        }

        parentRelation = (
            <span>
                {descriptor} <span className="bold">{parent}</span>
            </span>
        );
    }

    return (
        <div className="data-type">
            {singular} <span className="bold">{type}</span> {parentRelation}
        </div>
    );
};

const heading = (type, title, id) => {
    if (type === 'Federal Account') {
        return (
            <h2>
                <a href={`/#/federal_account/${id}`}>{title}</a>
            </h2>
        );
    }
    else if (type === 'Agency' && title !== 'Department of Transportation') {
        // BODGE: Disable link to Department of Transportation
        return (
            <h2>
                <a href={`/#/agency/${id}`}>{title}</a>
            </h2>
        );
    }
    return (
        <h2>
            {title}
        </h2>
    );
};

const DetailHeader = (props) => {
    const type = sidebarTypes[props.within];

    return (
        <div className="detail-header">
            <div className="left-side">
                <div className="you-did-this">
                    You&apos;ve chosen
                </div>
                {heading(type, props.title, props.id)}
                {dataType(type, props.parent)}
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

DetailHeader.propTypes = propTypes;

export default DetailHeader;
