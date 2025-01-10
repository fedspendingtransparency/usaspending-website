/**
 * CollapsibleSidebarWrapper.jsx
 * Created by Andrea Blackwell 1/10/2025
 **/

import React, {useState} from "react";
import { useSelector } from "react-redux";

import { FilterCategoryTree } from "dataMapping/search/searchFilterCategories";
import SearchSidebarMainMenu from "./SearchSidebarMainMenu";
import SearchSidebarDrilldown from "./SearchSidebarDrilldown";
import SearchSidebarSubmitContainer from "../../../containers/search/SearchSidebarSubmitContainer";
import { characteristicsCount, sourcesCount } from "../../../helpers/search/filterCheckboxHelper";

const SidebarContent = ({
    sidebarHeight, windowHeight,
}) => {

    const [drilldown, setDrilldown] = useState(null);
    const [isDrilldown, setIsDrilldown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(1);

    const filters = useSelector((state) => state.filters);

    const {
        selectedLocations,
        selectedRecipientLocations,
        timePeriodType,
        time_period: timePeriod,
        timePeriodFY,
        selectedRecipients,
        recipientType
    } = filters;

    const itemCount = {
        location: selectedLocations.size + selectedRecipientLocations.size,
        timePeriod: timePeriodType === 'dr' ? timePeriod.size : timePeriodFY.size,
        characteristics: characteristicsCount(filters),
        recipients: selectedRecipients.size + recipientType.size,
        sources: sourcesCount(filters)
    };

    const setLevel2 = (e, item) => {
        e.preventDefault();
        setSelectedCategory(item);
        setDrilldown(FilterCategoryTree[item?.categoryKey]);
        setIsDrilldown(true);
        setCurrentLevel(2);
    };

    const setLevel3 = (e, item) => {
        e.preventDefault();
        setDrilldown(item);
        setIsDrilldown(true);
        setCurrentLevel(3);
    };

    const goBack = (e) => {
        if (currentLevel === 2) {
            e.preventDefault();
            setDrilldown(null);
            setCurrentLevel(1);
            setIsDrilldown(false);
        }
        else if (currentLevel === 3) {
            setDrilldown(FilterCategoryTree[selectedCategory?.categoryKey]);
            setCurrentLevel(2);
        }
    };

    return (<>
        <SearchSidebarMainMenu
            isDrilldown={isDrilldown}
            sidebarHeight={sidebarHeight}
            setLevel2={setLevel2}
            itemCount={itemCount} />

        <SearchSidebarDrilldown
            list={drilldown?.children}
            filter={drilldown?.component}
            isDrilldown={isDrilldown}
            windowHeight={windowHeight}
            selectedCategory={selectedCategory}
            selectedCategoryTitle={drilldown?.title}
            sidebarHeight={sidebarHeight}
            setLevel3={setLevel3}
            goBack={goBack}
            itemCount={itemCount}
            filters={filters}
            titleOnly={drilldown?.titleOnly} />

        <div className="sidebar-bottom-submit">
            <SearchSidebarSubmitContainer />
        </div>
    </>);
};

export default SidebarContent;
