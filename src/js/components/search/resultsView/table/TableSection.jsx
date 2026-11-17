/**
 * TableSection.jsx
 */

import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';
import ResultsTableContainer from "containers/search/resultsView/ResultsTableContainer";
import { logVisualizationViewEvent } from "containers/search/helpers/searchEvents";
import useIntersectionObserver from "hooks/useIntersectionObserver";

import TableDsm from "./TableDsm";

const propTypes = {
    tabData: PropTypes.object,
    hash: PropTypes.string,
    spendingLevel: PropTypes.string
};

const TableSection = ({
    tabData, hash, spendingLevel
}) => {
    const sectionTitle = spendingLevel === "awards" ? 'Prime Award Results' : 'Subaward Results';

    const dsmContent = useMemo(() => <TableDsm spendingLevel={spendingLevel} />, [spendingLevel]);
    const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
    const isSearchActive = useSelector((state) => state.sidebar.isSearchActive);

    useEffect(() => {
        if (isIntersecting) {
            logVisualizationViewEvent("awards", hash, isSearchActive);
        }
    }, [isIntersecting, hash]);

    return (
        <div ref={ref} className="awards">
            <ResultsTableContainer
                tabData={tabData}
                hash={hash}
                spendingLevel={spendingLevel}
                sectionTitle={sectionTitle}
                dsmContent={dsmContent}
                sectionName="table" />
        </div>
    );
};

TableSection.propTypes = propTypes;
export default TableSection;
