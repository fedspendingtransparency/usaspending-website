/**
 * OverviewContainer.jsx
 * Created by Jonathan Hill 06/23/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';
import AmountsVisualization from 'components/covid19/amountsVisualization/AmountsVisualization';
import DateNote from 'components/covid19/DateNote';

const OverviewContainer = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [visualizationsWidth, setVisualizationsWidth] = useState(0);
    // reference to the div - using to get the current div width
    const divReference = useRef(null);
    const overviewData = useSelector((state) => state.covid19.overview);
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

    return (
        <div ref={divReference} className="body__content overview">
            <DateNote />
            <AmountsVisualization
                // overviewData={{
                //     _defCode_V_funding: 7766900000,
                //     _totalBudgetAuthority: 616288691500.82,
                //     _awardObligations: 1381497254285.89,
                //     _awardOutlays: 1077397742738.65,
                //     _totalObligations: 7721021938.98,
                //     _totalOutlays: 1916236.12,
                //     _otherObligations: 1036478636833.7903,
                //     _awardObligationsNotOutlayed: 304099511547.23987,
                //     _remainingBalance: 541998550912.70996,
                //     _nonAwardOutLays: 988263890494.57,
                //     _nonAwardNotOutlayed: 48214746339.22034
                // }}
                overviewData={overviewData}
                width={visualizationsWidth} />
        </div>
    );
};

export default OverviewContainer;
