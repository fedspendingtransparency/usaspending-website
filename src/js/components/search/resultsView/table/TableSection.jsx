/**
 * TableSection.jsx
 */

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import ResultsTableContainer from "../../../../containers/search/resultsView/ResultsTableContainer";

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

    return (
        <div id="search-page-component" className="awards">
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
