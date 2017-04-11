/**
 * RankVisualizationWrapperContainer.jsx
 * Created by michaelbray on 4/3/17.
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import RankVisualizationSectionContainer from
    'containers/search/visualizations/rank/RankVisualizationSectionContainer';

import SpendingByCategoryRankVisualizationSectionContainer from
    'containers/search/visualizations/rank/SpendingByCategoryRankVisualizationSectionContainer';

import RankVisualizationTitle from 'components/search/visualizations/rank/RankVisualizationTitle';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';
import * as BudgetCategoryHelper from 'helpers/budgetCategoryHelper';

const propTypes = {
    reduxFilters: React.PropTypes.object
};

export class RankVisualizationWrapperContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            spendingBy: 'budget_category',
            budgetFiltersSelected: false,
            awardFiltersSelected: false
        };

        this.changeSpendingBy = this.changeSpendingBy.bind(this);
    }

    componentDidMount() {
        this.setFilterStates();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.reduxFilters, prevProps.reduxFilters)) {
            this.setFilterStates();
        }
    }

    setFilterStates() {
        this.setState({
            budgetFiltersSelected:
                BudgetCategoryHelper.budgetFiltersSelected(this.props.reduxFilters),
            awardFiltersSelected:
                BudgetCategoryHelper.awardFiltersSelected(this.props.reduxFilters)
        });
    }

    generateVisualization() {
        switch (this.state.spendingBy) {
            case 'budget_category':
                return <SpendingByCategoryRankVisualizationSectionContainer {...this.state} />;
            case 'awarding_agency':
                return <RankVisualizationSectionContainer {...this.state} />;
            default:
                return <SpendingByCategoryRankVisualizationSectionContainer {...this.state} />;
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
                    changeSpendingBy={this.changeSpendingBy} />
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
