import React from 'react';
import PropTypes from 'prop-types';
import { TooltipWrapper } from 'data-transparency-ui';

import { CFDAOverviewInfo } from '../shared/InfoTooltipContent';

const propTypes = {
    cfdaPropgram: PropTypes.string,
    cfdaCount: PropTypes.number,
    jumpToSection: PropTypes.func
};

export default class CFDAOverview extends React.Component {
    constructor(props) {
        super(props);
        this.jumpToCFDASection = this.jumpToCFDASection.bind(this);
    }

    jumpToCFDASection() {
        this.props.jumpToSection('cfda');
    }
    render() {
        const { cfdaCount, cfdaPropgram } = this.props;
        return (
            <div className="award-overview__right-section__cfda award-overview-column first award-overview-column__spacing">
                <h6 className="award-overview-title">
                    {cfdaCount === 1 ?
                        "CFDA Program / Assistance Listing" : "Primary CFDA / Assistance Listing"}
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
                    <div>
                        <button
                            key="cfda"
                            className="cfda-viz__button"
                            onClick={this.jumpToCFDASection}>
                            {cfdaCount === 1 ? "View more info on this program" : `View all ${cfdaCount} CFDA Programs`}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


CFDAOverview.propTypes = propTypes;
