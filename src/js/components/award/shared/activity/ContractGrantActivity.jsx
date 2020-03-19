import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import ContractGrantActivityChart from './ContractGrantActivityChart';

const propTypes = {
    transactions: PropTypes.array,
    dates: PropTypes.object,
    awardType: PropTypes.string
};

const ContractGrantActivity = ({ transactions, dates, awardType }) => {
    // reference to the div - using to get the width
    const divReference = useRef(null);
    // window width
    const [windowWidth, setWindowWidth] = useState(0);
    // visualization width
    const [visualizationWidth, setVisualizationWidth] = useState(0);
    /**
     * handleWindowResize
     * - updates window and visualization width based on current window width.
     * @returns {null}
     */
    const handleWindowResize = throttle(() => {
        const wWidth = window.innerWidth;
        if (windowWidth !== wWidth) {
            setWindowWidth(windowWidth);
            setVisualizationWidth(divReference.current.offsetWidth);
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
        <div ref={divReference} className="contract-grant-activity-visualization">
            <ContractGrantActivityChart
                visualizationWidth={visualizationWidth}
                transactions={transactions}
                height={360}
                padding={{ left: 45, bottom: 30 }}
                dates={dates}
                awardType={awardType} />
        </div>
    );
};

ContractGrantActivity.propTypes = propTypes;

export default ContractGrantActivity;
