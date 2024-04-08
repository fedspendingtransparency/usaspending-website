import React, { useEffect, useState } from "react";
import PageFeatureFlag from "../../sharedComponents/PageFeatureFlag";
import AwardTable from "./TableSection/AwardTable";
import SpendingOverTime from "./SpendingOverTime";
import MapSection from "./MapSection";
import CategoriesVisualization from "./CategoriesSection/CategoriesVisualization";
import { TempPlaceholderComponent, TempPlaceholderChart, TempPlaceholderTable, TempPlaceholderDsmContent } from "./TempPlaceholderComponents";
import SearchSectionWrapper from "./SearchSectionWrapper";
import TableSection from "./TableSection/TableSection";
import CategoriesSection from "./CategoriesSection/CategoriesSection";

require("pages/search/searchPage.scss");

const ResultsView = () => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [isVisible, setIsVisible] = useState('');
    const [awardTableHasLoaded, setAwardTableHasLoaded] = useState(false);
    const [spendingHasLoaded, setSpendingHasLoaded] = useState(false);
    const [mapHasLoaded, setMapHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);
    const [viewType, setViewType] = useState('chart');

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
                }
                else if (section === 'spending') {
                    setSpendingHasLoaded(true);
                }
                else if (section === 'map') {
                    setMapHasLoaded(true);
                }
                else if (section === 'categories') {
                    setCategoriesHasLoaded(true);
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
                <TableSection
                    awardTableHasLoaded={awardTableHasLoaded} />

                <CategoriesSection
                    categoriesHasLoaded={categoriesHasLoaded} />

                <div id="search-page-component" className="spending">
                    {!spendingHasLoaded && <TempPlaceholderComponent />}
                    {(isVisible === 'spending' || spendingHasLoaded) &&
                            <SpendingOverTime />
                    }
                </div>

                <div id="search-page-component" className="map">
                    {!mapHasLoaded && <TempPlaceholderComponent />}
                    {(isVisible === 'map' || mapHasLoaded) &&
                            <MapSection />
                    }
                </div>
            </main>
        </PageFeatureFlag>
    );
};

export default ResultsView;
