/**
 * AwardAmounts.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import IdvAwardAmountsSectionContainer from 'containers/awardV2/idv/IdvAwardAmountsSectionContainer';
import ResultsTableTabs from 'components/search/table/ResultsTableTabs';
import ResultsTablePicker from 'components/search/table/ResultsTablePicker';
import IDVAmounts from './IDVAmounts';
import InfoTooltip from '../../shared/InfoTooltip';
import { awardAmountsInfo } from '../../shared/InfoTooltipContent';

const propTypes = {
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

export default class AwardAmounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'awards'
        };

        this.switchTab = this.switchTab.bind(this);
    }
    switchTab(tab) {
        this.setState({
            active: tab
        });
    }
    render() {
        const tabTypes = [
            {
                enabled: true,
                internal: 'awards',
                label: 'Award Orders Under this IDV'
            },
            {
                enabled: true,
                internal: 'idv',
                label: 'This IDV'
            }
        ];

        const awards = this.props.overview;
        const content = this.state.active === 'awards' ? (
            <IdvAwardAmountsSectionContainer
                jumpToSection={this.props.jumpToSection} />
        ) : (
            <IDVAmounts
                awards={awards} />
        );
        const tabsClassName = 'idv-award-amounts-tabs';
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <h3 className="award-viz__title">
                        $ Award Amounts
                    </h3>
                    <InfoTooltip wide>
                        { awardAmountsInfo }
                    </InfoTooltip>
                </div>
                <hr />
                <div className="award-viz__tabs">
                    <ResultsTableTabs
                        types={tabTypes}
                        active={this.state.active}
                        switchTab={this.switchTab}
                        tabsClassName={tabsClassName}
                        hideCounts />
                    <ResultsTablePicker
                        types={tabTypes}
                        active={this.state.active}
                        switchTab={this.switchTab} />
                </div>
                {content}
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
