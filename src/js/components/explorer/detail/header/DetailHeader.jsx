/**
 * DetailHeader.jsx
 * Created by Kevin Li 8/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import Analytics from 'helpers/analytics/Analytics';

import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import { formatTreemapValues } from 'helpers/moneyFormatter';
import { generateSingular } from 'helpers/singularityHelper';

import TruncationWarning from './TruncationWarning';

const propTypes = {
    within: PropTypes.string,
    fy: PropTypes.string,
    lastUpdate: PropTypes.string,
    total: PropTypes.number,
    title: PropTypes.string,
    id: PropTypes.string,
    parent: PropTypes.string,
    isTruncated: PropTypes.bool,
    isLoading: PropTypes.bool
};

const exitExplorer = (target) => {
    Analytics.event({
        category: 'Spending Explorer - Exit',
        action: target
    });
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
                {descriptor} <span className="detail-header__type detail-header__type_bold">{parent}</span>
            </span>
        );
    }

    return (
        <div className="detail-header__type">
            {singular} <span className="detail-header__type detail-header__type_bold">{type}</span> {parentRelation}
        </div>
    );
};

const heading = (type, title, id) => {
    if (type === 'Federal Account') {
        return (
            <h2 className="detail-header__title">
                <a
                    href={`/#/federal_account/${id}`}
                    className="detail-header__title-link"
                    onClick={exitExplorer.bind(null, `/federal_account/${id}`)}>
                    {title}
                </a>
            </h2>
        );
    }
    else if (type === 'Agency') {
        let header = (
            <a
                href={`/#/agency/${id}`}
                className="detail-header__title-link"
                onClick={exitExplorer.bind(null, `/agency/${id}`)}>
                {title}
            </a>);
        if (title === "Unreported Data") {
            header = (
                <span className="detail-header__title">
                    {title}
                </span>);
        }
        return (
            <h2 className="detail-header__title">
                {header}
            </h2>
        );
    }
    return (
        <h2 className="detail-header__title">
            {title}
        </h2>
    );
};

const DetailHeader = (props) => {
    const type = sidebarTypes[props.within];

    let truncationWarning = null;
    if (props.isTruncated) {
        truncationWarning = (
            <TruncationWarning />
        );
    }

    return (
        <div>
            <div className="detail-header">
                <div className="detail-header__labels">
                    <div className="detail-header__subtitle">
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
                        {props.isLoading ? '--' : formatTreemapValues(props.total)}
                    </div>
                    <div className="update-date">
                        Data as of {moment(props.lastUpdate, 'YYYY-MM-DD').format('MMMM D, YYYY')}
                    </div>
                </div>
            </div>
            {truncationWarning}
        </div>
    );
};

DetailHeader.propTypes = propTypes;

export default DetailHeader;
