/**
 * GeoVisualizationSection.jsx
 * Created by Kevin Li 2/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import GeoVisualizationScopeButton from './GeoVisualizationScopeButton';
import MapWrapper from './MapWrapper';
import GeoVisualizationTooltip from './GeoVisualizationTooltip';
import MapDisclaimer from './MapDisclaimer';
import MapMessage from './MapMessage';

const propTypes = {
    scope: PropTypes.string,
    mapLayer: PropTypes.string,
    changeScope: PropTypes.func,
    changeMapLayer: PropTypes.func,
    mapMoved: PropTypes.func,
    renderHash: PropTypes.string,
    data: PropTypes.object,
    total: PropTypes.number,
    message: PropTypes.string
};

const availableLayers = ['state', 'county', 'congressionalDistrict'];

export default class GeoVisualizationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHover: false,
            showDisclaimer: false,
            selectedItem: {}
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.closeDisclaimer = this.closeDisclaimer.bind(this);
    }

    componentWillMount() {
        // check if the disclaimer cookie exists
        if (!Cookies.get('usaspending_search_map_disclaimer')) {
            // cookie does not exist, show the disclaimer
            this.setState({
                showDisclaimer: true
            });
        }
    }

    showTooltip(geoId, position) {
        // convert state code to full string name
        const label = this.props.data.labels[geoId];
        this.setState({
            showHover: true,
            selectedItem: {
                label: label.label,
                total: this.props.total,
                value: label.value,
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

    closeDisclaimer() {
        // set a cookie to hide the disclaimer in the future
        Cookies.set('usaspending_search_map_disclaimer', 'hide', { expires: 730 });
        this.setState({
            showDisclaimer: false
        });
    }

    render() {
        let disclaimer = null;
        if (this.state.showDisclaimer) {
            disclaimer = (<MapDisclaimer
                closeDisclaimer={this.closeDisclaimer} />);
        }

        let loadingMessage = null;
        if (this.props.message !== '') {
            loadingMessage = (<MapMessage message={this.props.message} />);
        }

        return (
            <div
                className="results-visualization-geo-section"
                id="results-section-geo">
                <h2 className="visualization-title">
                    Spending by Geography
                </h2>
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />

                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            Explore the map to see a breakdown of spending by state, county, and congressional district. Filter your results more (at left) and watch this graph update automatically. View your results by place of performance or recipient location.
                        </div>
                    </div>

                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <GeoVisualizationScopeButton
                                        value="place_of_performance"
                                        label="Place of Performance"
                                        active={this.props.scope === 'place_of_performance'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <GeoVisualizationScopeButton
                                        value="recipient_location"
                                        label="Recipient Location"
                                        active={this.props.scope === 'recipient_location'}
                                        changeScope={this.props.changeScope} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <MapWrapper
                    data={this.props.data}
                    renderHash={this.props.renderHash}
                    scope={this.props.mapLayer}
                    changeMapLayer={this.props.changeMapLayer}
                    showHover={this.state.showHover}
                    selectedItem={this.state.selectedItem}
                    showTooltip={this.showTooltip}
                    hideTooltip={this.hideTooltip}
                    tooltip={GeoVisualizationTooltip}
                    availableLayers={availableLayers}
                    showLayerToggle>
                    {disclaimer}
                    {loadingMessage}
                </MapWrapper>

            </div>
        );
    }
}

GeoVisualizationSection.propTypes = propTypes;
