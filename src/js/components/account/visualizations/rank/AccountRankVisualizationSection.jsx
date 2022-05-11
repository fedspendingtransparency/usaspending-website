/**
 * AccountRankVisualizationSection.jsx
 * Created by Kevin Li 3/22/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { throttle, min } from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

import RankVisualization from 'components/search/visualizations/rank/RankVisualization';
import RankVisualizationScopeButton from
    'components/search/visualizations/rank/RankVisualizationScopeButton';

const propTypes = {
    categoryScope: PropTypes.string,
    changeScope: PropTypes.func,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    page: PropTypes.number,
    loading: PropTypes.bool
};

export default class AccountRankVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            labelWidth: 0
        };

        this.handleWindowResize = throttle(this.handleWindowResize.bind(this), 50);
        this.clickPrevious = this.clickPrevious.bind(this);
        this.clickNext = this.clickNext.bind(this);
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
                labelWidth: min([this.sectionHr.offsetWidth / 3, 270])
            });
        }
    }

    clickPrevious() {
        this.props.previousPage();
    }

    clickNext() {
        this.props.nextPage();
    }

    render() {
        const disableNext = !this.props.hasNextPage;
        const disablePrev = !this.props.hasPreviousPage;
        let hidePager = '';

        if ((disableNext && disablePrev) || this.props.loading) {
            hidePager = 'hide';
        }

        return (
            <div
                className="results-visualization-rank-section"
                id="results-section-rank">
                <h3>Spending by Category</h3>
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />

                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            View a list of the top Program Activities from highest to lowest. Filter
                            your results more (at left) and watch this graph update automatically.
                             View your results in a bar graph or a tree map.
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="programActivity"
                                        label="Program Activity"
                                        active={this.props.categoryScope === 'programActivity'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="objectClass"
                                        label="Object Class"
                                        active={this.props.categoryScope === 'objectClass'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="tas"
                                        label="Treasury Account Symbol (TAS)"
                                        active={this.props.categoryScope === 'tas'}
                                        changeScope={this.props.changeScope} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <RankVisualization
                    {...this.props}
                    width={this.state.visualizationWidth}
                    labelWidth={this.state.labelWidth} />

                <div className={`visualization-pager-container ${hidePager}`}>
                    <button
                        className="visualization-pager"
                        title="Show previous five"
                        aria-label="Show previous five"
                        disabled={disablePrev}
                        onClick={this.clickPrevious}>
                        <div className="pager-content">
                            <div className="icon">
                                <Icons.AngleLeft alt="Show previous five" />
                            </div>
                            <div className="pager-label">
                                Show previous five
                            </div>
                        </div>
                    </button>
                    <button
                        className="visualization-pager"
                        title="Show next five"
                        aria-label="Show next five"
                        disabled={disableNext}
                        onClick={this.clickNext}>
                        <div className="pager-content">
                            <div className="pager-label next">
                                Show next five
                            </div>
                            <div className="icon">
                                <Icons.AngleRight alt="Show next five" />
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        );
    }
}

AccountRankVisualizationSection.propTypes = propTypes;
