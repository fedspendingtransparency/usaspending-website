import React, { Suspense, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useQueryParams } from 'helpers/queryParams';
import PageWrapper from "./sharedComponents/PageWrapper";
import PageFeatureFlag from "./sharedComponents/PageFeatureFlag";
import TempComponent1 from "./TempComponent1";
import TempComponent2 from "./TempComponent2";
import TempComponent3 from "./TempComponent3";
import TempComponent4 from "./TempComponent4";
import TempLoadingComponent from "./TempLoadingComponent";
import { kebabCase, snakeCase } from "lodash";
import { getVerticalOffset } from "../helpers/covid19Helper";
import { scrollToY } from 'helpers/scrollToHelper';


require("pages/search/searchPage.scss");

const TempSearchPage = () => {
    const containerRef = useRef(null);
    const query = useQueryParams();
    const history = useHistory();
    const [activeSection, setActiveSection] = useState(query.section || 'one');
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleText, setIsVisibleText] = useState([]);

    const sections = [
        {
            name: 'one'
        },
        {
            name: 'two'
        },
        {
            name: 'three'
        },
        {
            name: 'four'
        }
    ];

    const options = {
        threshold: 0.1
    };

    const jumpToSection = (
        section = ''
    ) => {
        // we've been provided a section to jump to
        // check if it's a valid section
        let matchedSection;
        sections.forEach((s) => {
            if (section === s.name) {
                matchedSection = s;
            }
        });

        if (!matchedSection) {
            // no matching section
            return;
        }

        // find the section in dom
        const selector = matchedSection.name;
        const sectionDom = document.querySelector(selector);

        if (!sectionDom) {
            return;
        }

        // add offsets
        scrollToY(sectionDom.offsetTop, 700);
    };

    const handleJumpToSection = (section) => {
        jumpToSection(section);

        // add section to url
        history.replace(`${history.location.pathname}?section=${section.name}`);

        // update the state
        setActiveSection(section);
    };

    const callback = (entries) => {
        entries.forEach((entry) => {
            // console.log('entry', entry);
            setIsVisible(entry.isIntersecting);
            // setIsVisibleText(entry.target.id);
            if (entry.isIntersecting) {
                // add section to url
                history.replace(`${history.location.pathname}?section=${entry.target.id}`);
            }
        });
    };

    useEffect(() => {
        // eslint-disable-next-line no-undef
        const observer = new IntersectionObserver(callback, options);

        sections.forEach((section) => {
            const target = document.getElementById(`temp-component-${section.name}`);
            if (target) {
                observer.observe(target);
            }
        });

        // if (containerRef.current) observer.observe(containerRef.current);

        // return () => {
        //     if (containerRef.current) observer.unobserve(containerRef.current);
        // };

        return () => observer.disconnect();
    }, [callback, containerRef, options, sections]);

    useEffect(() => {
        if (query.section) {
            handleJumpToSection(query.section);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.section]);


    return (
        <PageFeatureFlag>
            <PageWrapper
                pageName="Temp Search Page"
                classNames="usa-da-search-page"
                title="Temp Search Page">
                <main id="main-content" className="main-content">
                    <div>{isVisibleText}</div>
                    <Suspense fallback={<TempLoadingComponent />}>
                        <TempComponent1 />
                    </Suspense>
                    {/* <div>{isVisible ? "IN VIEWPORT" : "NOT IN VIEWPORT"}</div> */}
                    <TempComponent2 />
                    {/* <div ref={containerRef}>Thing being observed</div> */}
                    <TempComponent3 />
                    <TempComponent4 />
                </main>
            </PageWrapper>
        </PageFeatureFlag>
    );
};

export default TempSearchPage;
