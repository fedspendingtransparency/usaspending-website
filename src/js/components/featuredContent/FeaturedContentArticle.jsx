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
import { mediumScreen, tabletScreen } from '../../dataMapping/shared/mobileBreakpoints';
import articles from '../../../config/featuredContent/featuredContentMetadata';
import { transformString } from '../../helpers/featuredContent/featuredContentHelper';
import RelatedTerms from './RelatedTerms';
import ExploreMore from './ExploreMore';

require('pages/featuredContent/featuredContent.scss');

const FeaturedContentArticle = () => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [isTablet, setIsTablet] = useState(window.innerWidth < mediumScreen && window.innerWidth >= tabletScreen);
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
                <FlexGridRow className="featured-content__header-wrapper">
                    {!isMobile && !isTablet && <img src={chosenArticle?.hero} alt="hero" name="featured-content-hero" id="featured-content-hero" />}
                    {isMobile && <img src={chosenArticle?.mobile_hero} alt="hero" name="featured-content-hero" id="featured-content-hero" />}
                    {isTablet && <img src={chosenArticle?.tablet_hero} alt="hero" name="featured-content-hero" id="featured-content-hero" />}
                    <FlexGridCol desktopxl={{ span: 3, offset: 7 }} desktop={{ span: 4, offset: 7 }} tablet={{ span: 7, offset: 1 }} mobile={{ span: 10, offset: 1 }} className="featured-content__header-block">
                        <span className="featured-content__label" style={{ backgroundColor: chosenArticle?.fill }}>{chosenArticle?.content_type}</span>
                        <span className="featured-content__title">{chosenArticle?.banner_title}</span>
                        <span className="featured-content__subtitle">{chosenArticle?.banner_subtitle}</span>
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow desktop={12} className="grid-content">
                    <FlexGridCol tablet={12} mobile={12} desktop={8}>
                        <div className="featured-content__article-title">{chosenArticle?.title}</div>
                        <div className="featured-content__last-updated">
                            Last Updated: {chosenArticle?.created_date}
                        </div>
                        {markdownContent}
                    </FlexGridCol>
                    <FlexGridCol
                        tablet={12}
                        mobile={12}
                        desktop={4}
                        className="featured-content__column-two">
                        <div>share</div>
                        {chosenArticle?.explore_more.length > 0 &&
                            <ExploreMore
                                header="Explore More"
                                citations={chosenArticle?.explore_more} />
                        }
                        {chosenArticle?.related_terms.length > 0 &&
                            <RelatedTerms
                                header="Related Terms"
                                citations={chosenArticle?.related_terms} />
                        }
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>);
};

export default FeaturedContentArticle;
