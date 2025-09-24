/**
 * FeaturedContentArticle.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ComingSoon } from "data-transparency-ui";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import PageWrapper from "../sharedComponents/PageWrapper";


require('pages/contentPage/contentPage.scss');

const FeaturedContentPage = () => (
    <PageWrapper
        pageName="Featured Content Article"
        classNames="content-page"
        noHeader
        metaTagProps={{ ...homePageMetaTags }}>
        <main
            id="main-content"
            className="main-content content-page">
            <ComingSoon />
        </main>
    </PageWrapper>);

export default FeaturedContentPage;
