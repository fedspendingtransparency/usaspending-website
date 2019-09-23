/**
  * AwardHistory.jsx
  * Created by David Trinh 12/10/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';

import { AwardLoop } from 'components/sharedComponents/icons/Icons';
import TablesSection from './TablesSection';
import { awardHistoryIdv, awardHistoryContract } from '../InfoTooltipContent';
import AwardSectionHeader from '../AwardSectionHeader';

const propTypes = {
    overview: PropTypes.object,
    setActiveTab: PropTypes.func,
    activeTab: PropTypes.string
};

const AwardHistory = ({ overview, setActiveTab, activeTab }) => {
    const sectionTitle = (overview.category === 'idv')
        ? "Award History for this IDV"
        : "Award History";
    const tooltip = overview.category === 'contract'
        ? awardHistoryContract
        : awardHistoryIdv;

    return (
        <div id="award-award-history" className="award-viz award-history">
            <AwardSectionHeader
                title={sectionTitle}
                icon={<AwardLoop alt="Award History" />}
                tooltip={tooltip}
                tooltipWide={(overview.category === 'contract')} />
            <TablesSection
                overview={overview}
                clickTab={setActiveTab}
                activeTab={activeTab} />
        </div>
    );
};

AwardHistory.propTypes = propTypes;

export default AwardHistory;
