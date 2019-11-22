import React from 'react';
import PropTypes from 'prop-types';
import AwardSection from '../AwardSection';
import RelatedAwards from './RelatedAwards';
import AwardDates from './AwardDates';
import CFDAOverview from '../../financialAssistance/CFDAOverview';

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
}) => {
    const leftSection = (overview.category !== 'idv' && overview.category !== 'contract') ?
        (<CFDAOverview cfdaPropgram={overview.cfdaProgram} />) :
        (<RelatedAwards
            jumpToSubAwardHistoryTable={jumpToSubAwardHistoryTable}
            jumpToSection={jumpToSection}
            counts={counts}
            overview={overview} />);
    const dates = overview.category === 'idv' ? overview.dates : overview.periodOfPerformance;
    return (
        <AwardSection type="column" className="award-overview__right-section award-overview-column">
            {leftSection}
            <AwardDates
                awardType={overview.category}
                dates={dates} />
        </AwardSection>
    );
}

AwardOverviewRightSection.propTypes = propTypes;
export default AwardOverviewRightSection;
