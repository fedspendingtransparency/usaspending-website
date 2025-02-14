/**
 * SectionsContent.jsx
 * Created by Brian Petway
 **/

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import TableSection from "./table/TableSection";
import CategoriesSection from "./categories/CategoriesSection";
import TimeSection from "./time/TimeSection";
import MapSection from "./map/MapSection";
import Analytics from "../../../helpers/analytics/Analytics";

require("pages/search/searchPage.scss");

const propTypes = {
    subaward: PropTypes.bool,
    tabData: PropTypes.object,
    hash: PropTypes.string
};

const SectionsContent = (props) => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [timeHasLoaded, setTimeHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
    const [mapHasLoaded, setMapHasLoaded] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState('awarding_agency');
    const observerOptions = {
        threshold: 0.1
    };

    const logVisualizationViewEvent = (activeLabel) => {
        window.setTimeout(() => {
            Analytics.event({
                event: 'search_visualization_type',
                category: 'Advanced Search - Visualization Type',
                action: activeLabel,
                gtm: true,
                label: props.hash
            });
        }, 15 * 1000);
    };

    const callbackFunction = (entries) => {
        entries.forEach((entry) => {
            const section = entry.target.className;
            if (entry.isIntersecting) {
                if (section === 'awards') {
                    logVisualizationViewEvent("awards");
                }
                else if (section === 'time') {
                    setTimeHasLoaded(true);
                    logVisualizationViewEvent("time");
                }
                else if (section === 'categories') {
                    setCategoriesHasLoaded(true);
                    logVisualizationViewEvent("categories");
                }
                else if (section === "map") {
                    setMapHasLoaded(true);
                    logVisualizationViewEvent("map");
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
    }, [observerSupported, props.hash]);

    return (
        <>
            <TableSection {...props} />
            <CategoriesSection subaward={props.subaward} categoriesHasLoaded={categoriesHasLoaded} setSelectedDropdown={setSelectedDropdown} selectedDropdown={selectedDropdown} hash={props.hash} />
            <TimeSection subaward={props.subaward} timeHasLoaded={timeHasLoaded} hash={props.hash} />
            <MapSection subaward={props.subaward} mapHasLoaded={mapHasLoaded} hash={props.hash} />
        </>
    );
};

SectionsContent.propTypes = propTypes;
export default SectionsContent;
