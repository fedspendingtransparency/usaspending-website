/**
 * SectionsContent.jsx
 * Created by Brian Petway
 **/

import React from "react";
import PropTypes from "prop-types";

import TableSection from "./table/TableSection";
import CategoriesSection from "./categories/CategoriesSection";
import TimeSection from "./time/TimeSection";
import MapSection from "./map/MapSection";

require("pages/search/searchPage.scss");

const propTypes = {
    tabData: PropTypes.object,
    hash: PropTypes.string,
    spendingLevel: PropTypes.string
};

const SectionsContent = ({
    tabData,
    hash,
    spendingLevel
}) => (
    <>
        <TableSection
            tabData={tabData}
            hash={hash}
            spendingLevel={spendingLevel} />
        <CategoriesSection
            spendingLevel={spendingLevel}
            hash={hash} />
        <TimeSection
            hash={hash}
            spendingLevel={spendingLevel} />
        <MapSection
            spendingLevel={spendingLevel}
            hash={hash} />
    </>
);

SectionsContent.propTypes = propTypes;
export default SectionsContent;
