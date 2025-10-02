/**
 * FeaturedContentArticle.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import { throttle } from 'lodash-es';
import { useLocation } from 'react-router';
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import PageWrapper from "../sharedComponents/PageWrapper";
// import ArticleHeader from "./article/ArticleHeader";
import { mediumScreen } from '../../dataMapping/shared/mobileBreakpoints';
import { articles } from '../../../config/featuredContent/featuredContentMetadata';
import { transformString } from '../../helpers/featuredContent/featuredContentHelper';

require('pages/featuredContent/featuredContent.scss');

const FeaturedContentArticle = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);
    const location = useLocation();
    const parts = location.pathname.split('/');
    const lastPortion = parts[parts.length - 1];
    const [chosenArticle, setChosenArticle] = useState(null);
    const [markdownContent, setMarkdownContent] = useState('');

    useEffect(() => {
        for (const article of articles) {
            if (transformString(article.title) === lastPortion) {
                setChosenArticle(article);
            }
        }
    }, [chosenArticle, lastPortion]);


    useEffect(() => {
        const handleResize = throttle(() => {
            if (windowWidth !== window.innerWidth) {
                setWindowWidth(window.innerWidth);
                setIsMobile(window.innerWidth < mediumScreen);
            }
        }, 100);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth]);

    useEffect(() => {
        const fetchMarkdown = async () => {
            const file = await import(`../../../content/featuredContent/${chosenArticle.mdx_path}`);
            setMarkdownContent(file.default());
        };
        if (chosenArticle !== null) {
            fetchMarkdown();
        }
    }, [chosenArticle]);

    return (
        <PageWrapper
            pageName="Featured Content Article"
            classNames="featured-content-page"
            noHeader
            metaTagProps={{ ...homePageMetaTags }}>
            <main
                id="main-content"
                className="main-content featured-content">
                <div className="featured-content__header-wrapper">
                    {!isMobile ?
                        <label htmlFor="featured-content-hero" className="featured-content__label">{chosenArticle?.content_type}</label>
                        : null}
                    {!isMobile ? <img src={chosenArticle?.hero} alt="data definitions hero" name="featured-content-hero" id="featured-content-hero" /> :
                        <img src={chosenArticle?.mobile_hero} alt="data definitions hero" />}
                </div>
                <FlexGridRow desktop={12} className="grid-content">
                    <FlexGridCol tablet={12} mobile={12} desktop={8}>
                        {markdownContent}
                    </FlexGridCol>
                    <FlexGridCol tablet={12} mobile={12} desktop={4}>
                        <div>share/explore/related</div>
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>);
};

export default FeaturedContentArticle;
