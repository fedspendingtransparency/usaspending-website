/**
 * SummaryInsightsContainer.jsx
 * Created by Lizzie Salita 6/24/20
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { awardTypeGroups, awardTypeGroupLabels } from 'dataMapping/search/awardType';
import { fetchAwardAmounts, fetchAwardCount } from 'helpers/disasterHelper';
import OverviewData from 'components/covid19/OverviewData';
import { useInFlightList } from 'helpers/covid19Helper';

const propTypes = {
    activeTab: PropTypes.string,
    resultsCount: PropTypes.number,
    overviewData: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        label: PropTypes.string
    })),
    areCountsLoading: PropTypes.bool
};

const SummaryInsightsContainer = ({
    activeTab,
    resultsCount,
    overviewData,
    areCountsLoading
}) => {
    const [awardOutlays, setAwardOutlays] = useState(null);
    const [awardObligations, setAwardObligations] = useState(null);
    const [numberOfAwards, setNumberOfAwards] = useState(null);
    const [inFlightList, , removeFromInFlight, resetInFlight] = useInFlightList(
        overviewData.map((d) => d.type)
    );
    const defCodes = useSelector((state) => state.covid19.defCodes);

    useEffect(() => {
        setAwardOutlays(null);
        setAwardObligations(null);
        setNumberOfAwards(null);
        const params = {
            filter: {
                def_codes: defCodes.map((defc) => defc.code)
            }
        };
        if (activeTab !== 'all') {
            params.filter.award_type_codes = awardTypeGroups[activeTab];
        }
        if (defCodes && defCodes.length > 0) {
            fetchAwardAmounts(params).promise
                .then((res) => {
                    setAwardObligations(res.data.obligation);
                    setAwardOutlays(res.data.outlay);
                });
            fetchAwardCount(params).promise
                .then((res) => {
                    setNumberOfAwards(res.data.count);
                });
        }
    }, [defCodes, activeTab]);

    useEffect(() => {
        if (!awardOutlays && !awardObligations && !numberOfAwards) {
            resetInFlight();
        }
        else if (inFlightList) {
            inFlightList.forEach((inFlight) => {
                if (inFlight === 'awardObligations' && awardObligations) {
                    removeFromInFlight('awardObligations');
                }
                else if (inFlight === 'awardOutlays' && awardOutlays) {
                    removeFromInFlight('awardOutlays');
                }
                else if (inFlight === 'numberOfAwards' && numberOfAwards) {
                    removeFromInFlight('numberOfAwards');
                }
            });
        }
    }, [
        awardOutlays,
        awardObligations,
        numberOfAwards,
        inFlightList,
        removeFromInFlight,
        resetInFlight
    ]);

    const amounts = {
        resultsCount,
        awardOutlays,
        awardObligations,
        numberOfAwards
    };

    let subtitle = `for ${activeTab === 'all' ? 'All' : 'all'} ${(awardTypeGroupLabels[activeTab] || 'Awards')}`;
    if (activeTab === 'other') {
        subtitle = 'for all Other Financial Assistance';
    }

    return (
        <div className="overview-data-group">
            {overviewData.map((data) => (
                <OverviewData
                    key={data.label}
                    {...data}
                    subtitle={subtitle}
                    amount={amounts[data.type]}
                    isLoading={data.type === 'resultsCount' ? areCountsLoading : inFlightList.includes(data.type)} />
            ))}
        </div>
    );
};

SummaryInsightsContainer.propTypes = propTypes;
export default SummaryInsightsContainer;
