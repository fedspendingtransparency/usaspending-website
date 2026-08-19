/**
 * MobileSidebarContent.jsx
 * Created by Andrea Blackwell 1/10/2025
 **/

import React from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transitioning";
import { FlexGridCol } from "data-transparency-ui";
import SearchSidebarSubmitContainer from "containers/search/SearchSidebarSubmitContainer";
import SidebarContentFilters from "./SidebarContentFilters";

const propTypes = {
    sidebarContentHeight: PropTypes.number,
    setShowMobileFilters: PropTypes.func,
    showMobileFilters: PropTypes.bool,
    mobileSidebarContent: PropTypes.string
};

const MobileSidebarContent = ({
    sidebarContentHeight,
    setShowMobileFilters,
    showMobileFilters,
    mobileSidebarContent
}) => {
    const colClassName = `mobile-search-sidebar-v2 ${showMobileFilters ? 'sidebar-opened' : ''}`;
    const className = "collapsible-sidebar--main-menu search-filters-wrapper opened";

    return (
        <>
            { mobileSidebarContent === "filters" && 
                <FlexGridCol className={colClassName}>
                    <TransitionGroup id="mobile-filter-div">
                        <CSSTransition
                            classNames="mobile-filter"
                            timeout={195}
                            exit>
                            <div className="mobile-filter-content">
                                <div className={className}>
                                    <div className="sidebar-top-submit">
                                        <SearchSidebarSubmitContainer
                                            setShowMobileFilters={setShowMobileFilters} />
                                    </div>
                                    <SidebarContentFilters
                                        sidebarContentHeight={sidebarContentHeight} />
                                </div>
                            </div>
                        </CSSTransition>
                    </TransitionGroup>
                </FlexGridCol>
            }
        </>
    );
};

MobileSidebarContent.propTypes = propTypes;

export default MobileSidebarContent;
