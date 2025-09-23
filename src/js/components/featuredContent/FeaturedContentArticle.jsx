/**
 * FeaturedContentArticle.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash-es';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import PageWrapper from "../sharedComponents/PageWrapper";
import ArticleHeader from "./article/ArticleHeader";
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

    useEffect(() => {
        for (const article of articles) {
            if (transformString(article.title) === lastPortion) {
                setChosenArticle(article);
            }
        }
    }, [chosenArticle]);


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

    console.debug("chosenArticle: ", chosenArticle);
    return (
        <PageWrapper
            pageName="Featured Content Article"
            classNames="featured-content-page"
            noHeader
            metaTagProps={{ ...homePageMetaTags }}>
            <main
                id="main-content"
                className="main-content featured-content">
                <div className="featured-content__img-wrapper">
                    {!isMobile ? <img src={chosenArticle?.hero} alt="data definitions hero" /> :
                        <img src={chosenArticle?.mobile_hero} alt="data definitions hero" />}
                </div>
            </main>
        </PageWrapper>);
};

export default FeaturedContentArticle;
