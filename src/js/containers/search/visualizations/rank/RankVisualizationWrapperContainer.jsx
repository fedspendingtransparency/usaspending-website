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
import * as SearchHelper from 'helpers/searchHelper';

const propTypes = {
    reduxFilters: React.PropTypes.object
};

export class RankVisualizationWrapperContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            labelWidth: 0,
            spendingBy: 'budget_category',
            budgetFiltersSelected: false,
            awardFiltersSelected: false
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.changeSpendingBy = this.changeSpendingBy.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
        this.setFilterStates();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(this.props.reduxFilters, prevProps.reduxFilters)) {
            this.setFilterStates();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    setFilterStates() {
        this.setState({
            budgetFiltersSelected: SearchHelper.budgetFiltersSelected(this.props.reduxFilters),
            awardFiltersSelected: SearchHelper.awardFiltersSelected(this.props.reduxFilters)
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

    handleWindowResize() {
        // determine if the width changed
        const windowWidth = window.innerWidth;
        if (this.state.windowWidth !== windowWidth) {
            // width changed, update the visualization width
            this.setState({
                windowWidth,
                visualizationWidth: this.sectionHr.offsetWidth,
                labelWidth: _.min([this.sectionHr.offsetWidth / 3, 270])
            });
        }
    }

    render() {
        const visualization = this.generateVisualization();

        return (
            <div
                className="results-visualization-rank-section"
                id="results-section-rank">
                <RankVisualizationTitle
                    changeSpendingBy={this.changeSpendingBy} />
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />
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
