/**
 * SidebarContent.jsx
 * Created by Andrea Blackwell 1/10/2025
 **/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import SearchSidebarSubmitContainer from "../../../containers/search/SearchSidebarSubmitContainer";
// removed in DEV-13712
// import DsmSlider from "./DsmSlider";
import * as Icons from '../../../components/sharedComponents/icons/Icons';
import { mediumScreen } from '../../../dataMapping/shared/mobileBreakpoints';
import SidebarContentFilters from "./SidebarContentFilters";

const propTypes = {
    sidebarContentHeight: PropTypes.number,
    setShowMobileFilters: PropTypes.func,
    isDsmOpened: PropTypes.bool,
    setIsDsmOpened: PropTypes.func,
    renderSidebarContent: PropTypes.bool
};

const SidebarContent = ({
    sidebarContentHeight,
    setShowMobileFilters,
    isDsmOpened,
    // removed in DEV-13712
    // setIsDsmOpened,
    isMobile
}) => {
    const [isSmall, setIsSmall] = useState(window.innerWidth < mediumScreen);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
    // determine if the width changed
        const windowWidthTemp = window.innerWidth;
        if (windowWidth !== windowWidthTemp) {
            // width changed, update the visualization width
            setWindowWidth(window.innerWidth);
            setIsSmall(window.innerWidth < mediumScreen);
        }
    }, [windowWidth]);

    return (
        <>
            <div className="collapsible-sidebar--main-menu search-filters-wrapper opened">
                {isSmall &&
                <div className="collapsible-sidebar--header">
                    <button
                        className="close-button"
                        id="collapsible-mobile-close-button"
                        aria-label="Close Mobile Filters"
                        title="Close Mobile Filters"
                        onClick={() => {
                            setShowMobileFilters(false);
                        }}>
                        <Icons.Close alt="Close About The Data" />
                    </button>
                </div>}
                <SidebarContentFilters
                    isDsmOpened={isDsmOpened}
                    sidebarContentHeight={sidebarContentHeight}
                    isMobile={isMobile} />
                {/* removed in DEV-13712 */}
                {/* <DsmSlider */}
                {/*     isDsmOpened={isDsmOpened} */}
                {/*     setIsDsmOpened={setIsDsmOpened} */}
                {/*     dsmFile="learn-filters-panel.mdx" */}
                {/*     currentLevel={1} */}
                {/*     selectedCategoryTitle="" */}
                {/*     height={sidebarContentHeight} */}
                {/*     hasChildren={false} /> */}
            </div>
            <div className="sidebar-bottom-submit">
                <SearchSidebarSubmitContainer setShowMobileFilters={setShowMobileFilters} />
            </div>
        </>);
};

SidebarContent.propTypes = propTypes;

export default SidebarContent;
