/**
 * AwardSpendingAgency.jsx
 * Created by James Lee 6/18/20
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { fetchAgencyCount } from 'apis/disaster';
import DateNote from 'components/covid19/DateNote';
import Note, { dodNote } from 'components/sharedComponents/Note';
import { areCountsDefined } from 'helpers/covid19Helper';
import { awardTypeTabs } from 'dataMapping/covid19/covid19';
import { awardTypeGroups } from 'dataMapping/search/awardType';
import AwardSpendingAgencyTableContainer from 'containers/covid19/awardSpendingAgency/AwardSpendingAgencyTableContainer';
import SummaryInsightsContainer from 'containers/covid19/SummaryInsightsContainer';
import { Tabs } from "data-transparency-ui";
import Analytics from 'helpers/analytics/Analytics';

import { scrollIntoView } from '../../../containers/covid19/helpers/scrollHelper';

const overviewData = [
    {
        type: 'resultsCount',
        title: 'Number of Agencies'
    },
    {
        type: 'awardObligations',
        title: 'Award Obligations',
        isMonetary: true
    },
    {
        type: 'awardOutlays',
        title: 'Award Outlays',
        isMonetary: true
    },
    {
        type: 'numberOfAwards',
        title: 'Number of Awards'
    }
];

const initialTabState = {
    all: null,
    contracts: null,
    idvs: null,
    grants: null,
    direct_payments: null,
    loans: null,
    other: null
};

const initialActiveTabState = {
    internal: awardTypeTabs[0].internal,
    subtitle: awardTypeTabs[0].label
};

const propTypes = {
    publicLaw: PropTypes.string
};

const AwardSpendingAgency = ({ publicLaw }) => {
    const { defcParams } = useSelector((state) => state.covid19);
    const [inFlight, setInFlight] = useState(true);
    const [tabCounts, setTabCounts] = useState(initialTabState);
    const [tabs, setTabs] = useState(awardTypeTabs);
    const [activeTab, setActiveTab] = useState(initialActiveTabState);

    const moreOptionsTabsRef = useRef(null);

    useEffect(() => {
        if (defcParams && defcParams.length > 0) {
            let params = {};

            // Make an API request for the count of Agency for each award type
            // Post-MVP this should be updated to use a new endpoint that returns all the counts
            const promises = awardTypeTabs.map((awardType) => {
                params = {
                    filter: {
                        def_codes: defcParams
                    }
                };
                if (awardType.internal === 'all') {
                    params.filter.award_type_codes = [].concat(...Object.values(awardTypeGroups));
                }
                else {
                    params.filter.award_type_codes = awardTypeGroups[awardType.internal];
                }
                return fetchAgencyCount(params).promise;
            });
            // Wait for all the requests to complete and then store the results in state
            Promise.all(promises)
                .then(([allRes, grantsRes, loansRes, directPaymentsRes, otherRes, contractsRes, idvsRes]) => {
                    setTabCounts({
                        all: allRes.data.count,
                        contracts: contractsRes.data.count,
                        idvs: idvsRes.data.count,
                        grants: grantsRes.data.count,
                        direct_payments: directPaymentsRes.data.count,
                        loans: loansRes.data.count,
                        other: otherRes.data.count
                    });
                });
        }
    }, [defcParams]);

    useEffect(() => {
        const countState = areCountsDefined(tabCounts);
        if (!countState) {
            setInFlight(true);
        }
        else if (countState) {
            setInFlight(false);
        }
    }, [tabCounts, setInFlight]);

    useEffect(() => {
        setTabs(tabs.map((tab) => ({ ...tab, count: tabCounts[tab.internal] })));
    }, [tabCounts]);

    const changeActiveTab = (tab) => {
        const tabSubtitle = awardTypeTabs.find((item) => item.internal === tab).label;
        const tabInternal = awardTypeTabs.find((item) => item.internal === tab).internal;

        setActiveTab({
            internal: tabInternal,
            subtitle: tabSubtitle
        });

        Analytics.event({ event: 'covid_award_spending_agency', category: 'COVID-19 - Award Spending by Agency', action: `${tabSubtitle} - click` });
    };

    const scrollIntoViewTable = (loading, error, errorOrLoadingRef, tableWrapperRef, margin, scrollOptions) => {
        scrollIntoView(loading, error, errorOrLoadingRef, tableWrapperRef, margin, scrollOptions, moreOptionsTabsRef);
    };

    return (
        <div className="body__content spending-by-agency">
            <DateNote />
            {publicLaw === 'american-rescue-plan' ?
                <h4 className="body__narrative">
                    <strong>Which agencies</strong> issued awards using American Rescue Plan funds?
                </h4> :
                <h4 className="body__narrative">
                    <strong>Which agencies</strong> issued awards using COVID-19 funds?
                </h4>
            }
            <div className="body__narrative-description">
                {publicLaw === 'american-rescue-plan' ?
                    <p>
                        Federal agencies receive funding from Congress, and they issue awards to recipients using those funds. In this section we show which agencies and sub-agencies have awarded funds from the American Rescue Plan, as well as a breakdown of their obligated and outlayed funds.
                    </p> :
                    <p>
                        Federal agencies receive funding from Congress and they issue awards to recipients using those funds. In this section we show which agencies and sub-agencies have awarded funds in response to the COVID-19 pandemic, as well as a breakdown of their obligated and outlayed funds.
                    </p>
                }
                <p>
                    <em>Please note that agencies without COVID-19 appropriated funds are not represented here.</em>
                </p>
            </div>
            <div ref={moreOptionsTabsRef}>
                <Tabs active={activeTab.internal} types={tabs} switchTab={changeActiveTab} />
            </div>
            <SummaryInsightsContainer
                resultsCount={tabCounts[activeTab.internal]}
                overviewData={overviewData}
                activeTab={activeTab.internal}
                areCountsLoading={inFlight}
                spendingByAgencyOnly />
            <div className="spending-by-agency__content">
                <AwardSpendingAgencyTableContainer type={activeTab.internal} subHeading="Sub-Agencies" scrollIntoView={scrollIntoViewTable} />
                <Note message={dodNote} />
                {publicLaw === 'american-rescue-plan' ?
                    <Note message={(
                        <>
                            This table uses data tagged with Disaster Emergency Fund Code (DEFC) V, which was designated for Non-emergency P.L. 117-2, American Rescue Plan Act of 2021.
                        </>
                    )} /> : <div />
                }
            </div>
        </div>
    );
};

AwardSpendingAgency.propTypes = propTypes;
export default AwardSpendingAgency;
