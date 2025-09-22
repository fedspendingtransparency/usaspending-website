/**
 * FeaturedContentArticle.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { ComingSoon } from "data-transparency-ui";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import PageWrapper from "../sharedComponents/PageWrapper";
import ArticleHeader from "./article/ArticleHeader";

require('pages/featuredContent/featuredContent.scss');

const propTypes = {
    heroImage: PropTypes.string,
    mobileHeroImage: PropTypes.string
};

const FeaturedContentArticle = (
    heroImage, mobileHeroImage
) => (
    <PageWrapper
        pageName="Featured Content Article"
        classNames="content-page"
        noHeader
        metaTagProps={{ ...homePageMetaTags }}>
        <main
            id="main-content"
            className="main-content content-page">
            <ArticleHeader image={heroImage} mobileImage={mobileHeroImage} />
            <ComingSoon />
        </main>
    </PageWrapper>);

FeaturedContentArticle.propTypes = propTypes;
export default FeaturedContentArticle;
