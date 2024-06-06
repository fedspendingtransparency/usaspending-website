/**
 * VisualizationWrapper.jsx
 * Created by Kevin Li 11/29/17
 */

import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';
import { useHistory } from "react-router-dom";
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

const propTypes = {
    isMobile: PropTypes.bool,
    requestsComplete: PropTypes.bool,
    noFiltersApplied: PropTypes.bool,
    type: PropTypes.string,
    subaward: PropTypes.bool,
    setSearchViewType: PropTypes.func,
    setSearchViewSubaward: PropTypes.func
};

const VisualizationWrapper = (props) => {
    const [_mounted, setMounted] = useState(false);
    const history = useHistory();
    let _queuedAnalyticEvent = null;

    const logVisualizationTab = useCallback((tab) => {
        if (props.noFiltersApplied) {
            // no filters are applied yet, don't log an analytic event
            return;
        }

        // discard any previously scheduled tab analytic events that haven't run yet
        if (_queuedAnalyticEvent) {
            window.clearTimeout(_queuedAnalyticEvent);
        }

        // only log analytic event after 15 seconds
        _queuedAnalyticEvent = window.setTimeout(() => {
            if (_mounted) {
                const activeLabel = tabOptions.find((el) => el.code === tab).label;
                Analytics.event({
                    event: 'search_visualization_type',
                    category: 'Advanced Search - Visualization Type',
                    action: activeLabel,
                    gtm: true
                });
            }
        }, 15 * 1000);
    });

    const clickedTab = (tab) => {
        props.setSearchViewType(tab);
        logVisualizationTab(tab);
    };

    const parseTab = () => {
        const params = history.location.search.split("&");
        params.shift();
        if ((params.length === 1 || params.length === 2) && params[0].substring(0, 4) === "tab=") {
            clickedTab(params[0].substring(4)); // everything after tab=
        }
    };

    useEffect(() => {
        logVisualizationTab(props.type);
        parseTab();
        setMounted(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const tabs = tabOptions.map((tab) => (
        <VisualizationTabItem
            {...tab}
            key={tab.code}
            id={tab.code}
            active={props.type === tab.code}
            clickedTab={clickedTab}
            disabled={!props.requestsComplete} />
    ));

    let content = <NoFiltersScreen />;
    if (!props.noFiltersApplied) {
        switch (props.type) {
            case 'table':
                content = <ResultsTableContainer />;
                break;
            case 'time':
                content = <TimeVisualizationSectionContainer subaward={props.subaward} />;
                break;
            case 'map':
                content = <GeoVisualizationSectionContainer subaward={props.subaward} className="award-search__geo-toggle" />;
                break;
            case 'rank':
                content = <RankVisualizationWrapperContainer subaward={props.subaward} />;
                break;
            default:
                content = null;
        }
    }

    return (
        <div
            className="search-visualizations">
            <div className="visualization-tabs">
                <div
                    className="visualization-tabs__list"
                    aria-label="Visualization types"
                    role="tablist">
                    {tabs}
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
};

VisualizationWrapper.propTypes = propTypes;
export default VisualizationWrapper;
