/**
  * ResultsTableSection.jsx
  * Created by Kevin Li 11/8/16
  **/

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tabs, NoResultsMessage } from 'data-transparency-ui';

import ResultsTable from '../../table/ResultsTable';
import GroupedAwardTable from '../../table/groupedTable/GroupedAwardTable';
import useWindowWidth from "../../../../hooks/useWindowWidth";

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
    awardIdClick: PropTypes.func,
    subAwardIdClick: PropTypes.func,
    page: PropTypes.number,
    setPage: PropTypes.func,
    total: PropTypes.number,
    federalAccountPage: PropTypes.bool,
    showToggle: PropTypes.bool
};

const ResultsTableSection = (props) => {
    const isTablet = useWindowWidth();
    const [tableWidth, setTableWidth] = useState(document.querySelector('.results-table-content'));

    const setTableWidthFn = useCallback(() => {
        if (document.querySelector('.results-table-content')) {
            setTableWidth(document.querySelector('.results-table-content'));
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', setTableWidthFn);
        return () => {
            window.removeEventListener('resize', setTableWidthFn);
        };
    }, [setTableWidthFn]);

    useEffect(() => {
        // mobile check
        if (isTablet && props.checkMobile && props.showToggle) {
            props.checkMobile(isTablet);
        }
    }, [isTablet, props]);

    const renderContent = () => {
        if (!props.results.length) {
            return <NoResultsMessage />;
        }

        if (props.expandableData?.length) {
            return (
                <GroupedAwardTable
                    {...props}
                    expandableData={props.expandableData}
                    columnType={props.columnType}
                    isMobile={isTablet}
                    visibleWidth={tableWidth}
                    newMobileView />
            );
        }

        return (
            <ResultsTable
                {...props}
                visibleWidth={tableWidth}
                awardIdClick={props.awardIdClick}
                subAwardIdClick={props.subAwardIdClick}
                isMobile={isTablet}
                newMobileView />
        );
    };

    return (
        <div className="search-results-table-section" id="results-section-table">
            <Tabs
                types={props.tableTypes}
                active={props.currentType}
                switchTab={props.switchTab} />
            <div className="results-table-content">
                {renderContent()}
            </div>
        </div>
    );
};

ResultsTableSection.propTypes = propTypes;
export default ResultsTableSection;
