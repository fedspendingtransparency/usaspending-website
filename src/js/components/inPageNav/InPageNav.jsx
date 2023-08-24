/**
 * InPageNav.jsx
 * Created by Andrea Blackwell 08/09/2023
 **/

import React, { useEffect, useState, useRef } from 'react';
import { throttle } from "lodash";
import { tabletScreen, mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InPageNav = ({ sections, jumpToSection }) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [elementData, setElementData] = useState([]);
    const [ulElement, setUlElement] = useState(null);
    const [navStartIndex, setNavStartIndex] = useState(0);
    const [isOverflow, setIsOverflow] = useState(false);
    const [scrollLeftPosition, setScrollLeftPosition] = useState([]);

    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const navBar = useRef(null);

    // make this dynamic once the styling is added for the feature
    const padding = 32;

    const checkIsOverflow = () => {
        setTimeout(() => {
            let isOverflowing = false;

            if (ulElement.clientWidth < ulElement.scrollWidth
                || ulElement.clientHeight < ulElement.scrollHeight) {
                isOverflowing = true;
            }

            if (scrollLeftPosition?.length > 0 && scrollLeftPosition[scrollLeftPosition?.length - 1]?.offset >= ulElement.clientWidth) {
                isOverflowing = false;
            }

            setIsOverflow(isOverflowing);
        }, 100);
    };

    const reset = () => {
        if (ulElement) {
            ulElement.scrollTo({ left: "0", behavior: 'smooth' });
            ulElement.scrollLeft = "0";
            checkIsOverflow();
            setScrollLeftPosition([]);
        }
    };

    /* Check which elements are visible vs hidden */
    const updateHiddenStatus = () => {
        const tempList = [...elementData];
        ulElement.childNodes.forEach((el, index) => {
            const box = el.getBoundingClientRect();
            const documentWidth = ulElement.clientWidth;
            tempList[index].hidden = box.left < 0 || box.right > documentWidth;
            tempList[index].leftOffset = box.left;
            tempList[index].rightOffset = box.right;
        });
        return tempList;
    };

    const scrollLeft = () => {
        const tempList = updateHiddenStatus();
        setElementData(tempList);

        if (scrollLeftPosition.length > 1) {
            setNavStartIndex(scrollLeftPosition[scrollLeftPosition.length - 2].index);
            ulElement.scrollTo({ left: scrollLeftPosition[scrollLeftPosition.length - 2].offset, behavior: 'smooth' });
            scrollLeftPosition.pop();
            checkIsOverflow();
        }
        else {
            reset();
        }
    };

    const scrollRight = () => {
        const tempList = updateHiddenStatus();
        const index = tempList.slice(navStartIndex).findIndex((x) => x.hidden) + navStartIndex;
        setElementData(tempList);

        if (index - 1 > 0) {
            setNavStartIndex(index - 1);
            const leftPosition = tempList[index - 1].originalLeftOffset - padding;
            ulElement.scrollTo({ left: leftPosition, behavior: 'smooth' });
            scrollLeftPosition.push({ offset: leftPosition, index });
            checkIsOverflow();
        }
        else {
            reset();
        }
    };

    const getElementList = () => {
        const els = [];

        ulElement.childNodes.forEach((el) => {
            const box = el.getBoundingClientRect();
            const documentWidth = ulElement.clientWidth;
            els.push({
                element: el,
                name: el.firstChild.innerHTML,
                originalLeftOffset: box.left,
                hidden: box.left < 0 || box.right > documentWidth,
                leftOffset: box.left,
                rightOffset: box.right
            });
        });

        setElementData(els);
    };

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

    const handleResize = throttle(() => {
        const newWidth = window.innerWidth;
        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
            setIsMobile(newWidth < mediumScreen);
            reset();
        }
    }, 50);

    useEffect(() => {
        setUlElement(navBar.current.querySelector("ul"));
    }, []);

    useEffect(() => {
        if (ulElement) {
            checkIsOverflow();
            getElementList();
            handleResize();
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ulElement]);

    return (
        <>
            <nav className="in-page-nav__wrapper" ref={navBar}>
                {scrollLeftPosition?.length > 0 &&
                    <div
                        className="in-page-nav__paginator"
                        tabIndex={isMobile ? 0 : ""}
                        role="button"
                        onKeyDown={(e) => onKeyPress(e, "left")}
                        onClick={() => scrollLeft()}>
                        <FontAwesomeIcon icon="chevron-left" alt="Back" />
                    </div>}

                <ul>
                    {sections.map((section) => (
                        <li className="in-page-nav__element" key={`in-page-nav-li-${section.label}`}>
                            <a
                                role="button"
                                tabIndex="0"
                                key={`in-page-nav-link-${section.label}`}
                                onKeyDown={(e) => (e.key === "Enter" ? jumpToSection(section.section) : "")}
                                onClick={() => jumpToSection(section.section)}>{section.label}
                            </a>&nbsp;&nbsp;&nbsp;
                        </li>))}
                </ul>

                {isOverflow &&
                    <div
                        className="in-page-nav__paginator"
                        tabIndex={isMobile ? 0 : ""}
                        role="button"
                        onKeyDown={(e) => onKeyPress(e, "right")}
                        onClick={() => scrollRight()}>
                        <FontAwesomeIcon icon="chevron-right" alt="Forward" />
                    </div>
                }
            </nav>
            <div style={{ marginLeft: "32px" }} >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div onClick={() => reset()}>Reset (for development purposes)</div>
                <div>[Debugging] UL Width: {ulElement?.clientWidth} ScrollLeft: {scrollLeftPosition?.length > 0 ? scrollLeftPosition[scrollLeftPosition?.length - 1]?.offset : "0"} </div>
            </div>
        </>
    );
};

export default InPageNav;
