/**
 * KeywordHover.jsx
 * Created by Kevin Li 12/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { DUNS_LABEL } from 'GlobalConstants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TimePeriodTooltip = () => (
    <div className="advanced-search-tt">
        <h3 className="advanced-search-tt__header">
            Time Period
        </h3>
        <div className="advanced-search-tt__body">
            <p>
                Prime award summary results in the Table tab will overlap with the selected
                time period based on their prime award <strong>base transaction action data</strong>{' '}
                and prime award <strong>latest transaction action date</strong>.
                Individual transactions for any single award summary result may not exist
                within the selected time period.
            </p>
            <p>
                Transaction results in the Time, Map, and Categories tabs will fall within
                the selected time period based on the <strong>action date</strong>.
                When the subaward toggle is selected, all results will be filtered based on
                action date.
            </p>
            <p>
                Please note that prime award and subaward data on Advanced Search begin in
                Fiscal Year 2008. Earlier data, starting in Fiscal Year 2001, can be found
                in the Custom Award Data Download.
            </p>
        </div>
    </div>
);

export const KeyWordTooltip = () => (
    <div className="advanced-search-tt">
        <h3 className="advanced-search-tt__header">
            Keyword
        </h3>
        <div className="advanced-search-tt__body">
            <p>
                The <strong>Keyword</strong> field currently matches against
                the following attributes:
            </p>
            <ul className="advanced-search-tt__list">
                <li>Recipient Name</li>
                <li>Recipient UEI</li>
                <li>Recipient Parent UEI</li>
                <li>Recipient {DUNS_LABEL}DUNS</li>
                <li>Recipient Parent {DUNS_LABEL}DUNS</li>
                <li>NAICS code and description</li>
                <li>PSC code and description</li>
                <li>PIID (prime award only)</li>
                <li>FAIN (prime award only)</li>
                <li>URI</li>
                <li>Award Description</li>
            </ul>
        </div>
    </div>
);

export const LocationTooltip = () => (
    <div className="advanced-search-tt">
        <h3 className="advanced-search-tt__header">
            Location
        </h3>
        <div className="advanced-search-tt__body">
            <p>There are two location fields for award data on USAspending.gov: 1) <span className="advanced-search__glossary-term">place of performance</span> and 2) <span className="advanced-search__glossary-term">recipient location</span>.</p>
            <p>Each prime award transaction includes separate fields for the place of performance of the award as well as the business address (recipient location) of the award recipient. Each subaward record includes these two location fields for the prime award recipient, as well as for the subaward recipient.</p>
            <p>Spending amounts may vary based on whether the place of performance or recipient location field is selected as a location filter.</p>
        </div>
    </div>
);

export const DEFTooltip = () => (
    <div className="advanced-search-tt">
        <h3 className="advanced-search-tt__header">
            Disaster Emergency Fund Code (DEFC)
        </h3>
        <div className="advanced-search-tt__body">
            <p>Disaster Emergency Fund Code (DEFC) is an accounting attribute used to track the spending of supplemental funding for disasters and emergencies such as COVID-19. Each code corresponds to one or more legislative bills that authorized the funding.</p>

            <p>By selecting DEFC in this filter and clicking the &quot;Submit Search&quot; button, awards that received funding categorized by DEFC will be displayed in the &quot;Spending by Prime Award&quot; table to the right. The &quot;COVID-19 Obligations&quot; and &quot;COVID-19 Outlays&quot; columns in this table show specific spending amounts for each award.</p>
        </div>
    </div>
);

const CSSOnlyTooltipProps = {
    definition: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    heading: PropTypes.string,
    example: PropTypes.string,
    description: PropTypes.string
};

export const CSSOnlyTooltip = (props) => (
    <div
        className={`tooltip-popover-container ${props.description ? 'tooltip-popover-container_description' : ''}`}
        tabIndex="0"
        role="button">
        {<span className="tooltip-popover-container__description">{props.description}</span> || ''}
        <FontAwesomeIcon icon="info-circle" />
        <span className="advanced-search-css-tooltip tooltip-popover">
            <div className="advanced-search-css-tooltip__heading">
                {props.heading}
            </div>
            <div className="advanced-search-css-tooltip__definition">
                {props.definition}
            </div>
            <div className="advanced-search-css-tooltip__example">
                {props.example ? `Example value: ${props.example}` : ''}
            </div>
        </span>
    </div>
);

CSSOnlyTooltip.propTypes = CSSOnlyTooltipProps;
