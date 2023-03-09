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
export const FilterTooltip = () => (
    <div className="advanced-search-tt">
        <div className="advanced-search-tt__title" style={{textAlign: "left" }}>
            Learn which data elements are associated with each filter
        </div>
        <div className="advanced-search-tt__body">
            <p>
            The data in award search come primarily from governmentwide award systems in formats called File D1 (for <strong>contract award elements</strong>) and File D2 (for <strong>financial assistance award elements</strong>). If a filter is not listed below, then it applies to both contract and financial assistance award elements.
            </p>

            <p>
            Filters for <strong>agency account elements</strong> apply to both contract and financial assistance award elements, but they come from File C (award data from agency financial systems that are submitted directly to USAspending.gov) rather than from Files D1 or D2.
            </p>
            <br />
            <div className="advanced-search-tt__Filtertooltip">Contract Award Elements</div>
            <p className="advanced-search-tt__body">
            Contract award elements contain information from a governmentwide award system called the Federal Procurement Data System (FPDS). This information is extracted by <a href="http://usaspending.gov/">USAspending.gov</a> in a format called File D1. Filters that draw exclusively from contract award elements are:
            </p>
            <ul className="advanced-search-tt__list">
                <li>North American Industry Classification System (NAICS)</li>
                <li>Product or Service Code (PSC)</li>
                <li>Type of Contract Pricing</li>
                <li>Type of Set Aside</li>
                <li>Extent Competed</li>
            </ul>
            <br />
            <div className="advanced-search-tt__Filtertooltip">Financial Assistance Award Elements</div>
            <p>
            Agency account elements contain information from agency financial systems, and includes information about federal awards in a format called File C. Data in File C complement data in Files D1 and D2, which come from governmentwide award systems. If you select a filter that draws from agency account elements, then these data must be linked to data in governmentwide award systems before any results can be displayed. (The reverse is not true: you may see results from governmentwide award systems that are not linked to data in agency account elements.) Filters that draw exclusively from agency account elements are:
            </p>
            <ul className="advanced-search-tt__list">
                <li>Treasury Account Symbol (TAS)</li>
                <li>Disaster Emergency Fund Code (DEFC)</li>
            </ul>
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
