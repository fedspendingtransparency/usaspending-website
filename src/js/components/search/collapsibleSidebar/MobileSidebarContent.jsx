/**
 * MobileSidebarContent.jsx
 * Created by Andrea Blackwell 1/10/2025
 **/

import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransitionGroup, CSSTransition } from "react-transitioning";
import { FlexGridCol } from "data-transparency-ui";
import { Close } from 'components/sharedComponents/icons/Icons';
import SearchSidebarSubmitContainer from "containers/search/SearchSidebarSubmitContainer";
import AboutTheDataLink from "../../sharedComponents/AboutTheDataLink";
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
}) => {
    const colClassName = `mobile-search-sidebar-v2 ${showMobileFilters ? 'sidebar-opened' : ''}`;
    const className = "collapsible-sidebar--main-menu search-filters-wrapper opened";
    return (
        <>
            <FlexGridCol className={colClassName}>
                <TransitionGroup id="mobile-filter-div">
                    <CSSTransition
                        classNames="mobile-filter"
                        timeout={195}
                        exit>
                        <div className="mobile-filter-content">
                            <div className={className}>
                                <div className="sidebar-top-submit">
                                    <div className="collapsible-sidebar-header">
                                        <div className="collapsible-sidebar-group">
                                            <div className="collapsible-sidebar-left">
                                                <FontAwesomeIcon icon="filter" />Filters
                                            </div>
                                            <div className="sub--header">
                                                <button
                                                    className="close-button"
                                                    id="collapsible-mobile-close-button"
                                                    aria-label="Close Filters"
                                                    onClick={() => {
                                                        setShowMobileFilters(false);
                                                    }}>
                                                    <Close alt="Close Filters" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="link"><AboutTheDataLink slug="data-elements">Learn more about filters</AboutTheDataLink></div>
                                    </div>
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
        </>
    );
};

MobileSidebarContent.propTypes = propTypes;

export default MobileSidebarContent;
