import React from 'react';
import PropTypes from 'prop-types';
import { InformationBoxes } from "data-transparency-ui";
import { awardTypeGroupLabels } from 'dataMapping/search/awardType';


const propTypes = {
    fy: PropTypes.string,
    agencyId: PropTypes.string,
    activeTab: PropTypes.string,
    prevTab: PropTypes.string,
    summaryData: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string
    }))
};

const SubAgencySummaryContainer = ({
    activeTab,
    fy,
    summaryData
}) => {
    // TODO replace mock data with data via redux
    const amounts = {
        subagenciesCount: 20,
        awardObligations: 10600000000,
        numberOfTransactions: 152400000,
        numberOfAwards: 254521
    };

    let subtitle = `for all ${activeTab === 'all' ? 'Awards' : awardTypeGroupLabels[activeTab]} in FY${fy.substring(2)}`;
    if (activeTab === 'other') {
        subtitle = 'for all Other Financial Assistance';
    }

    return (
        <div className="overview-data-group">
            <InformationBoxes
                boxes={summaryData.map((data) => ({
                    ...data,
                    subtitle,
                    amount: amounts[data.type]
                }))} />
        </div>
    );
};

SubAgencySummaryContainer.propTypes = propTypes;
export default SubAgencySummaryContainer;
