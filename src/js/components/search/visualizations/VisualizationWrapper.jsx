/**
 * VisualizationWrapper.jsx
 * Created by Kevin Li 11/29/17
 */

import React from 'react';

import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';
import TimeVisualizationSectionContainer from
    'containers/search/visualizations/time/TimeVisualizationSectionContainer';
import GeoVisualizationSectionContainer from
    'containers/search/visualizations/geo/GeoVisualizationSectionContainer';
import RankVisualizationWrapperContainer from       
    'containers/search/visualizations/rank/RankVisualizationWrapperContainer';

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
            active: 'table'
        };

        this.clickedTab = this.clickedTab.bind(this);
    }

    clickedTab(tab) {
        this.setState({
            active: tab
        });
    }

    render() {
        const tabs = tabOptions.map((tab) => (
            <VisualizationTabItem
                {...tab}
                key={tab.code}
                active={this.state.active === tab.code}
                clickedTab={this.clickedTab} />
        ));

        let content = null;
        switch (this.state.active) {
            case 'table':
                content = <ResultsTableContainer />;
                break;
            case 'time':
                content = <TimeVisualizationSectionContainer />;
                break;
            case 'map':
                content = <GeoVisualizationSectionContainer />;
                break;
            case 'rank':
                content = <RankVisualizationWrapperContainer />;
                break;
            default:
                content = null;
        }

        return (
            <div className="search-visualizations">
                <div className="visualization-tab-wrapper">
                    <ul className="visualization-tabs">
                        {tabs}
                    </ul>
                </div>
                <div className="visualization-content-wrapper">
                    <div className="visualization-content">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}
