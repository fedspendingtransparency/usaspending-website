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
import GlossaryLink from '../../../sharedComponents/GlossaryLink';

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
    updateMapLegendToggle: PropTypes.func,
    subaward: PropTypes.bool
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
        this.handleUpdateTitle = this.handleUpdateTitle.bind(this);
        this.handleUpdateBody = this.handleUpdateBody.bind(this);
    }

    componentDidMount() {
    // check if the disclaimer cookie exists
        if (!Cookies.get('usaspending_search_map_disclaimer')) {
            // cookie does not exist, show the disclaimer
            this.showDisclaimer();
        }

        this.handleUpdateTitle();
        this.handleUpdateBody();
    }

    componentDidUpdate(prevProps) {
        if (this.props.subaward !== prevProps.subaward) {
            this.handleUpdateTitle();
            this.handleUpdateBody();
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
    handleUpdateTitle() {
        const toggleValue = document.querySelector(".subaward-toggle"); // if true it's a prime award, false sub-award
        const primeAwardTitle = "Spending by Geography";
        const subAwardTitle = "Sub-Award Spending by Geography";
        if (toggleValue.ariaPressed === "true") {
            this.setState({
                tableTitle: primeAwardTitle
            });
        } else {
            this.setState({
                tableTitle: subAwardTitle
            });
        }
    }

    handleUpdateBody() {
        const toggleValue = document.querySelector(".subaward-toggle"); // if true it's a prime award, false sub-award
        const primeAwardBody = [<>Use the map below to break down spending by state, county, or congressional district.{<><br /><br /></>}The data in the map represent  {<span className="award-search__glossary-term"> obligation</span>}{' '}{<GlossaryLink term="obligation" />} amounts for prime award {<span className="award-search__glossary-term"> transactions</span>}{' '}{<GlossaryLink term="transaction" />} within the selected filters. Prime award transactions with the same unique award ID are grouped under a single prime award summary. Prime award summaries can be viewed in the Table tab.</>];
        const subAwardBody = (
            [<>Use the map below to break down spending by state, county, or congressional district.{<><br /><br /></>}
            The data below represent{<span className="award-search__glossary-term"> sub-awards</span>}{' '}{<GlossaryLink term="sub-award" />} that meet the selected filter criteria. For example, if you filter by Place of Performance in your county, you will see only sub-awards with Place of Performance in your county, but you will not see all sub-awards whose prime award lists Place of Performance in your county.{<><br /><br /></>}
            Sub-award amounts are funded by prime award obligations and outlays. In theory, the total value of all sub-award amounts for any given prime award is a subset of the Current Award Amount for that prime award; sub-award amounts generally should not exceed the Current Award Amount for their associated prime award. To avoid double-counting the overall value of a prime award, do not sum up sub-award amounts and prime award obligations or outlays.
            </>]);
        if (toggleValue.ariaPressed === "true") {
            this.setState({
                tableBody: primeAwardBody
            });
        } else {
            this.setState({
                tableBody: subAwardBody
            });
        }
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
                    {this.state.tableTitle}
                </h2>
                <hr
                    className="results-divider"
                    ref={(hr) => {
                        this.sectionHr = hr;
                    }} />

                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            {this.state.tableBody}
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
