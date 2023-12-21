import React, { lazy, Suspense, useEffect, useState } from "react";
import PageWrapper from "../sharedComponents/PageWrapper";
import PageFeatureFlag from "../sharedComponents/PageFeatureFlag";
import TempAwardTable from "./TempAwardTable";
import TempLoadingComponent from "./TempLoadingComponent";
import TempPlaceholderComponent from "./TempPlaceholderComponent";

const TempSpendingOverTime = lazy(() => import('./TempSpendingOverTime'));
const TempMapSection = lazy(() => import('./TempMapSection'));
const TempCategoriesSection = lazy(() => import('./TempCategoriesSection'));

require("pages/search/searchPage.scss");

const TempSearchPage = () => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [isVisible, setIsVisible] = useState('');
    const [spendingHasLoaded, setSpendingHasLoaded] = useState(false);
    const [mapHasLoaded, setMapHasLoaded] = useState(false);
    const [categoriesHasLoaded, setCategoriesHasLoaded] = useState(false);

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0.25, 0.75]
    };

    // let previousY = sections.reduce(
    //     (result, item) => ((result[item.anchor] = 0), result),
    //     {}
    // );

    const callbackFunction = (entries) => {
        entries.forEach((entry) => {
            // if (entry.isIntersecting) {
            //     setIsVisible(entry.target.className);
            // }

            const ratio = entry.intersectionRatio;
            const boundingRect = entry.boundingClientRect;
            const section = entry.target.className;
            // const section = entry.target.id.replace('section-', '');
            // const isScrollingDown = previousY[section] > boundingRect.y;

            // const topThreshold = 15;
            const topThreshold = 1000;
            const bottomThreshold = 0;

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

            const inView =
                boundingRect.top < topThreshold &&
                boundingRect.bottom > bottomThreshold;

            if (entry.isIntersecting && ratio < 1 && inView) {
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

            // previousY = {
            //     ...previousY,
            //     [section]: boundingRect.y
            // };
        });
    };

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        setObserverSupported('IntersectionObserver' in window);

        if (observerSupported) {
            // eslint-disable-next-line no-undef
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
