/**
 * RankVisualization.jsx
 * Created by Kevin Li 2/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { LoadingMessage, ErrorMessage, NoResultsMessage } from 'data-transparency-ui';
import SpendingByCategoriesChart from '../../../search/newResultsView/categories/SpendingByCategoriesChart';

const propTypes = {
    labelSeries: PropTypes.array,
    dataSeries: PropTypes.array,
    linkSeries: PropTypes.array,
    descriptions: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    industryCodeError: PropTypes.bool,
    recipientError: PropTypes.bool
};

const RankVisualization = ({
    labelSeries = [],
    dataSeries = [],
    linkSeries = [],
    descriptions = [],
    loading = true,
    error = false,
    industryCodeError,
    recipientError
}) => {
    let chart = (<NoResultsMessage />);

    if (loading) {
        chart = (<LoadingMessage />);
    }
    else if (error) {
        chart = (<ErrorMessage description="An error has occurred." />);
        if (industryCodeError) {
            chart = (<ErrorMessage description="Industry codes are unavailable for Sub-Awards." />);
        }
        else if (recipientError) {
            chart = (
                <ErrorMessage description="Paging to 10,000 records and above is not available for Spending by Recipient." />
            );
        }
    }
    else if (dataSeries.length > 0) {
        chart = (
            <SpendingByCategoriesChart
                dataSeries={dataSeries}
                labelSeries={labelSeries}
                descriptions={descriptions}
                linkSeries={linkSeries} />
        );
    }

    return (
        <section
            className="results-visualization-rank-container"
            aria-label="Spending by Category">
            {chart}
        </section>
    );
};

RankVisualization.propTypes = propTypes;
export default RankVisualization;
