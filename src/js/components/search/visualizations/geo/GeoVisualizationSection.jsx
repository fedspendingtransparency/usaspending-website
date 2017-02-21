/**
 * GeoVisualizationSection.jsx
 * Created by Kevin Li 2/13/17
 */

import React from 'react';

import GeoVisualizationScopeButton from './GeoVisualizationScopeButton';
import MapWrapper from './MapWrapper';

const propTypes = {
    scope: React.PropTypes.string,
    changeScope: React.PropTypes.func
};

export default class GeoVisualizationSection extends React.Component {
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

                    <div className="visualization-scope">
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

                <MapWrapper {...this.props} />
            </div>
        );
    }
}

GeoVisualizationSection.propTypes = propTypes;
