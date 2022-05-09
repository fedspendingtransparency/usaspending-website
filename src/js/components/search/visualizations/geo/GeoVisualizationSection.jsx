/**
 * GeoVisualizationSection.jsx
 * Created by Kevin Li 2/13/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import MapboxGL from 'mapbox-gl/dist/mapbox-gl';

import ResultsTableErrorMessage from 'components/search/table/ResultsTableErrorMessage';
import LoadingSpinner from 'components/sharedComponents/LoadingSpinner';
import { ExclamationTriangle } from 'components/sharedComponents/icons/Icons';
import Note from 'components/sharedComponents/Note';
import { noteMessage } from 'dataMapping/search/geoVisualizationSection';

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
    loading: PropTypes.bool,
    error: PropTypes.bool,
    noResults: PropTypes.bool,
    mapLegendToggle: PropTypes.string,
    updateMapLegendToggle: PropTypes.func
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

    componentDidMount() {
    // check if the disclaimer cookie exists
        if (!Cookies.get('usaspending_search_map_disclaimer')) {
            // cookie does not exist, show the disclaimer
            this.showDisclaimer();
        }
    }

    showDisclaimer = () => this.setState({ showDisclaimer: true });

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
        if (!MapboxGL.supported()) {
            return (
                <div className="results-table-message-container">
                    <ResultsTableErrorMessage title="WebGL Required for this map." description="Please enable WebGL in your browser settings to view this map visualization." />
                </div>
            );
        }

        let disclaimer = null;
        if (this.state.showDisclaimer) {
            disclaimer = (<MapDisclaimer
                closeDisclaimer={this.closeDisclaimer} />);
        }

        let message = null;

        if (this.props.loading) {
            message = (
                <MapMessage>
                    <div className="map-loading">
                        <LoadingSpinner />
                        <div className="loading-message">
                            Gathering your data...
                        </div>
                    </div>
                </MapMessage>
            );
        }
        else if (this.props.error) {
            message = (
                <MapMessage>
                    <div className="map-no-results">
                        <div className="error-icon">
                            <ExclamationTriangle alt="An error occurred" />
                        </div>
                        <div className="title">
                            An error occurred.
                        </div>
                        <div className="description">
                            Something went wrong while gathering your data.
                        </div>
                    </div>
                </MapMessage>
            );
        }
        else if (this.props.noResults) {
            message = (
                <MapMessage>
                    <div className="map-no-results">
                        <div className="no-results-icon" />
                        <div className="title">
                            No results found in the current map area.
                        </div>
                    </div>
                </MapMessage>
            );
        }

        return (
            <section
                className="results-visualization-geo-section"
                id="results-section-geo"
                aria-label="Spending by Geography">
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
                            Explore the map to see a breakdown of spending by state, county, or congressional district. View your results by place of performance or recipient location, and hover over your chosen location for more detailed information.
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
                    showLayerToggle
                    center={[-95.569430, 38.852892]}
                    mapLegendToggle={this.props.mapLegendToggle}
                    updateMapLegendToggle={this.props.updateMapLegendToggle}>
                    {disclaimer}
                    {message}
                </MapWrapper>
                <Note message={noteMessage} />
            </section>
        );
    }
}

GeoVisualizationSection.propTypes = propTypes;
