/**
 * TableSection.jsx
 */

import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "containers/search/resultsView/ResultsTableContainer";

import TableDsm from "./TableDsm";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import logVisualizationViewEvent from "../logVisualizationViewEvent";

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

    useEffect(() => {
        if (isIntersecting) {
            logVisualizationViewEvent("awards", hash);
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
