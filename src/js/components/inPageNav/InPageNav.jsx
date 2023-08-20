/**
 * InPageNav.jsx
 * Created by Andrea Blackwell 08/09/2023
 **/

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { throttle } from "lodash";
import { tabletScreen, mediumScreen } from 'dataMapping/shared/mobileBreakpoints';

const InPageNav = ({ sections }) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [elements, setElements] = useState([]);
    const [navStartIndex, setNavStartIndex] = useState(0);

    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const navBar = useRef(null);
    let tempElements = [];


    const isOverflow = () => {
        let isOverflowing = false;
        if (navBar?.current) {
            const el = navBar.current;
            isOverflowing = el.clientWidth < el.scrollWidth
                || el.clientHeight < el.scrollHeight;
        }
        return isOverflowing;
    };

    /* check if the left chevron should show */
    // const isScrolledLeft = () => {
    //     // how far to scroll left
    //     // first hidden element should scroll to
    //     // find the first hidden element and get the offset for the next element
    //     const index = elements.findIndex((x) => x.hidden);
    //     return index > 0 ? index - 1 : null;
    // };

    const isHidden = useCallback((el) => {
        const box = el.getBoundingClientRect();
        const documentWidth = navBar.current.clientWidth;
        const hidden = box.left < 0 || box.right > documentWidth;
        // replace the document width with the width of the in page nav container element
        tempElements.push({
            element: el,
            name: el.firstChild.innerHTML,
            offset: box.left,
            hidden: box.left < 0 || box.right > documentWidth
        });
        return hidden;
    });

    const getPageMargins = () => {
        const el1 = document.querySelector("#main-content");
        const el2 = document.querySelector(".about-padded-content");
        const padding = parseInt(window.getComputedStyle(el1, null)?.marginLeft, 10) + parseInt(window.getComputedStyle(el2, null)?.paddingLeft, 10);
        return padding;
    };

    const reset = () => {
        navBar.current.scrollLeft = "0";
    };

    const scrollRight = () => {
        // find the first hidden element and get the offset for the next element
        navBar.current.childNodes[0].childNodes.forEach((el) => {
            isHidden(el);
        });

        setElements(tempElements);
        const index = tempElements.slice(navStartIndex).findIndex((x) => x.hidden) + navStartIndex;
        const padding = getPageMargins();
        if (index > 0) {
            setNavStartIndex(index);
            navBar.current.scrollLeft += tempElements[index - 1].offset - padding;
        }

        tempElements = [];
    };

    const scrollLeft = () => {
        // find the first hidden element and get the offset for the next element
        navBar.current.childNodes[0].childNodes.forEach((el) => {
            isHidden(el);
        });

        setElements(tempElements);
        const padding = getPageMargins();

        const index = tempElements.findIndex((x) => -x.offset + padding < navBar.current.clientWidth);

        setNavStartIndex(index);

        if (index > 0) {
            navBar.current.scrollLeft += tempElements[index + 1].offset;
        }
        else {
            navBar.current.scrollLeft = "0";
        }

        console.log(navBar.current.scrollLeft);

        tempElements = [];
    };

    const getElementList = () => {
        navBar.current.childNodes[0].childNodes.forEach((el) => {
            isHidden(el);
        });

        setElements(tempElements);
    };

    /* check which elements are visible and which ones are not */

    const onKeyPress = (e, direction) => {
        if (e.key === "Enter") {
            if (direction === "left") {
                scrollLeft();
            }

            if (direction === "right") {
                scrollRight();
            }
        }
    };
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                // getElementList();
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isHidden, tempElements, windowWidth]);

    return (
        <>
            <nav className="in-page-nav-wrapper" ref={navBar} style={{ display: "flex", flexDirection: "row" }}>
                <div
                    style={{ marginTop: "16px" }}
                    tabIndex={isMobile ? 0 : ""}
                    role="button"
                    onKeyDown={(e) => onKeyPress(e, "left")}
                    onClick={() => scrollLeft()}>left
                </div>
                <ul style={{ margin: "16px 32px", width: "90%", overflow: "hidden" }}>
                    {sections.map((section) => (<li className="in-page-nav__element">
                        <a
                            role="button"
                            tabIndex="0"
                            onKeyDown={(e) => onKeyPress(e, "left")}
                            onClick={() => scrollLeft()}>{section.label}
                        </a>&nbsp;&nbsp;&nbsp;
                    </li>))}
                </ul>
                <div
                    style={{ marginTop: "16px" }}
                    tabIndex={isMobile ? 0 : ""}
                    role="button"
                    onKeyDown={(e) => onKeyPress(e, "right")}
                    onClick={() => scrollRight()}>right
                </div>
            </nav>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div onClick={() => reset()}>Reset</div>
        </>
    );
};

export default InPageNav;
