import React from 'react';
import PropTypes from 'prop-types';

import AwardSection from '../shared/AwardSection';
import AwardSectionHeader from '../shared/AwardSectionHeader';
import { CFDAOverviewInfo } from '../shared/InfoTooltipContent';

const propTypes = {
    number: PropTypes.string,
    title: PropTypes.string
};

const displayCfdaNumberAndTitle = (number, title) => {
    if (number && title) {
        return `${number} - ${title}`;
    }
    if (!number && title) {
        return title;
    }
    if (number && !title) {
        return number;
    }
    return '--';
};

const CFDAOverview = ({
    number = '',
    title = ''
}) => (
    <AwardSection type="column">
        <AwardSectionHeader
            left={false}
            title="CFDA Program / Assistance Listing"
            tooltip={CFDAOverviewInfo} />
        <div className="award-overview__body award-overview__cfda">
            <span>
                {displayCfdaNumberAndTitle(number, title)}
            </span>
        </div>
    </AwardSection>
);

CFDAOverview.propTypes = propTypes;
export default CFDAOverview;
