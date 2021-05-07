/**
 * OverviewContainer.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';
import { useQueryParams } from 'helpers/queryParams';
import AmountsVisualization from 'components/covid19/amountsVisualization/AmountsVisualization';
import ResultsTableLoadingMessage from 'components/search/table/ResultsTableLoadingMessage';

import DateNote from 'components/covid19/DateNote';

const OverviewContainer = () => {
    const { publicLaw } = useQueryParams();
    const [windowWidth, setWindowWidth] = useState(0);
    const [visualizationsWidth, setVisualizationsWidth] = useState(0);

    // reference to the div - using to get the current div width
    const divReference = useRef(null);
    const { overview } = useSelector((state) => state.covid19);
    const [loading, setLoading] = useState(true);
    /**
     * handleWindowResize
     * - updates window and visualization width based on current window width.
     * @returns {null}
     */
    const handleWindowResize = throttle(() => {
        if (windowWidth !== window.innerWidth) {
            setWindowWidth(windowWidth);
            setVisualizationsWidth(divReference.current.offsetWidth);
        }
    }, 50);
    /**
     * hook - runs on mount and unmount.
     * Any updates to the width of the browser is handled by the
     * event listener.
     */
    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    useEffect(() => {
        if (publicLaw && overview[publicLaw]) {
            setLoading(false);
        }
    }, [publicLaw, Object.keys(overview)]);

    return (
        <div ref={divReference} className="body__content overview">
            {!loading && <DateNote />}
            {
                loading &&
                <div className="results-table-message-container">
                    <ResultsTableLoadingMessage />
                </div>
            }
            {!loading && <AmountsVisualization
                overviewData={overview}
                loading={loading}
                publicLaw={publicLaw}
                width={visualizationsWidth} />}
        </div>
    );
};

export default OverviewContainer;
