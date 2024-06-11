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

require("pages/search/searchPage.scss");

const propTypes = {
    subaward: PropTypes.bool
};

const SectionsContent = (props) => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [awardTableHasLoaded, setAwardTableHasLoaded] = useState(false);
    const [spendingHasLoaded, setSpendingHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState('awarding_agency');

    const observerOptions = {
        threshold: 0.1
    };

    // TODO:  Keep console logs here while debugging; Remove console logs before deploying new results view to prod
    const callbackFunction = (entries, observer) => {
        entries.forEach((entry) => {
            const section = entry.target.className;
            if (entry.isIntersecting) {
                if (section === 'award') {
                    setAwardTableHasLoaded(true);
                    console.log("award");
                    observer.unobserve(entry.target);
                }
                else if (section === 'spending') {
                    setSpendingHasLoaded(true);
                    console.log("spending");
                    observer.unobserve(entry.target);
                }
                else if (section === 'categories') {
                    setCategoriesHasLoaded(true);
                    console.log("categories");
                    observer.unobserve(entry.target);
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
            <MapSection subaward={props.subaward} />
            <CategoriesSection subaward={props.subaward} categoriesHasLoaded={categoriesHasLoaded} setSelectedDropdown={setSelectedDropdown} selectedDropdown={selectedDropdown} />
            <TimeSection subaward={props.subaward} spendingHasLoaded={spendingHasLoaded} />
            <TableSection subaward={props.subaward} awardTableHasLoaded={awardTableHasLoaded} />
        </>
    );
};

SectionsContent.propTypes = propTypes;
export default SectionsContent;
