/**
 * FeaturedContentArticle.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

import React, { useState, useEffect } from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import { throttle } from 'lodash-es';
import { useLocation } from 'react-router';

import GlossaryLink from 'components/sharedComponents/GlossaryLink';
import { homePageMetaTags } from "helpers/metaTagHelper";
import PageWrapper from "../sharedComponents/PageWrapper";
import { mediumScreen, tabletScreen } from '../../dataMapping/shared/mobileBreakpoints';
import articles from '../../../config/featuredContent/featuredContentMetadata';
import { transformString } from '../../helpers/featuredContent/featuredContentHelper';
import FeaturedContentArticleSidebar from "./FeaturedContentArticleSidebar";

require('pages/featuredContent/featuredContent.scss');

const contentTaxonomyNameToKey = {
    "Data Definitions": "dataDefinition",
    "My USAspending Search": "search",
    "See 4 Yourself": "seeforyourself",
    "Recently Answered Questions": "questions",
    "Exploring America's Finances": "finances",
    "Data You Can Trust": "trust",
    "Spending Stories": "stories",
    "What's the Difference?": "difference"
};

const primaryFill = {
    dataDefinition: '#783CB9',
    search: '#D54309',
    seeforyourself: '#E66F0E',
    questions: '#864381',
    finances: '#1B2B85',
    trust: '#73B3E7',
    stories: '#2378C3',
    difference: '#5ABF95'
};

const secondaryFill = {
    dataDefinition: '#D5BFFF',
    search: '#F6BD9C',
    seeforyourself: '#FFBC78',
    questions: '#E2BEE4',
    finances: '#628EF4',
    trust: '#D9E8F6',
    stories: '#73B3E7',
    difference: '#DBF6ED'
};

const CustomA = (props) =>
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    (<a target="_blank" rel="noopener noreferrer" {...props} />);

const CustomImg = (props) => (<img src={`../../img/featuredContent/articles/${props.src}`} alt={props.alt} />);

export const components = {
    GlossaryLink,
    a: CustomA,
    img: CustomImg
};

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
    const [MarkdownContent, setMarkdownContent] = useState(null);

    const getPrimaryFill = () => {
        if (!chosenArticle) return 'none';
        return (primaryFill[contentTaxonomyNameToKey[chosenArticle.taxonomy]]);
    };
    const getSecondaryFill = () => {
        if (!chosenArticle) return 'none';
        return (secondaryFill[contentTaxonomyNameToKey[chosenArticle.taxonomy]]);
    };

    const heroPath = "../../img/featuredContent/banner/desktop/banner-";

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
            const file = await import(`../../../content/featuredContent/${chosenArticle.slug}.mdx`);
            setMarkdownContent(() => file.default || file);
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
                    style={{ backgroundColor: (isMobile || isTablet) && getPrimaryFill() }}>
                    { !isMobile &&
                        !isTablet &&
                        <img
                            src={chosenArticle?.slug ? `${heroPath}${chosenArticle?.slug}.webp` : null}
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
                            style={{ backgroundColor: getSecondaryFill() }}>
                            {chosenArticle?.taxonomy}
                        </span>
                        <span className="featured-content__title">
                            {chosenArticle?.title}
                        </span>
                        <span className="featured-content__subtitle">
                            {chosenArticle?.banner_subtitle}
                        </span>
                    </FlexGridCol>
                </FlexGridRow>
                <FlexGridRow desktop={12} className="grid-content featured-content__article-body">
                    <FlexGridCol tablet={12} mobile={12} desktop={8}>
                        <div className="featured-content__article-title">
                            {chosenArticle?.title}
                        </div>
                        <div className="featured-content__last-updated">
                            Last Updated: {chosenArticle?.created_date}
                        </div>
                        {chosenArticle && typeof MarkdownContent === "function" && <MarkdownContent components={components} />}
                    </FlexGridCol>
                    <FeaturedContentArticleSidebar chosenArticle={chosenArticle} />
                </FlexGridRow>
            </main>
        </PageWrapper>);
};

export default FeaturedContentArticle;
