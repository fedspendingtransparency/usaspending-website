/**
  * AwardHistory.jsx
  * Created by David Trinh 12/10/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';

import { AwardLoop } from 'components/sharedComponents/icons/Icons';
import { awardHistorySectionTooltip } from 'dataMapping/awardsv2/awardHistorySection';
import TablesSection from './TablesSection';
import AwardSectionHeader from '../AwardSectionHeader';

const propTypes = {
    overview: PropTypes.object,
    setActiveTab: PropTypes.func,
    activeTab: PropTypes.string,
    awardId: PropTypes.string
};

const AwardHistory = ({
    overview,
    setActiveTab,
    activeTab,
    awardId
}) => {
    const sectionTitle = (overview.category === 'idv')
        ? "Award History for this IDV"
        : "Award History";
    const tooltip = awardHistorySectionTooltip(overview.category);

    return (
        <div id="award-award-history" className="award-viz award-history">
            <AwardSectionHeader
                title={sectionTitle}
                icon={<AwardLoop alt="Award History" />}
                tooltip={tooltip}
                tooltipWide={(overview.category === 'contract')} />
            <TablesSection
                awardId={awardId}
                overview={overview}
                clickTab={setActiveTab}
                activeTab={activeTab} />
        </div>
    );
};

AwardHistory.propTypes = propTypes;

export default AwardHistory;
