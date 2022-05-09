/**
 * AwardOverviewRightSection.jsx
 * Created by Jonathan Hill 11/26/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import AwardSection from '../AwardSection';
import RelatedAwards from './RelatedAwards';
import AwardDates from './AwardDates';
import CFDAOverview from '../../financialAssistance/CFDAOverview';

const propTypes = {
    jumpToSubAwardHistoryTable: PropTypes.func,
    setRelatedAwardsTab: PropTypes.func,
    jumpToSection: PropTypes.func,
    details: PropTypes.object,
    overview: PropTypes.object,
    updateCFDAOverviewLinkClicked: PropTypes.func
};

const AwardOverviewRightSection = ({
    jumpToSubAwardHistoryTable,
    setRelatedAwardsTab,
    jumpToSection,
    details,
    overview,
    updateCFDAOverviewLinkClicked
}) => {
    const firstSection = (overview.category !== 'idv' && overview.category !== 'contract') ?
        (<CFDAOverview
            cfdaProgram={overview.cfdaProgram}
            cfdaCount={overview.cfdaList.length}
            jumpToSection={jumpToSection}
            updateCFDAOverviewLinkClicked={updateCFDAOverviewLinkClicked} />) :
        (<RelatedAwards
            jumpToSubAwardHistoryTable={jumpToSubAwardHistoryTable}
            setRelatedAwardsTab={setRelatedAwardsTab}
            jumpToSection={jumpToSection}
            details={details}
            overview={overview} />);
    const dates = overview.category === 'idv' ? overview.dates : overview.periodOfPerformance;
    return (
        <AwardSection type="column" className="award-overview__right-section award-overview-column">
            {firstSection}
            <AwardDates
                awardType={overview.category}
                dates={dates} />
        </AwardSection>
    );
};

AwardOverviewRightSection.propTypes = propTypes;
export default AwardOverviewRightSection;
