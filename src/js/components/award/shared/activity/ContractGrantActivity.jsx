import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContractGrantsActivityChart from './ContractGrantsActivityChart';

const propTypes = {
    transactions: PropTypes.array
};

const ContractGrantActivity = ({ transactions }) => {
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
    const handleWindowResize = () => {
        const wWidth = window.innerWidth;
        if (windowWidth !== wWidth) {
            setWindowWidth(windowWidth);
            setVisualizationWidth(divReference.current.offsetWidth);
        }
    };
    /**
     * need to investigate if we need this. It should run everytime the window
     * updates but idv activity viz only has it on mount and unmount
     */
    useEffect(() => {
        handleWindowResize();
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    });

    return (
        <div ref={divReference} className="activity-visualization">
            <ContractGrantsActivityChart
                visualizationWidth={visualizationWidth}
                transactions={transactions}
                height={360} />
        </div>
    );
};

ContractGrantActivity.propTypes = propTypes;

export default ContractGrantActivity;
