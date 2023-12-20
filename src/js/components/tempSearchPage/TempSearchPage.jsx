import React, { lazy, Suspense, useEffect, useState } from "react";
import PageWrapper from "../sharedComponents/PageWrapper";
import PageFeatureFlag from "../sharedComponents/PageFeatureFlag";
import TempAwardTable from "./TempAwardTable";
import TempLoadingComponent from "./TempLoadingComponent";

const TempSpendingOverTime = lazy(() => import('./TempSpendingOverTime'));
const TempMapSection = lazy(() => import('./TempMapSection'));
const TempCategoriesSection = lazy(() => import('./TempCategoriesSection'));

require("pages/search/searchPage.scss");

const TempSearchPage = () => {
    const [observerSupported, setObserverSupported] = useState(false);
    const [isVisible, setIsVisible] = useState('');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        setObserverSupported('IntersectionObserver' in window);

        if (observerSupported) {
            // eslint-disable-next-line no-undef
            const target = '#search-page-component';
            const targets = document.querySelectorAll(target);

            console.log('targets', targets);

            // eslint-disable-next-line no-undef
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    console.log('entry', entry);
                    if (entry.isIntersecting) {
                        setIsVisible(entry.target.className);
                    }
                });
            });

            targets.forEach((i) => {
                if (i.className) {
                    console.log('i', i);
                    observer.observe(i);
                }
            });

            return () => observer.disconnect();
        }
    }, [observerOptions, observerSupported]);

    console.log('isVisible', isVisible);

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
                        {isVisible === 'spending' &&
                            <TempSpendingOverTime />
                        }
                    </div>

                    <div id="search-page-component" className="map">
                        {isVisible === 'map' &&
                            <TempMapSection />
                        }
                    </div>

                    <div id="search-page-component" className="categories">
                        {isVisible === 'categories' &&
                            <TempCategoriesSection />
                        }
                    </div>
                </main>

            </PageWrapper>
        </PageFeatureFlag>
    );
};

export default TempSearchPage;
