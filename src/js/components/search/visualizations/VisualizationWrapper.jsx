/**
 * VisualizationWrapper.jsx
 * Created by Kevin Li 11/29/17
 */

import React from 'react';

import VisualizationTabItem from './VisualizationTabItem';

const tabOptions = [
    {
        code: 'table',
        label: 'Table',
        icon: 'Table'
    },
    {
        code: 'time',
        label: 'Time',
        icon: 'Calendar'
    },
    {
        code: 'map',
        label: 'Map',
        icon: 'MapMarker'
    },
    {
        code: 'rank',
        label: 'Categories',
        icon: 'Bar'
    }
];

export default class VisualizationWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'map'
        };
    }

    render() {
        const tabs = tabOptions.map((tab) => (
            <VisualizationTabItem
                key={tab.code}
                active={this.state.active === tab.code}
                {...tab} />
        ));

        return (
            <div className="search-visualizations">
                <ul className="visualization-tabs">
                    {tabs}
                </ul>
                Data
            </div>
        );
    }
}