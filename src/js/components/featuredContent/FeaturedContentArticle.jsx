/**
 * FeaturedContentArticlePage.jsx
 * Created by Andrea Blackwell 9/11/2025
 **/

import React, { useState, useEffect, useRef } from 'react';
import { FlexGridCol, FlexGridRow } from 'data-transparency-ui';
import { throttle } from 'lodash-es';
import { useLocation } from 'react-router';

import { homePageMetaTags } from "helpers/metaTagHelper";
import PageWrapper from "components/sharedComponents/PageWrapper";
import { mediumScreen, tabletScreen } from 'dataMapping/shared/mobileBreakpoints';
import { transformString, getPrimaryFill, CustomA, CustomImg } from 'helpers/featuredContent/featuredContentHelper';
import GlossaryLink from "components/sharedComponents/GlossaryLink";
import FeaturedContentArticleSidebar from "./FeaturedContentArticleSidebar";
import articles from '../../../config/featuredContent/featuredContentMetadata';
import FeaturedContentHeader from "./FeaturedContentHeader";

require('pages/featuredContent/featuredContent.scss');

const components = {
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
    const [isLongForm, setIsLongForm] = useState(false);
    const [sections, setSections] = useState([]);
    const [activeSection, setActiveSection] = useState([]);

    const contentRef = useRef(null);


    const jumpToSection = (section = '') => {
        console.log(section);
        // find the section in dom
        const sectionDom = document.querySelector(`a[href="#${section}"]`);
        if (!sectionDom) return;

        setActiveSection(section);

        // add offsets
        const sectionTop = sectionDom.offsetTop;

        window.scrollTo({
            top: sectionTop + 60,
            left: 0,
            behavior: 'smooth'
        });
    };

    // useEffect(() => {
    //     console.log(MarkdownContent);
    //     if (MarkdownContent) {
    //         const H2Elements = document.querySelectorAll('h2');
    //         if (H2Elements) {
    //             const H2Sections = [...H2Elements].map((H2) => (
    //                 {
    //                     label: H2.innerText,
    //                     section: H2.innerText.toLowerCase().replace(/\s+/g, '-')
    //                 }));
    //             setSections(H2Sections);
    //
    //             for (let i = 0; i < H2Elements?.length; i++) {
    //                 H2Elements[i].querySelector('a')?.addEventListener('click', (e) => {
    //                     e.preventDefault();
    //                 });
    //             }
    //         }
    //     }
    // },
    // [MarkdownContent, contentRef?.current]);

    useEffect(() => {
        for (const article of articles) {
            if (transformString(article.title) === lastPortion) {
                setChosenArticle(article);
                setIsLongForm(Object.prototype.hasOwnProperty.call(article, 'isLongForm') ? article.isLongForm : false);

                const tempSections = [];
                for (let i = 0; i < article?.sections?.length; i++) {
                    tempSections.push({
                        section: transformString(article?.sections[i]),
                        label: article?.sections[i]
                    });
                }

                if (tempSections?.length > 0) {
                    setSections(tempSections);

                    const H2Elements = document.querySelectorAll('h2');
                    if (H2Elements) {
                        for (let i = 0; i < H2Elements?.length; i++) {
                            H2Elements[i].querySelector('a')?.addEventListener('click', (e) => {
                                e.preventDefault();
                            });
                        }
                    }
                }
                else {
                    setSections([{
                        section: "",
                        label: ""
                    }]);
                }


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
            noHeader={!isLongForm}
            backgroundColor={isLongForm && getPrimaryFill(chosenArticle)}
            sections={sections?.length > 0 ? sections : [{ section: " ", label: " " }]}
            activeSection={activeSection}
            jumpToSection={jumpToSection}
            inPageNav={isLongForm}
            metaTagProps={{ ...homePageMetaTags }}>
            <main
                id="main-content"
                className="main-content featured-content">
                {isLongForm &&
                    <div className="featured-content__header-block">
                        <span
                            className="featured-content__label"
                            style={{ backgroundColor: getPrimaryFill(chosenArticle) }}>
                            {chosenArticle?.taxonomy}
                        </span>
                    </div>}
                {!isLongForm && <FeaturedContentHeader
                    isMobile={isMobile}
                    isTablet={isTablet}
                    chosenArticle={chosenArticle} />}
                <FlexGridRow desktop={12} className="grid-content featured-content__article-body">
                    <FlexGridCol tablet={12} mobile={12} desktop={8}>
                        <div className="featured-content__article-title">
                            {chosenArticle?.title}
                        </div>
                        <div className="featured-content__last-updated">
                            Last Updated: {chosenArticle?.created_date}
                        </div>
                        {chosenArticle && typeof MarkdownContent === "function" && <MarkdownContent ref={contentRef} components={components} />}
                    </FlexGridCol>
                    <FeaturedContentArticleSidebar chosenArticle={chosenArticle} />
                </FlexGridRow>
            </main>
        </PageWrapper>);
};

export default FeaturedContentArticle;
