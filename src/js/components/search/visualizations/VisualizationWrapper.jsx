/**
 * VisualizationWrapper.jsx
 * Created by Kevin Li 11/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';

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

const propTypes = {
    isMobile: PropTypes.bool
};

export default class VisualizationWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 'table',
            visualization: {
                top: 0,
                height: 0,
                width: 0
            },
            windowHeight: 0
        };

        this.clickedTab = this.clickedTab.bind(this);
        this.handleScrollUpdate = this.handleScrollUpdate.bind(this);
    }

    componentDidMount() {
        this.measureScreen();
        window.addEventListener('scroll', this.handleScrollUpdate);
    }

    componentWillUnmount() {
        // this.stopMonitoringScroll(false);
        window.removeEventListener('scroll', this.handleScrollUpdate);
    }

    clickedTab(tab) {
        this.setState({
            active: tab
        });
    }

    measureScreen() {
        const elementPos = this.visualizationWrapper.getBoundingClientRect();
        const top = elementPos.top;
        const height = this.visualizationWrapper.offsetHeight;
        const width = this.visualizationWrapper.offsetWidth;
        const windowHeight = window.innerHeight || document.documentElement.clientHeight
            || document.body.clientHeight;


        this.setState({
            windowHeight,
            visualization: {
                top,
                height,
                width
            }
        });
    }

    handleScrollUpdate() {
        const scrollY = window.scrollY;

        // const isSticky = this.visualizationWrapper.classList.contains('sticky');

        if (scrollY >= this.state.visualization.top && this.state.windowHeight >= this.state.visualization.height) {
                console.log(scrollY);
                this.visualizationWrapper.style.transform = `translate(0px, ${((scrollY - this.state.visualization.height) + this.state.visualization.top) + 66 + 32}px)`;
        }
        // else if (isSticky) {
        //     this.visualizationWrapper.classList.toggle('sticky');
        //     delete this.visualizationWrapper.style.top;
        //     delete this.visualizationWrapper.style.width;
        // }
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
            <div
                className="search-visualizations"
                ref={(div) => {
                    this.visualizationWrapper = div;
                }}>
                <div className="visualization-tab-wrapper">
                    <ul
                        className="visualization-tabs"
                        role="navigation"
                        aria-label="Visualization types">
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

VisualizationWrapper.propTypes = propTypes;
