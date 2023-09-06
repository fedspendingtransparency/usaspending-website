import React, { Suspense } from "react";
import PageWrapper from "./sharedComponents/PageWrapper";
import PageFeatureFlag from "./sharedComponents/PageFeatureFlag";
import TempComponent1 from "./tempComponent1";
import TempComponent2 from "./tempComponent2";
import TempComponent3 from "./tempComponent3";
import TempComponent4 from "./tempComponent4";
import TempLoadingComponent from "./tempLoadingComponent";

require("pages/search/searchPage.scss");

const tempSearchPage = () => (
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
                <TempComponent3 />
                <TempComponent4 />
            </main>
        </PageWrapper>
    </PageFeatureFlag>
);

export default tempSearchPage;
