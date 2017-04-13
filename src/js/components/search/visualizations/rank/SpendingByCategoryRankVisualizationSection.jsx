/**
 * SpendingByCategoryRankVisualizationSection.jsx
 * Created by Kevin Li 12/13/16
 **/

import React from 'react';
import _ from 'lodash';

import * as Icons from 'components/sharedComponents/icons/Icons';

import RankVisualization from './RankVisualization';
import RankVisualizationScopeButton from './RankVisualizationScopeButton';

const propTypes = {
    scope: React.PropTypes.string,
    changeScope: React.PropTypes.func,
    nextPage: React.PropTypes.func,
    previousPage: React.PropTypes.func,
    loading: React.PropTypes.bool,
    hasNextPage: React.PropTypes.bool,
    hasPreviousPage: React.PropTypes.bool
};

export default class SpendingByCategoryRankVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            labelWidth: 0
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
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

    clickPrevious() {
        this.props.previousPage();
    }

    clickNext() {
        this.props.nextPage();
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
        const disableNext = !this.props.hasNextPage;
        const disablePrev = !this.props.hasPreviousPage;
        let hidePager = '';

        if ((disableNext && disablePrev) || this.props.loading) {
            hidePager = 'hide';
        }

        return (
            <div>
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />
                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            View a list of the top Budget Categories from highest to lowest. Filter
                            your results more (at left) and watch this graph update automatically.
                            View your results in a bar graph or a tree map.
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content large">
                            <ul>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="budgetFunctions"
                                        label="Budget Functions"
                                        active={this.props.scope === 'budgetFunctions'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="federalAccounts"
                                        label="Federal Accounts"
                                        active={this.props.scope === 'federalAccounts'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="objectClasses"
                                        label="Object Classes"
                                        active={this.props.scope === 'objectClasses'}
                                        changeScope={this.props.changeScope} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <RankVisualization
                    {...this.props}
                    {...this.state}
                    width={this.state.visualizationWidth}
                    urlRoot="#/federal_account/" />

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

SpendingByCategoryRankVisualizationSection.propTypes = propTypes;
