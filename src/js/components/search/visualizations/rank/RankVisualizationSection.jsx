/**
  * RankVisualizationSection.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import _ from 'lodash';

import RankVisualizationTitle from './RankVisualizationTitle';
import RankVisualization from './RankVisualization';
import RankVisualizationScopeButton from './RankVisualizationScopeButton';

const propTypes = {
    agencyScope: React.PropTypes.string,
    changeScope: React.PropTypes.func
};

export default class RankVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: 0,
            visualizationWidth: 0,
            labelWidth: 0
        };

        this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 50);
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

    render() {
        return (
            <div
                className="results-visualization-rank-section"
                id="results-section-rank">
                <RankVisualizationTitle />
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />

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
                                <li>
                                    <RankVisualizationScopeButton
                                        value="office"
                                        label="Offices"
                                        active={this.props.agencyScope === 'office'}
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
            </div>
        );
    }
}

RankVisualizationSection.propTypes = propTypes;
