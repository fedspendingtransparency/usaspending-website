import React, { useState } from 'react';
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router";

import KeywordContainer from "containers/search/filters/KeywordContainer";
import Alert from "components/sharedComponents/Alert";
import { searchFilterCategoryTree } from "dataMapping/search/searchFilterCategories";
import { getFilterCount } from "helpers/search/filterCheckboxHelper";
import SidebarContentFilterAccordion from "./SidebarContentFilterAccordion";

const propTypes = {
    isDsmOpened: PropTypes.bool,
    sidebarContentHeight: PropTypes.number,
    isMobile: PropTypes.bool
};

const SidebarContentFilters = ({ isDsmOpened, sidebarContentHeight, isMobile }) => {
    const [open, setOpen] = useState({
        Location: false,
        "Time Period": true,
        "Award Description": false,
        "Award ID": false,
        "Spending Amount": false,
        "Award Type": false,
        "North American Industry Classification System (NAICS)": false,
        "Product and Service Code (PSC)": false,
        "Type of Contract Pricing": false,
        "Type of Set Aside": false,
        "Extent Competed": false,
        "Assistance Listing": false,
        Recipient: false,
        "Recipient Type": false,
        Agency: false,
        "Treasury Account Symbol (TAS)": false,
        "Disaster Emergency Fund Code (DEFC)": false
    });
    const filters = useSelector((state) => state.filters);
    const filterCount = getFilterCount(filters);

    const alertBody = (
        <>
            Looking for the "Keyword Search" page?{" "}
            <Link
                target="_blank"
                rel="noopener noreferrer"
                className="advanced-search__keyword-search-link"
                to="/keyword_search">
                Click here to search award transactions by keyword.
            </Link>
        </>
    );

    return (
        <>
            {!isDsmOpened && (
                <div
                    className="collapsible-sidebar--search-filters-list"
                    style={{ height: sidebarContentHeight }}>
                    <KeywordContainer searchV2 />
                    {searchFilterCategoryTree.map(({ title, component }) => (
                        <SidebarContentFilterAccordion
                            title={title}
                            component={component}
                            open={open}
                            setOpen={setOpen}
                            count={filterCount[title]}
                            isMobile={isMobile} />
                    ))}
                    {!isMobile && <Alert body={alertBody} className="keyword-link" icon />}
                </div>
            )}
        </>
    );
};

SidebarContentFilters.propTypes = propTypes;
export default SidebarContentFilters;
