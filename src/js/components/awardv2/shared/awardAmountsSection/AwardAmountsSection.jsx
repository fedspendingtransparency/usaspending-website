import React from 'react';

import AwardSection from '../AwardSection';
import AwardSectionHeader from '../AwardSectionHeader';
import AwardAmountsChart from './charts/AwardAmountsChart';
import AwardAmountsTable from './AwardAmountsTable';
import { AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS, TOOLTIP_PROPS, AWARD_TYPE_PROPS } from '../../../../propTypes';

const propTypes = {
    awardType: AWARD_TYPE_PROPS,
    awardOverview: AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS,
    tooltipProps: TOOLTIP_PROPS
};

// TODO: In DEV-3279, Abstract all of this horrible logic to its own component.
export default class AwardAmounts extends React.Component {
    render() {
        const { awardOverview, awardType } = this.props;
        return (
            <AwardSection type="column" className="award-viz award-amounts">
                <div className="award__col__content">
                    <AwardSectionHeader title="$ Award Amounts" />
                    <div>
                        <div className="award-amounts__content">
                            <AwardAmountsChart awardOverview={this.props.awardOverview} awardType={this.props.awardType} />
                            <AwardAmountsTable awardData={awardOverview} awardType={awardType} />
                        </div>
                    </div>
                </div>
            </AwardSection>
        );
    }
}

AwardAmounts.propTypes = propTypes;
