import React, { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import PageWrapper from "../sharedComponents/PageWrapper";
import PageFeatureFlag from "../sharedComponents/PageFeatureFlag";
import TempAwardTable from "./TempAwardTable";
import TempLoadingComponent from "./TempLoadingComponent";
// import TempSpendingOverTime from "./TempSpendingOverTime";
// import TempMapSection from "./TempMapSection";
// import TempCategoriesSection from "./TempCategoriesSection";

const TempSpendingOverTime = lazy(() => import('./TempSpendingOverTime'));
const TempMapSection = lazy(() => import('./TempMapSection'));
const TempCategoriesSection = lazy(() => import('./TempCategoriesSection'));

require("pages/search/searchPage.scss");

const TempSearchPage = () => {
    const { ref: ref2, inView: inView2 } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });
    const { ref: ref3, inView: inView3 } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });
    const { ref: ref4, inView: inView4 } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <PageFeatureFlag>
            <PageWrapper
                pageName="Temp Search Page"
                classNames="usa-da-search-page"
                title="Temp Search Page">
                <main id="main-content" className="main-content">
                    <Suspense fallback={<TempLoadingComponent />}>
                        <TempAwardTable />
                    </Suspense>

                    {/* <Suspense fallback={<TempLoadingComponent />}> */}
                    {/*     <TempSpendingOverTime /> */}
                    {/* </Suspense> */}
                    <Suspense fallback={<TempLoadingComponent />}>
                        <div ref={ref2}>
                            {inView2 && <TempSpendingOverTime />}
                        </div>
                    </Suspense>

                    {/* <Suspense fallback={<TempLoadingComponent />}> */}
                    {/*     <TempMapSection /> */}
                    {/* </Suspense> */}
                    <Suspense fallback={<TempLoadingComponent />}>
                        <div ref={ref3}>
                            {inView3 && <TempMapSection />}
                        </div>
                    </Suspense>

                    {/* <Suspense fallback={<TempLoadingComponent />}> */}
                    {/*     <TempCategoriesSection /> */}
                    {/* </Suspense> */}
                    <Suspense fallback={<TempLoadingComponent />}>
                        <div ref={ref4}>
                            {inView4 && <TempCategoriesSection />}
                        </div>
                    </Suspense>
                </main>
            </PageWrapper>
        </PageFeatureFlag>
    );
};

export default TempSearchPage;
