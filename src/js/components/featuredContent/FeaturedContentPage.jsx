/**
 * FeaturedContentPage.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PageWrapper from '../sharedComponents/PageWrapper';
import ArticleMetadata from '../../models/v2/featuredContent/ArticleMetadata';
import { articles } from '../../../config/featuredContent/featuredContentMetadata';
import ArticleList from './list/ArticleList';
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import ContentPageHeader from '../sharedComponents/header/ContentPageHeader';

require('pages/featuredContent/featuredContent.scss');

const FeaturedContentPage = () => {
    const articlesList = [];

    articles.forEach((item) => {
        const articleMetadata = Object.create(ArticleMetadata);
        articleMetadata.populate(item);
        articlesList.push(articleMetadata);
    });
    return (
        <PageWrapper
            pageName="Featured Content"
            classNames="featured-content-page"
            noHeader
            metaTagProps={{ ...homePageMetaTags }}>
            <main
                id="main-content"
                className="main-content featured-content">
                <ContentPageHeader
                    className="content-page-header"
                    kicker="RESOURCES"
                    title="Featured Content"
                    body="Read the latest featured content to learn more about government spending."
                    image="img/contentPage/featured-content-landing-page-banner-2x.webp"
                    slug="featured-content" />
                <ArticleList articles={articlesList} />
            </main>
        </PageWrapper>

    );
};

export default FeaturedContentPage;
