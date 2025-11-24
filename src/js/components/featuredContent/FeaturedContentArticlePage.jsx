/**
 * FeaturedContentArticlePage.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

import React, { useState, useEffect, useRef } from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import { throttle } from 'lodash-es';
import { useLocation } from 'react-router';
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
    const [sections, setSections] = useState([]);
    const [activeSection, setActiveSection] = useState([]);
    const [containsH2, setContainsH2] = useState(false);

    const contentRef = useRef(null);

    const jumpToSection = (section = '') => {
        // find the section in dom
        const sectionDom = contentRef.current.querySelector(`a[href="#${section}"]`);
        if (!sectionDom) return;

        setActiveSection(section);

        // add offsets
        const sectionTop = sectionDom.offsetTop;

        window.scrollTo({
            top: sectionTop + 100,
            left: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        if (markdownContent && contentRef.current) {
            // The amount of h2 elements determines if we show the in-page nav bar.  Only set contains h2 if there are 3 or more.
            const H2Elements = contentRef.current.querySelectorAll('h2');
            setContainsH2(H2Elements.length > 2);
            const H2Sections = [...H2Elements].map((H2) => (
                {
                    label: H2.innerText,
                    section: H2.innerText.toLowerCase().replace(/\s+/g, '-')
                }));
            setSections(H2Sections);

            for (let i = 0; i < H2Elements.length; i++) {
                H2Elements[i].querySelector('a').addEventListener('click', (e) => {
                    e.preventDefault();
                });
            }
        }
    },
    [markdownContent]);

    useEffect(() => {
        for (const article of articles) {
            if (transformString(article.title) === lastPortion) {
                setChosenArticle(article);
                setIsLongForm(Object.prototype.hasOwnProperty.call(article, 'isLongForm') ? article.isLongForm : false);
            }
        }
    }, [lastPortion]);

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

    console.log(activeSection);
    return (
        <PageWrapper
            pageName="Featured Content Article"
            classNames="featured-content-page"
            noHeader={!isLongForm}
            backgroundColor={isLongForm && chosenArticle?.fill}
            sections={sections?.length > 0 ? sections : [{ section: " ", label: " " }]}
            activeSection={activeSection?.length > 0 ? activeSection : ''}
            jumpToSection={jumpToSection}
            inPageNav={isLongForm}
            metaTagProps={{ ...homePageMetaTags }}>
            <main
                id="main-content"
                className="main-content featured-content">
                {!isLongForm && containsH2 && <FeaturedContentHeader
                    isMobile={isMobile}
                    isTablet={isTablet}
                    chosenArticle={chosenArticle} />}
                <FlexGridRow desktop={12} className="grid-content featured-content__article">
                    <FlexGridCol tablet={12} mobile={12} desktop={8}>
                        {isLongForm && containsH2 &&
                            <div className="featured-content__header-block">
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
                        <div ref={contentRef}>{markdownContent}</div>
                    </FlexGridCol>
                    <FeaturedContentArticleSidebar chosenArticle={chosenArticle} />
                </FlexGridRow>
            </main>
        </PageWrapper>);
};

export default FeaturedContentArticlePage;
