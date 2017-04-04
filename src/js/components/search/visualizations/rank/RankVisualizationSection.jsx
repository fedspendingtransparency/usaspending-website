/**
  * RankVisualizationSection.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';

import * as Icons from 'components/sharedComponents/icons/Icons';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import RankVisualization from './RankVisualization';
import RankVisualizationScopeButton from './RankVisualizationScopeButton';

const propTypes = {
    agencyScope: React.PropTypes.string,
    changeScope: React.PropTypes.func,
    nextPage: React.PropTypes.func,
    previousPage: React.PropTypes.func,
    loading: React.PropTypes.bool,
    hasNextPage: React.PropTypes.bool,
    hasPreviousPage: React.PropTypes.bool,
    visualizationWidth: React.PropTypes.number,
    labelWidth: React.PropTypes.number
};

export default class RankVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.clickPrevious = this.clickPrevious.bind(this);
        this.clickNext = this.clickNext.bind(this);
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
            <div>
                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            View a list of the top Awarding Agencies from highest to lowest. Filter
                            your results more (at left) and watch this graph update automatically.
                             View your results in a bar graph or a tree map.
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="toptier"
                                        label="Agencies"
                                        active={this.props.agencyScope === 'toptier'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="subtier"
                                        label="Sub-Agencies"
                                        active={this.props.agencyScope === 'subtier'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li className="coming-soon">
                                    <RankVisualizationScopeButton
                                        value="office"
                                        label="Offices"
                                        active={this.props.agencyScope === 'office'}
                                        changeScope={this.props.changeScope}
                                        disabled />
                                    <ComingSoonLabel />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <RankVisualization
                    {...this.props}
                    width={this.props.visualizationWidth} />

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

RankVisualizationSection.propTypes = propTypes;
