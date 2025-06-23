/**
 * SearchSidebarMainMenu.jsx
 * Created by Andrea Blackwell 11/05/2024
 **/

import React, { useRef } from "react";
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';
import { SearchFilterCategories } from "dataMapping/search/searchFilterCategories";
import CategoryHeader from "./CategoryHeader";
import SearchSidebarFilterChips from "../../../models/v1/search/SearchSidebarFilterChips";
import DsmSlider from "./DsmSlider";

const propTypes = {
    isDrilldown: PropTypes.bool,
    sidebarContentHeight: PropTypes.number,
    setLevel2: PropTypes.func,
    itemCount: PropTypes.object,
    setShowMobileFilters: PropTypes.func,
    isDsmOpened: PropTypes.bool,
    setIsDsmOpened: PropTypes.func
};

const SearchSidebarMainMenu = ({
    isDrilldown,
    sidebarContentHeight,
    setLevel2,
    itemCount,
    setShowMobileFilters,
    isDsmOpened,
    setIsDsmOpened
}) => {
    const selectedItems = useRef({
        location: <SearchSidebarFilterChips category="location" />,
        timePeriod: <SearchSidebarFilterChips category="timePeriod" />,
        characteristics: <SearchSidebarFilterChips category="characteristics" />,
        recipients: <SearchSidebarFilterChips category="recipients" />,
        sources: <SearchSidebarFilterChips category="sources" />
    });

    const dsmElHeight = sidebarContentHeight + 51; // other dsms doe not need this height due to they need room for "back" header.

    return (
        <div className={`collapsible-sidebar--main-menu ${isDrilldown ? '' : 'opened'}`}>
            {!isDsmOpened && (
                <>
                    <div className="collapsible-sidebar--header">
                        <span>Search by...</span>
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
                    </div>
                    <div className="collapsible-sidebar--search-filters-list" style={{ height: (sidebarContentHeight) }}>
                        {SearchFilterCategories.map((item, i) => (<CategoryHeader
                            // eslint-disable-next-line react/no-array-index-key
                            key={`${item.title}-${i}`}
                            item={item}
                            iconName={item.iconName}
                            iconColor={item.iconColor}
                            iconBackgroundColor={item.iconBackgroundColor}
                            title={item.title}
                            description={item.description}
                            itemCount={itemCount[item.categoryKey]}
                            selectedItems={selectedItems.current[item.categoryKey]}
                            selectCategory={setLevel2}
                            isClickable
                            showDescription />))}
                    </div>
                </>
            )}

            <DsmSlider
                isDsmOpened={isDsmOpened}
                setIsDsmOpened={setIsDsmOpened}
                dsmFile="learn-filters-panel.mdx"
                currentLevel={1}
                selectedCategoryTitle=""
                height={dsmElHeight}
                hasChildren={false} />
        </div>
    );
};

SearchSidebarMainMenu.propTypes = propTypes;
export default SearchSidebarMainMenu;
