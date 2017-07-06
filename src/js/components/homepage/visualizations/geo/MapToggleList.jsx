/**
 * MapToggleList.jsx
 * Created by Kevin Li 5/19/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import RankVisualizationScopeButton from
    'components/search/visualizations/rank/RankVisualizationScopeButton';

const propTypes = {
    view: PropTypes.string,
    changeView: PropTypes.func
};

export default class MapToggleList extends React.Component {
    render() {
        return (
            <div className="homepage-map-toggle">
                <ul>
                    <li>
                        <RankVisualizationScopeButton
                            value="map"
                            label="Map View"
                            active={this.props.view === 'map'}
                            changeScope={this.props.changeView} />
                    </li>
                    <li>
                        <RankVisualizationScopeButton
                            value="list"
                            label="List View"
                            active={this.props.view === 'list'}
                            changeScope={this.props.changeView} />
                    </li>
                </ul>
            </div>
        );
    }
}

MapToggleList.propTypes = propTypes;
