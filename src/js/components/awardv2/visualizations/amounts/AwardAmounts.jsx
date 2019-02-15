/**
 * AwardAmounts.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import AwardAmountsContainer from 'containers/awardV2/visualization/AwardAmountsContainer';
import ResultsTableTabs from 'components/search/table/ResultsTableTabs';
import ResultsTablePicker from 'components/search/table/ResultsTablePicker';

const propTypes = {
    awardId: PropTypes.string
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
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <h3 className="award-viz__title">
                        $ Award Amounts
                    </h3>
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
                <AwardAmountsContainer awardId={this.props.awardId} />
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
