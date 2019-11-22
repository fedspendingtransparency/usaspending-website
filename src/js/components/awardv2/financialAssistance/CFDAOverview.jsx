import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';

import { CFDAOverviewInfo } from '../shared/InfoTooltipContent';

const propTypes = {
    cfdaPropgram: PropTypes.string
};

const CFDAOverview = ({
    cfdaPropgram
}) => (
    <div className="award-overview__right-section__cfda">
        <h6 className="award-overview-title">
            CFDA Program / Assistance Listing
            <TooltipWrapper
                className="award-section-tt"
                icon="info"
                left
                tooltipComponent={CFDAOverviewInfo} />
        </h6>
        <div className="award-overview__body award-overview__cfda">
            <span>
                {cfdaPropgram}
            </span>
        </div>
    </div>
);

CFDAOverview.propTypes = propTypes;
export default CFDAOverview;
