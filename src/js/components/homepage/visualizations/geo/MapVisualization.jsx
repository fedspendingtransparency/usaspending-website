/**
 * MapVisualization.jsx
 * Created by Emily Gullo 04/05/2017
 */

import React from 'react';
import _ from 'lodash';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';
import ToggleButton from 'components/sharedComponents/ToggleButton';
import MapWrapper from 'components/search/visualizations/geo/MapWrapper';

import GeoTotalTooltip from './tooltips/GeoTotalTooltip';
import GeoCapitaTooltip from './tooltips/GeoCapitaTooltip';

const propTypes = {
    data: React.PropTypes.object,
    showPerCapita: React.PropTypes.bool,
    togglePerCapita: React.PropTypes.func
};

export default class MapVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltipType: GeoTotalTooltip,
            showHover: false,
            selectedItem: {}
        };

        this.mounted = false;

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    componentWillMount() {
        this.mounted = true;
        this.determineTooltipType(this.props.showPerCapita);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showPerCapita !== this.props.showPerCapita) {
            this.determineTooltipType(nextProps.showPerCapita);
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    determineTooltipType(showPerCapita) {
        let tooltip = GeoTotalTooltip;
        if (showPerCapita) {
            tooltip = GeoCapitaTooltip;
        }

        this.setState({
            tooltipType: tooltip
        });
    }

    prepareTotalTooltip(index) {
        return {
            total: this.props.data.total,
            value: this.props.data.values[index]
        };
    }

    prepareCapitaTooltip(index) {
        return {
            value: this.props.data.values[index],
            rank: this.props.data.ranks[index],
            rankCount: this.props.data.ranks.length,
            population: this.props.data.populations[index]
        };
    }

    showTooltip(stateCode, position) {
        if (!this.mounted) {
            return;
        }

        // convert state code to full string name
        const index = _.indexOf(this.props.data.states, stateCode);

        let tooltipValues = this.prepareTotalTooltip(index);
        if (this.props.showPerCapita) {
            tooltipValues = this.prepareCapitaTooltip(index);
        }

        const selectedItem = Object.assign({}, tooltipValues, {
            state: stateCode,
            x: position.x,
            y: position.y
        });

        this.setState({
            selectedItem,
            showHover: true
        });
    }

    hideTooltip() {
        if (!this.mounted) {
            return;
        }

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
                <div className="homepage-map-capita-toggle">
                    <ToggleButton
                        label="Show Spending Per Capita"
                        prefix="toggle-capita"
                        active={this.props.showPerCapita}
                        pressedToggle={this.props.togglePerCapita} />
                </div>

                <div className="homepage-map-citation">
                    <p>
                        The map reflects where obligated funding was used. This is called &quot;place of performance.&quot;
                    </p>
                    <p>
                        Sources: U.S. Census Bureau, Population Division
                    </p>
                    <p>
                        The World Factbook 2013-14. Washington, DC: Central Intelligence Agency, 2013
                        <span className="info-icon">
                            <InfoCircle alt="Citation" />
                        </span>
                    </p>
                </div>
                <MapWrapper
                    {...this.props}
                    tooltip={this.state.tooltipType}
                    showHover={this.state.showHover}
                    selectedItem={this.state.selectedItem}
                    showTooltip={this.showTooltip}
                    hideTooltip={this.hideTooltip} />
            </div>
        );
    }
}

MapVisualization.propTypes = propTypes;
