/**
 * RankVisualization.jsx
 * Created by Kevin Li 2/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { LoadingMessage, ErrorMessage, NoResultsMessage } from 'data-transparency-ui';
import SpendingByCategoriesChart from './spendingByCategoriesChart/SpendingByCategoriesChart';

const defaultProps = {
    labelSeries: [],
    dataSeries: [],
    linkSeries: [],
    descriptions: [],
    width: 0,
    loading: true,
    error: false,
    disableTooltip: false,
    urlRoot: ''
};

const propTypes = {
    dataSeries: PropTypes.array,
    linkSeries: PropTypes.array,
    descriptions: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    meta: PropTypes.object,
    disableTooltip: PropTypes.bool,
    industryCodeError: PropTypes.bool,
    recipientError: PropTypes.bool
};

export default class RankVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: {}
        };
    }

    render() {
        let chart = (<NoResultsMessage />);

        if (this.props.loading) {
            chart = (<LoadingMessage />);
        }
        else if (this.props.error) {
            chart = (<ErrorMessage description="An error has occurred." />);
            if (this.props.industryCodeError) {
                chart = (<ErrorMessage description="Industry codes are unavailable for Sub-Awards." />);
            }
            else if (this.props.recipientError) {
                chart = (<ErrorMessage description="Paging to 10,000 records and above is not available for Spending by Recipient." />);
            }
        }
        else if (this.props.dataSeries.length > 0) {
            chart = (<SpendingByCategoriesChart {...this.props} />);
        }

        return (
            <section
                className="results-visualization-rank-container"
                aria-label="Spending by Category">
                {chart}
            </section>
        );
    }
}

RankVisualization.propTypes = propTypes;
RankVisualization.defaultProps = defaultProps;
