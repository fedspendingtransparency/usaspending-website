/**
 * AwardHistory.jsx
 * Created by David Trinh 12/10/2018
 **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { tabs, awardTypesWithSubawards } from 'dataMapping/award/awardHistorySection';
import { getToolTipBySectionAndAwardType } from 'dataMapping/award/tooltips';
import { Tabs } from "data-transparency-ui";
import { AwardLoop } from 'components/sharedComponents/icons/Icons';
import AwardSectionHeader from 'components/award/shared/AwardSectionHeader';
import { getAwardHistoryCounts } from "../../../helpers/awardHistoryHelper";
import AwardHistoryTableContainer from "../table/AwardHistoryTableContainer";

const propTypes = {
    overview: PropTypes.object,
    setActiveTab: PropTypes.func,
    activeTab: PropTypes.string
};

const AwardHistory = ({
    overview, setActiveTab, activeTab
}) => {
    const [tabOptions, setTabOptions] = useState([]);

    const sectionTitle = (overview.category === 'idv')
        ? "Award History for this IDV"
        : "Award History";
    const tooltip = getToolTipBySectionAndAwardType('awardHistory', overview.category);
    let countRequest = null;

    const setTableTabsAndGetCounts = (award = overview) => {
        if (countRequest) {
            countRequest.cancel();
        }

        const tabsWithCounts = tabs(award.category)
            .filter((tab) => {
                if (tab.internal === 'subaward' && !awardTypesWithSubawards.includes(award.category)) {
                    return false;
                }
                return true;
            })
            .map(async (tab) => {
                const isIdv = (award.category === 'idv');
                countRequest = getAwardHistoryCounts(tab.internal, award.generatedId, isIdv);
                try {
                    const { data } = await countRequest.promise;
                    if (isIdv && tab.internal === 'federal_account') {
                        // response object for idv federal account endpoint is { count: int }
                        return { ...tab, count: data.count };
                    }
                    // response object for all other count endpoints are { [tab.internal + s] int }
                    return { ...tab, count: data[`${tab.internal}s`] };
                }
                catch (error) {
                    console.log(`Error fetching ${tab.internal} counts: ${error}`);
                    return { ...tab, count: 'N/A' };
                }
            });

        return Promise.all(tabsWithCounts)
            .then((result) => {
                setTabOptions(result);
                countRequest = null;
            });
    };

    useEffect(() => {
        setTableTabsAndGetCounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [overview.generatedId]);

    return (
        <div id="award-award-history" className="award-viz award-history">
            <AwardSectionHeader
                title={sectionTitle}
                icon={<AwardLoop alt="Award History" />}
                tooltip={tooltip}
                tooltipWide={(overview.category === 'contract')} />
            <div className="tables-section">
                <Tabs
                    types={tabOptions}
                    active={activeTab}
                    switchTab={setActiveTab} />
                <div className="tables-content">
                    <AwardHistoryTableContainer
                        category={overview.category}
                        activeTab={activeTab}
                        tabOptions={tabOptions} />
                </div>
            </div>
        </div>
    );
};

AwardHistory.propTypes = propTypes;

export default AwardHistory;
