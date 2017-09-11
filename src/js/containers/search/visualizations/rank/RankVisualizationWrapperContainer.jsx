/**
 * RankVisualizationWrapperContainer.jsx
 * Created by michaelbray on 4/3/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SpendingByAwardingAgencyVisualizationContainer from
    'containers/search/visualizations/rank/SpendingByAwardingAgencyVisualizationContainer';
import SpendingByFundingAgencyVisualizationContainer from
    'containers/search/visualizations/rank/SpendingByFundingAgencyVisualizationContainer';
import SpendingByRecipientVisualizationContainer from
    'containers/search/visualizations/rank/SpendingByRecipientVisualizationContainer';
import SpendingByCFDAVisualizationContainer from
    'containers/search/visualizations/rank/SpendingByCFDAVisualizationContainer';
import SpendingByIndustryCodeVisualizationContainer from
    'containers/search/visualizations/rank/SpendingByIndustryCodeVisualizationContainer';

import RankVisualizationTitle from 'components/search/visualizations/rank/RankVisualizationTitle';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

const propTypes = {
    reduxFilters: PropTypes.object
};

export class RankVisualizationWrapperContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spendingBy: 'awarding_agency'
        };

        this.changeSpendingBy = this.changeSpendingBy.bind(this);
    }

    generateVisualization() {
        switch (this.state.spendingBy) {
            case 'awarding_agency':
                return <SpendingByAwardingAgencyVisualizationContainer />;
            case 'funding_agency':
                return <SpendingByFundingAgencyVisualizationContainer />;
            case 'recipient':
                return <SpendingByRecipientVisualizationContainer />;
            case 'cfda':
                return <SpendingByCFDAVisualizationContainer />;
            case 'industry_code':
                return <SpendingByIndustryCodeVisualizationContainer />;
            default:
                return <SpendingByAwardingAgencyVisualizationContainer />;
        }
    }

    changeSpendingBy(spendingBy) {
        this.setState({ spendingBy });
    }

    render() {
        const visualization = this.generateVisualization();

        return (
            <div
                className="results-visualization-rank-section"
                id="results-section-rank">
                <RankVisualizationTitle
                    changeSpendingBy={this.changeSpendingBy}
                    currentSpendingBy={this.state.spendingBy} />
                { visualization }
            </div>
        );
    }
}

RankVisualizationWrapperContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        reduxFilters: state.filters
    }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(RankVisualizationWrapperContainer);
