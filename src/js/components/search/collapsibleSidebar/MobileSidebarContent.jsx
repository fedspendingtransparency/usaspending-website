/**
 * MobileSidebarContent.jsx
 * Created by Andrea Blackwell 1/10/2025
 **/

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransitionGroup, CSSTransition } from "react-transitioning";
import { FlexGridCol } from "data-transparency-ui";

import SearchSidebarSubmitContainer from "containers/search/SearchSidebarSubmitContainer";
import * as Icons from 'components/sharedComponents/icons/Icons';

import SidebarContentFilters from "./SidebarContentFilters";

const propTypes = {
    sidebarContentHeight: PropTypes.number,
    setShowMobileFilters: PropTypes.func,
    showMobileFilters: PropTypes.bool
};

const MobileSidebarContent = ({
    sidebarContentHeight,
    setShowMobileFilters,
    showMobileFilters
}) => (
    <>
        <FlexGridCol className={`mobile-search-sidebar-v2 ${showMobileFilters ? 'sidebar-opened' : ''}`}>
            <TransitionGroup id="mobile-filter-div">
                <CSSTransition
                    classNames="mobile-filter"
                    timeout={195}
                    exit>
                    <div className="mobile-filter-content">
                        <div className="collapsible-sidebar--main-menu search-filters-wrapper opened">
                            <div className="collapsible-sidebar--header">
                                <button
                                    className="close-button"
                                    id="collapsible-mobile-close-button"
                                    aria-label="Close Mobile Filters"
                                    title="Close Mobile Filters"
                                    onClick={() => {
                                        setShowMobileFilters(false);
                                    }}>
                                    <Icons.Close alt="Close Filters" />
                                </button>
                            </div>
                            <div className="sidebar-top-submit">
                                <div className="collapsible-sidebar-header"><FontAwesomeIcon icon="filter" />Filters</div>
                                <SearchSidebarSubmitContainer setShowMobileFilters={setShowMobileFilters} />
                            </div>
                            <SidebarContentFilters sidebarContentHeight={sidebarContentHeight} />
                        </div>
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </FlexGridCol>
    </>);

MobileSidebarContent.propTypes = propTypes;

export default MobileSidebarContent;
