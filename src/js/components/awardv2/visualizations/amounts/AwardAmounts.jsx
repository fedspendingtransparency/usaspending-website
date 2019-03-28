/**
 * AwardAmounts.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import AwardAmountsContainer from 'containers/awardV2/visualization/AwardAmountsContainer';
import ResultsTableTabs from 'components/search/table/ResultsTableTabs';
import ResultsTablePicker from 'components/search/table/ResultsTablePicker';
import IDVAmounts from './IDVAmounts';
import InfoTooltip from '../../idv/InfoTooltip';

const propTypes = {
    overview: PropTypes.object,
    awardId: PropTypes.string,
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
                label: 'Awards that Reference this IDV'
            },
            {
                enabled: true,
                internal: 'idv',
                label: 'This IDV'
            }
        ];

        const awards = this.props.overview;
        const content = this.state.active === 'awards' ? (
            <AwardAmountsContainer
                jumpToSection={this.props.jumpToSection} />
        ) : (
            <IDVAmounts
                awards={awards} />
        );
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <h3 className="award-viz__title">
                        $ Award Amounts
                    </h3>
                    <InfoTooltip>
                        <div className="info-tooltip__title">
                            Award Amounts
                        </div>
                        <div className="info-tooltip__text">
                            <p>
                                This section provides information on the value of the award at two different levels, shown separately under the following tabs:
                            </p>
                            <ul>
                                <li>
                                    <strong>Award Orders Made Under this IDV</strong> – The information within this tab is derived from the data of every award made under this IDV, not the IDV award itself. This is done because award amount data is not typically found in IDV award records themselves. In order to provide a better idea of the actual value of the IDV as a whole, award amounts are taken from every award made under the IDV and then aggregated (or summed together) and presented here.
                                </li>
                                <li>
                                    <strong>This IDV</strong> – This tab contains data that is directly attributed to the IDV record summarized on this page. This data does not include the data attributed to the awards made under it.  In many cases, the data directly attributed to an IDV record does not show actual award amounts, which is why the amounts in this tab are often $0.
                                </li>
                            </ul>
                        </div>
                    </InfoTooltip>
                </div>
                <hr />
                <div className="award-viz__tabs">
                    <ResultsTableTabs
                        types={tabTypes}
                        active={this.state.active}
                        switchTab={this.switchTab}
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
