/**
 * SectionsContent.jsx
 * Created by Brian Petway
 **/

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Analytics from "helpers/analytics/Analytics";
import TableSection from "./table/TableSection";
import CategoriesSection from "./categories/CategoriesSection";
import TimeSection from "./time/TimeSection";
import MapSection from "./map/MapSection";

require("../../../_scss/pages/search/searchPage.scss");

const logVisualizationViewEvent = (action, label) => window.setTimeout(
    () => Analytics.event({
        event: 'search_visualization_type',
        category: 'Advanced Search - Visualization Type',
        action,
        gtm: true,
        label
    }), 15 * 1000);

const propTypes = {
    tabData: PropTypes.object,
    hash: PropTypes.string,
    spendingLevel: PropTypes.string
};

const SectionsContent = ({
    tabData,
    hash,
    spendingLevel
}) => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [timeHasLoaded, setTimeHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
    const [mapHasLoaded, setMapHasLoaded] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState('awarding_agency');
    const observerOptions = {
        threshold: 0.1
    };

    const callbackFunction = (entries) => {
        entries.forEach((entry) => {
            const section = entry.target.className;
            if (entry.isIntersecting) {
                if (section === 'awards') {
                    logVisualizationViewEvent("awards", hash);
                }
                else if (section === 'time') {
                    setTimeHasLoaded(true);
                    logVisualizationViewEvent("time", hash);
                }
                else if (section === 'categories') {
                    setCategoriesHasLoaded(true);
                    logVisualizationViewEvent("categories", hash);
                }
                else if (section === "map") {
                    setMapHasLoaded(true);
                    logVisualizationViewEvent("map", hash);
                }
            }
        });
    };

    useEffect(() => {
        setObserverSupported('IntersectionObserver' in window);
    }, []);

    useEffect(() => {
        if (observerSupported) {
            const target = '#search-page-component';
            const targets = document.querySelectorAll(target);

            const observer = new IntersectionObserver(callbackFunction, observerOptions);

            targets.forEach((i) => {
                if (i.className) {
                    observer.observe(i);
                }
            });

            return () => observer.disconnect();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [observerSupported, hash]);

    return (
        <>
            <TableSection
                tabData={tabData}
                hash={hash}
                spendingLevel={spendingLevel} />
            <CategoriesSection
                spendingLevel={spendingLevel}
                categoriesHasLoaded={categoriesHasLoaded}
                setSelectedDropdown={setSelectedDropdown}
                selectedDropdown={selectedDropdown}
                hash={hash} />
            <TimeSection
                timeHasLoaded={timeHasLoaded}
                hash={hash}
                spendingLevel={spendingLevel} />
            <MapSection
                spendingLevel={spendingLevel}
                mapHasLoaded={mapHasLoaded}
                hash={hash} />
        </>
    );
};

SectionsContent.propTypes = propTypes;
export default SectionsContent;
