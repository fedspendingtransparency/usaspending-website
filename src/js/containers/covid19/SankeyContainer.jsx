/**
 * SankeyContainer.jsx
 * Created By Jonathan Hill 06/04/20
 */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';
import Sankey from 'components/covid19/sankey/Sankey';


const height = 400;

const SankeyContainer = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [sankeyWidth, setSankeyWidth] = useState(0);
    // reference to the div - using to get the current div width
    const divReference = useRef(null);
    const data = useSelector((state) => state.covid19);
    /**
     * handleWindowResize
     * - updates window and visualization width based on current window width.
     * @returns {null}
     */
    const handleWindowResize = throttle(() => {
        if (windowWidth !== window.innerWidth) {
            setWindowWidth(windowWidth);
            setSankeyWidth(divReference.current.offsetWidth);
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
        <div ref={divReference} className="covid19__sankey-container">
            <div className="covid19__sankey-title">
                  This is how the <strong>total spending</strong> was funded and spent.
            </div>
            <div className="covid19__sankey-sub-title">
                This Sankey diagram shows the flow of spending from specific funding
                sources (in this case, the different Public Laws that funded the COVID-19 Response)
                through to the money that has been paid out.
            </div>
            <Sankey data={data} height={height} width={sankeyWidth} />
            <div className="covid19__sankey-legend">
                <div className="covid19-sankey-legend__item">
                    <div className="covid19-sankey-legend__item__circle covid19-sankey-legend__item__circle-budget-source" />
                    <div className="covid19-sankey-legend__item-text">Budget Source</div>
                </div>
                <div className="covid19-sankey-legend__item">
                    <div className="covid19-sankey-legend__item__circle covid19-sankey-legend__item__circle-total-budget" />
                    <div className="covid19-sankey-legend__item-text">Total Budget</div>
                </div>
                <div className="covid19-sankey-legend__item">
                    <div className="covid19-sankey-legend__item__circle covid19-sankey-legend__item__circle-obligated" />
                    <div className="covid19-sankey-legend__item-text">Obligated Funds</div>
                </div>
                <div className="covid19-sankey-legend__item">
                    <div className="covid19-sankey-legend__item__circle covid19-sankey-legend__item__circle-outlayed" />
                    <div className="covid19-sankey-legend__item-text">Outlayed Funds</div>
                </div>
            </div>
        </div>
    );
};

export default SankeyContainer;
