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
                time period based on their prime award <strong>base transaction action date</strong>{' '}
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

export const NewAwardsTooltip = () => (
    <div className="advanced-search-tt">
        <h3 className="advanced-search-tt__header">
            Show New Awards Only
        </h3>
        <div className="advanced-search-tt__body">
            <p>
                Either a fiscal year has to be selected or a date range has to be specified
                in order for the “Show New Awards Only” checkbox to become available. Please
                note that combining the “All Fiscal Years” filter with the “Show New Awards
                Only” checkbox will return all new awards for all fiscal years.
            </p>
            <p>
                Selecting the “Show New Awards Only” checkbox will display any prime award
                whose <strong>base transaction action date</strong> (the date of the first
                transaction of a prime award) falls within the selected time period.
            </p>
            <p>
                If not selected, search results in the Table tab will display prime awards
                whose <strong>base transaction action date</strong> and{' '}
                <strong>latest transaction action date</strong> (the date of the latest transaction
                of a prime award) overlap in any way with the selected time period. For example,
                for the selected time period of Mar. 1-31, 2022, you would see results in
                the Table tab for an award with a <strong>base transaction action date</strong> of
                Jan. 1, 2022 and a <strong>latest transaction action date</strong> of
                Dec. 31, 2022, even if there is no transaction activity for that award within
                the period of Mar. 1-31, 2022.
            </p>
            <p>
                Since there is no concept of “subaward modification” or “subaward summary
                level” in the FFATA Subaward Reporting System (FSRS) data model, all subawards
                are considered “new.” Therefore, the “Show New Awards Only” checkbox becomes
                disabled and has no effect on searches for subawards.
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

export const CDTooltip = () => (
    <div className="homepage__covid-19-tt cd-tt">
        <h2 className="tooltip__title">
            CONGRESSIONAL DISTRICT (US ONLY)
        </h2>
        <div className="tooltip__text">
            <p>
                <strong>Current Congressional Districts (based on 2023 redistricting)</strong>
            </p>
            <p>
                Use this filter to find spending based on the current geographic boundaries of each congressional district, including for awards that predated those districts.
            </p>
            <p>
                Search results will reflect current congressional districts based on redistricting as a result of the 2020 census. These districts will be in effect from 2023 – 2033.&#42;
            </p>
            <p>
                <em>&#42;Court-ordered redistricting might alter the time frame when a congressional district is in effect.</em>
            </p>
            <p>
                <strong>Original Congressional Districts (as reported by federal agencies)</strong>
            </p>
            <p>
                Use this filter to find spending based on the congressional district boundaries that were in effect when an award was issued.
            </p>
            <p>
                Note that some district boundaries have changed over time.
            </p>
            <p>
            Additional information can be found in the “Congressional District Data” section of the <strong>About the Data</strong> module under <strong>Find Resources</strong>.
            </p>
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
