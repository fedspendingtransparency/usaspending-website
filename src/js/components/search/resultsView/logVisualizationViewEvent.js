/**
 * logVisualizationViewEvent.js
 **/

import Analytics from "helpers/analytics/Analytics";

const logVisualizationViewEvent = (action, label, method) => window.setTimeout(
    () => Analytics.event({
        event: 'search_visualization_type',
        category: 'Advanced Search - Visualization Type',
        action,
        gtm: true,
        label,
        method
    }), 15 * 1000);

export default logVisualizationViewEvent;
