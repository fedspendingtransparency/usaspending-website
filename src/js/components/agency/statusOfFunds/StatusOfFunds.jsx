/**
 * StatusOfFunds.jsx
 * Created by Lizzie Salita 10/27/21
 */

import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pagination, LoadingMessage, ErrorMessage } from 'data-transparency-ui';
import IsMobileContext from "context/IsMobileContext";
import VisualizationSection from './VisualizationSection';

const propTypes = {
    toggle: PropTypes.bool,
    onToggle: PropTypes.func,
    onKeyToggle: PropTypes.func,
    level: PropTypes.number.isRequired,
    setDrilldownLevel: PropTypes.func,
    fy: PropTypes.string,
    results: PropTypes.array,
    isMobile: PropTypes.bool,
    viewType: PropTypes.string,
    setViewType: PropTypes.func,
    maxLevel: PropTypes.number,
    dropdownSelection: PropTypes.string,
    setDropdownSelection: PropTypes.func,
    changeCurrentPage: PropTypes.func,
    totalItems: PropTypes.number.isRequired,
    currentPage: PropTypes.number,
    pageSize: PropTypes.number,
    isLoading: PropTypes.bool,
    isError: PropTypes.bool
};

const StatusOfFunds = ({
    goBack,
    toggle,
    onToggle,
    onKeyToggle,
    level,
    setDrilldownLevel,
    fy,
    results,
    maxLevel,
    dropdownSelection,
    setDropdownSelection,
    currentPage,
    changeCurrentPage,
    totalItems,
    isLoading,
    isError
}) => {
    const { isMedium } = useContext(IsMobileContext);
    const [viewType, setViewType] = useState(isMedium ? 'table' : 'chart');

    useEffect(() => {
        if (isMedium) {
            setViewType('table');
        }
    }, [isMedium]);

    const getContent = () => {
        if (isLoading) return <LoadingMessage />;
        if (isError) return <ErrorMessage />;

        return (
            <>
                <VisualizationSection
                    toggle={toggle}
                    onToggle={onToggle}
                    onKeyToggle={onKeyToggle}
                    level={level}
                    setDrilldownLevel={setDrilldownLevel}
                    fy={fy}
                    results={results}
                    isMobile={isMedium}
                    viewType={viewType}
                    setViewType={setViewType}
                    maxLevel={maxLevel}
                    dropdownSelection={dropdownSelection}
                    setDropdownSelection={setDropdownSelection} />
                <Pagination
                    currentPage={currentPage}
                    changePage={changeCurrentPage}
                    resultsText
                    totalItems={totalItems} />
            </>
        );
    };

    return (
        <>
            {level > 0 && !isMedium ?
                <button
                    title="Go up a level"
                    className="drilldown-back-button"
                    onClick={goBack} >
                    <FontAwesomeIcon icon="arrow-left" />
                        &nbsp;&nbsp;Back
                </button> : <></>}
            {getContent()}
        </>
    );
};

StatusOfFunds.propTypes = propTypes;

export default StatusOfFunds;
