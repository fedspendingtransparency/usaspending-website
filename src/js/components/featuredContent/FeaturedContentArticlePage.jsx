/**
 * FeaturedContentArticlePage.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

import React, { useState, useEffect } from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import { throttle } from 'lodash-es';
import { useLocation } from 'react-router';
import { parse } from 'react-markdown';
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import PageWrapper from "../sharedComponents/PageWrapper";
import { mediumScreen, tabletScreen } from '../../dataMapping/shared/mobileBreakpoints';
import articles from '../../../config/featuredContent/featuredContentMetadata';
import { transformString } from '../../helpers/featuredContent/featuredContentHelper';
import FeaturedContentArticleSidebar from "./FeaturedContentArticleSidebar";
import FeaturedContentHeader from "./FeaturedContentHeader";

require('pages/featuredContent/featuredContent.scss');

const FeaturedContentArticlePage = () => {
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
    const [isLongForm, setIsLongForm] = useState(false);
    const [metHeadingThreshold, setMetHeadingThreshold] = useState(false);
    const [sections, setSections] = useState([]);


    useEffect(() => {
        for (const article of articles) {
            if (transformString(article.title) === lastPortion) {
                setChosenArticle(article);
                setIsLongForm(Object.prototype.hasOwnProperty.call(article, 'isLongForm') ? article.isLongForm : false);
            }
        }
    }, [lastPortion]);

    useEffect(() => {
    }, [markdownContent]);

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

            const elements = file?.default()?.props?.children;
            let h2Count = 0;
            const tmpSections = [];

            for (let i = 0; i < elements.length; i++) {
                if (elements[i]?.type === "h2") {
                    tmpSections.push({
                        section: elements[i].props.children.props.children,
                        label: elements[i].props.children.props.children,
                        href: elements[i].props.children.props.href
                    });
                    h2Count++;
                }
            }

            if (h2Count > 2) {
                setMetHeadingThreshold(true);
                setSections(tmpSections);
            }
        };
        if (chosenArticle !== null) {
            fetchMarkdown();
        }
    }, [chosenArticle]);

    return (
        <PageWrapper
            pageName="Featured Content Article"
            classNames="featured-content-page"
            noHeader={!isLongForm}
            backgroundColor={isLongForm && chosenArticle?.fill}
            sections={sections?.length > 0 ? sections : [{ section: " ", label: " " }]}
            activeSection={sections?.length > 0 ? sections[0]?.label : " "}
            inPageNav={isLongForm}
            metaTagProps={{ ...homePageMetaTags }}>
            <main
                id="main-content"
                className="main-content featured-content">
                {!isLongForm && metHeadingThreshold && <FeaturedContentHeader
                    isMobile={isMobile}
                    isTablet={isTablet}
                    chosenArticle={chosenArticle} />}
                <FlexGridRow desktop={12} className="grid-content featured-content__article">
                    <FlexGridCol tablet={12} mobile={12} desktop={8}>
                        {isLongForm && metHeadingThreshold && <div className="featured-content__header-block">
                            <span
                                className="featured-content__label"
                                style={{ backgroundColor: chosenArticle?.fill }}>
                                {chosenArticle?.taxonomy}
                            </span>
                        </div>}
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

export default FeaturedContentArticlePage;
