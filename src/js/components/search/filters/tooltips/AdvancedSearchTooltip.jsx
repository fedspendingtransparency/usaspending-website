/**
 * KeywordHover.jsx
 * Created by Kevin Li 12/4/17
 */

import React from 'react';
import { DUNS_LABEL } from 'GlobalConstants';

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
