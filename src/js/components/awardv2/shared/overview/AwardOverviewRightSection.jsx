import React from 'react';
import PropTypes from 'prop-types';
import AwardSection from '../AwardSection';
import RelatedAwards from './RelatedAwards';
import AwardDates from './AwardDates';

const propTypes = {
    jumpToSubAwardHistoryTable: PropTypes.func,
    jumpToSection: PropTypes.func,
    counts: PropTypes.object,
    overview: PropTypes.object
};

const AwardOverviewRightSection = ({
    jumpToSubAwardHistoryTable,
    jumpToSection,
    counts,
    overview
}) => (
    <AwardSection type="column" className="award-overview-right-section">
        <RelatedAwards
            jumpToSubAwardHistoryTable={jumpToSubAwardHistoryTable}
            jumpToSection={jumpToSection}
            counts={counts}
            overview={overview} />
        <AwardDates
            awardType={overview.category}
            dates={overview.periodOfPerformance} />
    </AwardSection>
);

AwardOverviewRightSection.propTypes = propTypes;
export default AwardOverviewRightSection;
