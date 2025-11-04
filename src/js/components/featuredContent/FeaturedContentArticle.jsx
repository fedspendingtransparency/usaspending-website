/**
 * FeaturedContentArticle.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

import React, { useState, useEffect } from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import { throttle } from 'lodash-es';
import { useLocation } from 'react-router';
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import PageWrapper from "../sharedComponents/PageWrapper";
import { mediumScreen, tabletScreen } from '../../dataMapping/shared/mobileBreakpoints';
import articles from '../../../config/featuredContent/featuredContentMetadata';
import { transformString } from '../../helpers/featuredContent/featuredContentHelper';
import FeaturedContentArticleSidebar from "./FeaturedContentArticleSidebar";

require('pages/featuredContent/featuredContent.scss');

const FeaturedContentArticle = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isTablet, setIsTablet] = useState(
        window.innerWidth < mediumScreen && window.innerWidth >= tabletScreen
    );
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
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
                setIsTablet(window.innerWidth < mediumScreen && window.innerWidth >= tabletScreen);
                setIsMobile(window.innerWidth < tabletScreen);
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
                <FlexGridRow
                    className="featured-content__header-wrapper"
                    style={{ backgroundColor: (chosenArticle?.fill) ? chosenArticle.fill : 'none' }}>
                    { !isMobile &&
                        !isTablet &&
                        <img
                            src={chosenArticle?.hero}
                            alt="hero"
                            name="featured-content-hero"
                            id="featured-content-hero" />
                    }
                    <FlexGridCol
                        desktopxl={{ span: 4, offset: 1 }}
                        desktop={{ span: 5, offset: 1 }}
                        tablet={{ span: 10, offset: 2 }}
                        mobile={{ span: 10, offset: 1 }}
                        className={`featured-content__header-block usa-dt-flex-grid__row ${chosenArticle?.black_text ? "black-text" : ""}`}>
                        <span
                            className="featured-content__label"
                            style={{ backgroundColor: chosenArticle?.secondary }}>
                            {chosenArticle?.content_type}
                        </span>
                        <span className="featured-content__title">
                            {chosenArticle?.banner_title}
                        </span>
                        <span className="featured-content__subtitle">
                            {chosenArticle?.banner_subtitle}
                        </span>
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow desktop={12} className="grid-content">
                    <FlexGridCol tablet={12} mobile={12} desktop={8}>
                        <div className="featured-content__article-title">
                            {chosenArticle?.title}
                        </div>
                        <div className="featured-content__last-updated">
                            Last Updated: {chosenArticle?.created_date}
                        </div>
                        {markdownContent}
                    </FlexGridCol>
                    <FeaturedContentArticleSidebar chosenArticle={chosenArticle} />
                </FlexGridRow>
            </main>
        </PageWrapper>);
};

export default FeaturedContentArticle;
