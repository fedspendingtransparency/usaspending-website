/**
 * MapToggleOptions.jsx
 * Created by Kevin Li 5/19/17
 */

import React from 'react';
import RankVisualizationScopeButton from
    'components/search/visualizations/rank/RankVisualizationScopeButton';

const propTypes = {
    view: React.PropTypes.string,
    changeView: React.PropTypes.func
};

export default class MapToggleOptions extends React.Component {
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

MapToggleOptions.propTypes = propTypes;
