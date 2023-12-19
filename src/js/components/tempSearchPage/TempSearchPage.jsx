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
    const [spendingIsVisible, setSpendingIsVisible] = useState(false);
    const [mapIsVisible, setMapIsVisible] = useState(false);
    const [categoriesIsVisible, setCategoriesIsVisible] = useState(false);

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    function observerCallback(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.className.includes('spending')) {
                    console.log('in spending block');
                    setSpendingIsVisible(true);
                }
                else if (entry.target.className.includes('map')) {
                    console.log('in map block');
                    setMapIsVisible(true);
                }
                else if (entry.target.className.includes('categories')) {
                    console.log('in categories block');
                    setCategoriesIsVisible(true);
                }
            }
        });
    }

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        setObserverSupported('IntersectionObserver' in window);

        if (observerSupported) {
            // eslint-disable-next-line no-undef
            const observer = new IntersectionObserver(observerCallback, observerOptions);
            const target = '#search-page-component';
            const targets = document.querySelectorAll(target);
            targets.forEach((i) => {
                if (i) {
                    observer.observe(i);
                }
            });
            return () => observer.disconnect();

            // eslint-disable-next-line no-undef
            //         const spendingObserver = new IntersectionObserver(observerCallback, observerOptions);
            //         const spendingTarget = document.getElementsByClassName('spending');
            //         console.log('spendingTarget', spendingTarget);
            //         spendingObserver.observe(spendingTarget[0]);
            //
            //         return () => spendingObserver.disconnect();
        }
    }, [observerOptions, observerSupported]);

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
                        {spendingIsVisible &&
                            <TempSpendingOverTime />
                        }
                    </div>

                    {/* <Suspense fallback={<TempLoadingComponent />}> */}
                    {/*     <div id="search-page-component" className="spending"> */}
                    {/*         {spendingIsVisible && */}
                    {/*             <TempSpendingOverTime /> */}
                    {/*         } */}
                    {/*     </div> */}
                    {/* </Suspense> */}


                    <div id="search-page-component" className="map">
                        {mapIsVisible &&
                            <TempMapSection />
                        }
                    </div>

                    {/* <Suspense fallback={<TempLoadingComponent />}> */}
                    {/*     <div id="search-page-component" className="map"> */}
                    {/*         {mapIsVisible && */}
                    {/*             <TempMapSection /> */}
                    {/*         } */}
                    {/*     </div> */}
                    {/* </Suspense> */}


                    <div id="search-page-component" className="categories">
                        {categoriesIsVisible &&
                            <TempCategoriesSection />
                        }
                    </div>

                    {/* <Suspense fallback={<TempLoadingComponent />}> */}
                    {/*     <div id="search-page-component" className="categories"> */}
                    {/*         {categoriesIsVisible && */}
                    {/*             <TempCategoriesSection /> */}
                    {/*         } */}
                    {/*     </div> */}
                    {/* </Suspense> */}

                </main>

            </PageWrapper>
        </PageFeatureFlag>
    );
};

export default TempSearchPage;
