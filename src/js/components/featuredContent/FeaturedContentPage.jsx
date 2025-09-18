/**
 * FeaturedContentPage.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

// eslint-disable-next-line no-unused-vars
import React from 'react';
import PageWrapper from '../sharedComponents/PageWrapper';
import ArticleMetadata from '../../models/v2/featuredContent/ArticleMetadata';
import { articles } from '../../../config/featured_content/featuredContentMetadata';
import ArticleList from './articleList/ArticleList';

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
            noHeader>
            <main
                id="main-content"
                className="main-content featured-content">
                <ArticleList articles={articlesList} />
            </main>
        </PageWrapper>

    );
};

export default FeaturedContentPage;
