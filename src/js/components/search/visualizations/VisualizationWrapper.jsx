/**
 * VisualizationWrapper.jsx
 * Created by Kevin Li 11/29/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';
import { withRouter } from "react-router-dom";
import ResultsTableContainer from 'containers/search/table/ResultsTableContainer';
import TimeVisualizationSectionContainer from
    'containers/search/visualizations/time/TimeVisualizationSectionContainer';
import GeoVisualizationSectionContainer from
    'containers/search/visualizations/geo/GeoVisualizationSectionContainer';
import RankVisualizationWrapperContainer from
    'containers/search/visualizations/rank/RankVisualizationWrapperContainer';

import { tabOptions } from 'dataMapping/search/searchViewTabs';

import NoFiltersScreen from './screens/NoFiltersScreen';

import VisualizationTabItem from './VisualizationTabItem';
import SubawardToggle from './SubawardToggle';

const propTypes = {
    isMobile: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    noFiltersApplied: PropTypes.bool,
    type: PropTypes.string,
    subaward: PropTypes.bool,
    setSearchViewType: PropTypes.func,
    setSearchViewSubaward: PropTypes.func
};

class VisualizationWrapper extends React.Component {
    constructor(props) {
        super(props);

        this._queuedAnalyticEvent = null;

        this.clickedTab = this.clickedTab.bind(this);
        this.logVisualizationTab = this.logVisualizationTab.bind(this);
    }

    componentDidMount() {
        this._mounted = true;
        this.logVisualizationTab(this.props.type);
        this.parseTab();
    }

    componentWillUnmount() {
        this._mounted = false;
    }

    parseTab() {
        const params = this.props.history.location.search.split("&");
        params.shift();
        if ((params.length === 1 || params.length === 2) && params[0].substring(0, 4) === "tab=") {
            this.clickedTab(params[0].substring(4)); // everything after tab=
        }
    }

    logVisualizationTab(tab) {
        if (this.props.noFiltersApplied) {
            // no filters are applied yet, don't log an analytic event
            return;
        }

        // discard any previously scheduled tab analytic events that haven't run yet
        if (this._queuedAnalyticEvent) {
            window.clearTimeout(this._queuedAnalyticEvent);
        }

        // only log analytic event after 15 seconds
        this._queuedAnalyticEvent = window.setTimeout(() => {
            if (this._mounted) {
                const activeLabel = tabOptions.find((el) => el.code === tab).label;
                Analytics.event({
                    category: 'Advanced Search - Visualization Type',
                    action: activeLabel
                });
            }
        }, 15 * 1000);
    }

    clickedTab(tab) {
        this.props.setSearchViewType(tab);
        this.logVisualizationTab(tab);
    }

    render() {
        const tabs = tabOptions.map((tab) => (
            <VisualizationTabItem
                {...tab}
                key={tab.code}
                id={tab.code}
                active={this.props.type === tab.code}
                clickedTab={this.clickedTab}
                disabled={!this.props.requestsComplete} />
        ));

        let content = <NoFiltersScreen />;
        if (!this.props.noFiltersApplied) {
            switch (this.props.type) {
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
        }

        return (
            <div
                className="search-visualizations"
                ref={(div) => {
                    this.visualizationWrapper = div;
                }}>
                <div className="visualization-tabs__toggle-mobile">
                    <SubawardToggle
                        subaward={this.props.subaward}
                        setSearchViewSubaward={this.props.setSearchViewSubaward} />
                </div>
                <div
                    className="visualization-tabs"
                    role="navigation"
                    aria-label="Visualization types">
                    <ul
                        className="visualization-tabs__list"
                        role="menu">
                        {tabs}
                    </ul>
                    <div className="visualization-tabs__toggle">
                        <SubawardToggle
                            subaward={this.props.subaward}
                            setSearchViewSubaward={this.props.setSearchViewSubaward} />
                    </div>
                </div>
                <div className="visualization-content-wrapper">
                    <div
                        className="visualization-content"
                        role="main"
                        aria-label="Search results">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

VisualizationWrapper.propTypes = propTypes;

export default withRouter(VisualizationWrapper);
