/**
 * MapVisualization.jsx
 * Created by Emily Gullo 04/05/2017
 */

import React from 'react';

import _ from 'lodash';
import MapWrapper from 'components/search/visualizations/geo/MapWrapper';

const propTypes = {
    data: React.PropTypes.object
};

export default class MapVisualization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showHover: false,
            selectedItem: {}
        };

        this.mounted = false;

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    showTooltip(stateCode, position) {
        if (!this.mounted) {
            return;
        }

        // convert state code to full string name
        const index = _.indexOf(this.props.data.states, stateCode);
        this.setState({
            showHover: true,
            selectedItem: {
                state: stateCode,
                total: this.props.data.total,
                value: this.props.data.values[index],
                x: position.x,
                y: position.y
            }
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

MapVisualization.propTypes = propTypes;
