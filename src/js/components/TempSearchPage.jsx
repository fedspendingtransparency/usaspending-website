import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
// import { useHistory } from "react-router-dom";
import PageWrapper from "./sharedComponents/PageWrapper";
import PageFeatureFlag from "./sharedComponents/PageFeatureFlag";
import TempComponent1 from "./TempComponent1";
import TempComponent2 from "./TempComponent2";
import TempComponent4 from "./TempComponent4";
import TempLoadingComponent from "./TempLoadingComponent";
// import TempComponent3 from "./TempComponent3";
const TempComponent3 = lazy(() => import('./TempComponent3'));

require("pages/search/searchPage.scss");

const TempSearchPage = () => {
    // const { ref, inView } = useInView({
    //     threshold: 0.1
    // });
    // const containerRef = useRef(null);
    // const history = useHistory();
    // const [isVisible, setIsVisible] = useState(false);
    // const [inViewport, setInViewport] = useState(false);

    // const sections = [
    //     {
    //         section: 'one',
    //         label: 'ONE'
    //     },
    //     {
    //         section: 'two',
    //         label: 'TWO'
    //     },
    //     {
    //         section: 'three',
    //         label: 'THREE'
    //     },
    //     {
    //         section: 'four',
    //         label: 'FOUR'
    //     }
    // ];

    const options = {
        threshold: 0.1
    };

    // const callback = (entries) => {
    //     entries.forEach((entry) => {
    //         // console.log('entry', entry);
    //         setIsVisible(entry.isIntersecting);
    //         // setIsVisibleText(entry.target.id);
    //         if (entry.isIntersecting) {
    //             // add section to url
    //             // history.replace(`${history.location.pathname}?section=${entry.target.id}`);
    //             // set state var
    //             setInViewport(true);
    //         }
    //     });
    // };

    // useEffect(() => {
    //     // eslint-disable-next-line no-undef
    //     const observer = new IntersectionObserver(callback, options);
    //
    //     // this is causing the callback fn to fire constantly
    //     // sections.forEach((section) => {
    //     //     const target = document.getElementById(`temp-component-${section.section}`);
    //     //     if (target) {
    //     //         observer.observe(target);
    //     //     }
    //     // });
    //     //
    //     // return () => observer.disconnect();
    //
    //     if (containerRef.current) observer.observe(containerRef.current);
    //
    //     return () => {
    //         if (containerRef.current) observer.unobserve(containerRef.current);
    //     };
    // }, [callback, containerRef, options, sections]);

    return (
        <PageFeatureFlag>
            <PageWrapper
                pageName="Temp Search Page"
                classNames="usa-da-search-page"
                title="Temp Search Page">
                <main id="main-content" className="main-content">
                    {/* <Suspense fallback={<TempLoadingComponent />}> */}
                    {/* <TempComponent1 /> */}
                    {/* </Suspense> */}
                    {/* <div>{isVisible ? "IN VIEWPORT" : "NOT IN VIEWPORT"}</div> */}
                    <TempComponent2 />
                    {/* <Suspense fallback={<TempLoadingComponent />}> */}
                    {/* <div ref={ref}> */}
                    {/*     {inView && <TempComponent3 />} */}
                    {/* </div> */}
                    {/* <TempComponent3 /> */}
                    {/* </Suspense> */}
                    <TempComponent4 />
                </main>
            </PageWrapper>
        </PageFeatureFlag>
    );
};

export default TempSearchPage;
