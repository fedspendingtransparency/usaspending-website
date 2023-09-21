import React, { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import PageWrapper from "./sharedComponents/PageWrapper";
import PageFeatureFlag from "./sharedComponents/PageFeatureFlag";
import TempComponent1 from "./TempComponent1";
import TempComponent2 from "./TempComponent2";
import TempLoadingComponent from "./TempLoadingComponent";

const TempComponent3 = lazy(() => import('./TempComponent3'));
const TempComponent4 = lazy(() => import('./TempComponent4'));

require("pages/search/searchPage.scss");

const TempSearchPage = () => {
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
                        <TempComponent1 />
                    </Suspense>
                    <TempComponent2 />
                    <Suspense fallback={<TempLoadingComponent />}>
                        <div ref={ref3}>
                            {inView3 && <TempComponent3 />}
                        </div>
                    </Suspense>
                    <TempComponent2 />
                    <Suspense fallback={<TempLoadingComponent />}>
                        <div ref={ref4}>
                            {inView4 && <TempComponent4 />}
                        </div>
                    </Suspense>
                </main>
            </PageWrapper>
        </PageFeatureFlag>
    );
};

export default TempSearchPage;
