/**
 * TableSection.jsx
 */


import React from "react";
import SearchSectionWrapper from "../SearchSectionWrapper";
import {
    TempPlaceholderComponent,
    TempPlaceholderDsmContent,
} from "../TempPlaceholderComponents";
import AwardTable from "./AwardTable";

const TableSection = ({ awardTableHasLoaded }) => {
    const dummyWrapperProps = {
        sectionTitle: 'Prime Award Results',
        dsmContent: <TempPlaceholderDsmContent />
    };

    return (
        <SearchSectionWrapper
            {...dummyWrapperProps}>
            <div id="search-page-component" className="award">
                {!awardTableHasLoaded ?
                    <TempPlaceholderComponent />
                    :
                    <AwardTable />
                }
            </div>
        </SearchSectionWrapper>
    );
};

export default TableSection;
