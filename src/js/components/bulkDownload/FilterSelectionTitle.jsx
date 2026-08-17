/**
 * FilterSectionTitle.jsx
 * Created by JD House 6/12/2026
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    type: PropTypes.string
};

const titleData = {
    awardType: {
        icon: "file-certificate",
        preSpan: "Select the",
        span: "Award Types",
        postSpan: "to include.",
        showRequired: true,
        background: '#f7f2ff',
        fill: '#54278f',
        addClassName: ""
    },
    agency: {
        icon: "building-columns",
        preSpan: "Select an awarding or funding",
        span: "Agency",
        postSpan: "and sub-agency.",
        showRequired: false,
        background: '#e5faff',
        fill: '#0e4f5c',
        addClassName: ""
    },
    location: {
        icon: "location-dot",
        preSpan: "Select a",
        span: "Location",
        postSpan: ".",
        showRequired: false,
        background: '#fef2e4',
        fill: '#e66f0e',
        addClassName: "no-right-margin"
    },
    date: {
        icon: "file-signature",
        preSpan: "Select a",
        span: "Date Type",
        postSpan: ".",
        showRequired: false,
        background: '#e3f5e1',
        fill: '#216e1f',
        addClassName: "no-right-margin"
    },
    dateRange: {
        icon: "calendar-days",
        preSpan: "Select a",
        span: "Date Range",
        postSpan: ".",
        showRequired: false,
        background: '#e8f5ff',
        fill: '#112f4e',
        addClassName: "no-right-margin"
    },
    file: {
        icon: "file-csv",
        preSpan: "Select a",
        span: "File Format",
        postSpan: ".",
        showRequired: false,
        background: '#fff5c2',
        fill: '#422d19',
        addClassName: "no-right-margin"
    },
    budget: {
        icon: "list",
        preSpan: "Select a",
        span: "Budget Function",
        postSpan: <> and/or <span
            className={`download-filter__title_em no-right-margin`}
            style={{backgroundColor: '#F7F2FF'}} >
            Agency
        </span>.
        </>,
        showRequired: true,
        background: '#F7F2FF',
        fill: '#54278F',
        addClassName: ""
    },
    account: {
        icon: "money-check-dollar",
        preSpan: "Select a",
        span: "Account Level",
        postSpan: ".",
        showRequired: false,
        background: '#E5FAFF',
        fill: '#0E4F5C',
        addClassName: "no-right-margin",
        optClassName: "no-padding"
    },
    fileType: {
        icon: "folder",
        preSpan: "Select a",
        span: "File Type",
        postSpan: ".",
        showRequired: true,
        background: '#FEF2E4',
        fill: '#E66F0E',
        addClassName: "no-right-margin",
        optClassName: "no-padding"
    },
    defc: {
        icon: "hand-holding-medical",
        preSpan: "Filter by",
        span: "Disaster Emergency Fund Codes (DEFCs)",
        postSpan: ".",
        showRequired: false,
        background: '#E3F5E1',
        fill: '#216E1F',
        addClassName: "no-right-margin"
    },
    fy: {
        icon: "calendar",
        preSpan: "Select a",
        span: "Fiscal Year",
        postSpan: <> and <span
            className={`download-filter__title_em no-right-margin`}
            style={{backgroundColor: '#E8F5FF'}} >
            Period
        </span>.
        </>,
        showRequired: false,
        background: '#E8F5FF',
        fill: '#0B4778',
        addClassName: "",
        optClassName: "no-padding"
    },
    agencyFy: {
        icon: "building-columns",
        preSpan: "Select an ",
        span: "Agency",
        postSpan: (
            <>
                and
                <span
                    className={`download-filter__title_em no-right-margin`}
                    style={{backgroundColor: '#E5FAFF'}} >
                    Fiscal Year
                </span>
                &nbsp;to filter the table below.
            </>
        ),
        showRequired: false,
        background: '#E5FAFF',
        fill: '#0E4F5C',
        addClassName: ""
    }
}


const FilterSectionTitle = ({
    type
}) => {
    const {
        icon,
        preSpan,
        span,
        postSpan,
        showRequired,
        addClassName,
        background,
        fill,
        optClassName = ""
    } = titleData[type];

    return (
        <div className="download-filter__title-wrapper">
            <h4 className="download-filter__title">
                <div
                    className={`title-icon ${optClassName}`}
                    style={{backgroundColor: background}} >
                    <FontAwesomeIcon icon={icon} color={fill} />
                </div>
                <span>
                    {preSpan}
                    <span
                        className={`download-filter__title_em ${addClassName}`}
                        style={{backgroundColor: background}} >
                        {span}
                    </span>
                    {postSpan}
                </span>
                {showRequired && <span className='required'>&nbsp;(Required)&nbsp;</span>}
            </h4>
        </div>
    );
};

FilterSectionTitle.propTypes = propTypes;
export default FilterSectionTitle;
