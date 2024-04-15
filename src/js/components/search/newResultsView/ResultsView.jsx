import React, { useEffect, useState } from "react";
import PageFeatureFlag from "../../sharedComponents/PageFeatureFlag";
import TableSection from "./table/TableSection";
import CategoriesSection from "./categories/CategoriesSection";
import TimeSection from "./time/TimeSection";
import MapSection from "./map/MapSection";

require("pages/search/searchPage.scss");

const ResultsView = (props) => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [isVisible, setIsVisible] = useState('');
    const [awardTableHasLoaded, setAwardTableHasLoaded] = useState(false);
    const [spendingHasLoaded, setSpendingHasLoaded] = useState(false);
    const [mapHasLoaded, setMapHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);

    const observerOptions = {
        threshold: 0.1
    };

    const callbackFunction = (entries) => {
        entries.forEach((entry) => {
            const section = entry.target.className;

            if (entry.isIntersecting) {
                setIsVisible(section);
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


    // eslint-disable-next-line consistent-return
    useEffect(() => {
        setObserverSupported('IntersectionObserver' in window);

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
        <PageFeatureFlag>
            <main id="main-content" className="main-content">
                {/*<MapSection*/}
                {/*    subaward={props.subaward}*/}
                {/*    mapHasLoaded={mapHasLoaded} />*/}

                <CategoriesSection
                    subaward={props.subaward}
                    categoriesHasLoaded={categoriesHasLoaded} />

                <TimeSection
                    subaward={props.subaward}
                    spendingHasLoaded={spendingHasLoaded} />

                <TableSection
                    subaward={props.subaward}
                    awardTableHasLoaded={awardTableHasLoaded} />
            </main>
        </PageFeatureFlag>
    );
};

export default ResultsView;
