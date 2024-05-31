/**
 * SectionsContent.jsx
 **/

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TopFilterBarContainer from "containers/search/topFilterBar/TopFilterBarContainer";
import SearchAwardsOperation from "models/v1/search/SearchAwardsOperation";
import { performSpendingByAwardTabCountSearch } from "helpers/searchHelper";
import PageFeatureFlag from "../../sharedComponents/PageFeatureFlag";
import TableSection from "./table/TableSection";
import CategoriesSection from "./categories/CategoriesSection";
import TimeSection from "./time/TimeSection";
import MapSection from "./map/MapSection";
import NewSearchScreen from "./NewSearchScreen";
import NoDataScreen from "./NoDataScreen";

require("pages/search/searchPage.scss");

const propTypes = {
    subaward: PropTypes.bool
};

const SectionsContent = (props) => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [awardTableHasLoaded, setAwardTableHasLoaded] = useState(false);
    const [spendingHasLoaded, setSpendingHasLoaded] = useState(false);
    const [mapHasLoaded, setMapHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState('awarding_agency');

    const observerOptions = {
        threshold: 0.1
    };

    const callbackFunction = (entries) => {
        entries.forEach((entry) => {
            const section = entry.target.className;
            if (entry.isIntersecting) {
                // setIsVisible(section);
                if (section === 'award') {
                    setAwardTableHasLoaded(true);
                    console.log("award");
                }
                else if (section === 'spending') {
                    setSpendingHasLoaded(true);
                    console.log("spending");
                }
                else if (section === 'map') {
                    setMapHasLoaded(true);
                    console.log("map");
                }
                else if (section === 'categories') {
                    setCategoriesHasLoaded(true);
                    console.log("categories");
                }
            }
        });
    };

    useEffect(() => {
        setObserverSupported('IntersectionObserver' in window);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (observerSupported) {
            const target = '#search-page-component';
            const targets = document.querySelectorAll(target);

            // eslint-disable-next-line no-undef
            const observer = new IntersectionObserver(callbackFunction, observerOptions);

            targets.forEach((i) => {
                if (i.className) {
                    observer.observe(i);
                }
            });

            return () => observer.disconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observerSupported]);

    return (
        <>
            <MapSection subaward={props.subaward} mapHasLoaded={mapHasLoaded} />
            <CategoriesSection subaward={props.subaward} categoriesHasLoaded={categoriesHasLoaded} setSelectedDropdown={setSelectedDropdown} selectedDropdown={selectedDropdown} />
            <TimeSection subaward={props.subaward} spendingHasLoaded={spendingHasLoaded} />
            <TableSection subaward={props.subaward} awardTableHasLoaded={awardTableHasLoaded} />
        </>
    );
};

SectionsContent.propTypes = propTypes;
export default SectionsContent;
