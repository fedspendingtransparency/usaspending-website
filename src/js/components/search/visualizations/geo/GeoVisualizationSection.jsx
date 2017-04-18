/**
 * GeoVisualizationSection.jsx
 * Created by Kevin Li 2/13/17
 */

import React from 'react';

import _ from 'lodash';

import GeoVisualizationScopeButton from './GeoVisualizationScopeButton';
import MapWrapper from './MapWrapper';

const propTypes = {
    scope: React.PropTypes.string,
    changeScope: React.PropTypes.func,
    data: React.PropTypes.object,
    total: React.PropTypes.number
};

export default class GeoVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHover: false,
            selectedItem: {}
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showTooltip(stateCode, position) {
        // convert state code to full string name
        const index = _.indexOf(this.props.data.states, stateCode);
        this.setState({
            showHover: true,
            selectedItem: {
                state: stateCode,
                total: this.props.total,
                value: this.props.data.values[index],
                x: position.x,
                y: position.y
            }
        });
    }

    hideTooltip() {
        this.setState({
            showHover: false,
            selectedItem: {}
        });
    }

    render() {
        return (
            <div
                className="results-visualization-geo-section"
                id="results-section-geo">
                <h3>Spending by Geography</h3>
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />

                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            Explore the map to see a breakdown of spending by state, city, and
                            county. Filter your results more (at left) and watch this graph update
                            automatically. View your results by place of performance or recipient
                            location.
                        </div>
                    </div>

                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <GeoVisualizationScopeButton
                                        value="pop"
                                        label="Place of Performance"
                                        active={this.props.scope === 'pop'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <GeoVisualizationScopeButton
                                        value="recipient"
                                        label="Recipient Location"
                                        active={this.props.scope === 'recipient'}
                                        changeScope={this.props.changeScope} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <MapWrapper
                    {...this.props}
                    showHover={this.state.showHover}
                    selectedItem={this.state.selectedItem}
                    showTooltip={this.showTooltip}
                    hideTooltip={this.hideTooltip} />

            </div>
        );
    }
}

GeoVisualizationSection.propTypes = propTypes;
