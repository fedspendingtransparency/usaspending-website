/**
 * AggregatedAwardAmounts.jsx
 * Created by David Trinh 2/8/19
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ChartError from 'components/search/visualizations/ChartError';
import AggregatedAwardAmountsInfo from 'components/awardv2/visualizations/amounts/AggregatedAwardAmountsInfo';

const propTypes = {
    awardAmounts: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    jumpToSection: PropTypes.func
};

export default class AggregatedAwardAmounts extends React.Component {
    render() {
        let data = null;
        if (this.props.loading) {
            // API request is still pending
            data = (
                <div className="visualization-message-container">
                    <div className="visualization-loading">
                        <div className="message">
                            Gathering your data...
                        </div>
                    </div>
                </div>);
        }
        else if (this.props.error) {
            data = (<ChartError />);
        }
        else {
            // only mount the chart component if there is data to display
            data = (
                <AggregatedAwardAmountsInfo
                    jumpToSection={this.props.jumpToSection}
                    awardAmounts={this.props.awardAmounts} />
            );
        }

        return (
            <div>
                {data}
            </div>
        );
    }
}
AggregatedAwardAmounts.propTypes = propTypes;

