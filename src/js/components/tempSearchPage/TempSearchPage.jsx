import React, { Suspense, useEffect, useState } from "react";
import PageWrapper from "../sharedComponents/PageWrapper";
import PageFeatureFlag from "../sharedComponents/PageFeatureFlag";
import TempAwardTable from "./TempAwardTable";
import TempSpendingOverTime from "./TempSpendingOverTime";
import TempMapSection from "./TempMapSection";
import TempCategoriesSection from "./TempCategoriesSection";
import TempLoadingComponent from "./TempLoadingComponent";
import TempPlaceholderComponent from "./TempPlaceholderComponent";

require("pages/search/searchPage.scss");

const TempSearchPage = () => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [isVisible, setIsVisible] = useState('');
    const [spendingHasLoaded, setSpendingHasLoaded] = useState(false);
    const [mapHasLoaded, setMapHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);

    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const callbackFunction = (entries) => {
        entries.forEach((entry) => {
            const ratio = entry.intersectionRatio;
            const boundingRect = entry.boundingClientRect;
            const section = entry.target.className;

            const topThreshold = 1000;

            // todo - set new number for topThreshold for mobile and/or tablet
            // const newMode = checkScreenMode(window.innerWidth);
            //
            // if (newMode !== screenMode) {
            //     setScreenMode(newMode);
            // }
            //
            // if (newMode !== ScreenModeEnum.desktop) {
            //     topThreshold = 80;
            //     bottomThreshold = 95;
            // }

            const inView = boundingRect.top < topThreshold && ratio < 1;

            if (entry.isIntersecting && inView) {
                setIsVisible(section);
                if (section === 'spending') {
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
            <PageWrapper
                pageName="Temp Search Page"
                classNames="usa-da-search-page"
                title="Temp Search Page">
                <main id="main-content" className="main-content">
                    <Suspense fallback={<TempLoadingComponent />}>
                        <div id="search-page-component" className="award">
                            <TempAwardTable />
                        </div>
                    </Suspense>

                    <div id="search-page-component" className="spending">
                        {!spendingHasLoaded && <TempPlaceholderComponent />}
                        {(isVisible === 'spending' || spendingHasLoaded) &&
                            <TempSpendingOverTime />
                        }
                    </div>

                    <div id="search-page-component" className="map">
                        {!mapHasLoaded && <TempPlaceholderComponent />}
                        {(isVisible === 'map' || mapHasLoaded) &&
                            <TempMapSection />
                        }
                    </div>

                    <div id="search-page-component" className="categories">
                        {!categoriesHasLoaded && <TempPlaceholderComponent />}
                        {(isVisible === 'categories' || categoriesHasLoaded) &&
                            <TempCategoriesSection />
                        }
                    </div>
                </main>

            </PageWrapper>
        </PageFeatureFlag>
    );
};

export default TempSearchPage;
