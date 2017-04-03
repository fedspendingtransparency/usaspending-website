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
            spendingBy: 'budget_category'
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
        this.changeSpendingBy = this.changeSpendingBy.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
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

    changeSpendingBy(spendingBy) {
        this.setState({ spendingBy });
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
