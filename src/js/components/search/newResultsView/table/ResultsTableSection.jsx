/**
  * ResultsTableSection.jsx
  * Created by Kevin Li 11/8/16
  **/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'data-transparency-ui';
import { throttle } from "lodash";
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import ResultsTable from '../../table/ResultsTable';

const propTypes = {
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    tableTypes: PropTypes.array,
    currentType: PropTypes.string,
    switchTab: PropTypes.func,
    results: PropTypes.array,
    columns: PropTypes.object,
    toggleColumnVisibility: PropTypes.func,
    updateSort: PropTypes.func,
    reorderColumns: PropTypes.func,
    subaward: PropTypes.bool,
    awardIdClick: PropTypes.func,
    subAwardIdClick: PropTypes.func,
    page: PropTypes.number,
    setPage: PropTypes.func,
    total: PropTypes.number
};

const ResultsTableSection = (props) => {
    const [tableWidth, setTableWidth] = useState(0);
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const setTableWidthFn = () => {
        const table = document.querySelector('.results-table-content');
        if (table) {
            setTableWidth(table.offsetWidth);
        }
    };

    const handleResize = throttle(() => {
        const newWidth = window.innerWidth;
        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
            setIsMobile(newWidth < mediumScreen);
        }
    }, 50);

    useEffect(() => {
        // set the initial table width
        setTableWidthFn();
        handleResize();
        // watch the window for size changes
        window.addEventListener('resize', setTableWidthFn);
        return () => {
            // stop watching for size changes
            window.removeEventListener('resize', setTableWidthFn);
        };
    }, []);

    return (
        <div className="search-results-table-section" id="results-section-table">
            <Tabs
                types={props.tableTypes}
                active={props.currentType}
                switchTab={props.switchTab} />
            <div className="results-table-content">
                <ResultsTable
                    {...props}
                    visibleWidth={tableWidth}
                    awardIdClick={props.awardIdClick}
                    subAwardIdClick={props.subAwardIdClick}
                    isMobile={isMobile} />
            </div>
        </div>
    );
};

ResultsTableSection.propTypes = propTypes;
export default ResultsTableSection;
