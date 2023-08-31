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
    const [padding, setPadding] = useState(32);

    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const navBar = useRef(null);

    // make this dynamic once the styling is added for the feature

    const checkIsOverflow = () => {
        console.log(elementData);
        setTimeout(() => {
            let isOverflowing = false;

            if (ulElement) {
                if (ulElement.clientWidth < ulElement.scrollWidth
                    || ulElement.clientHeight < ulElement.scrollHeight) {
                    isOverflowing = true;
                }

                if (scrollLeftPosition?.length > 0 && scrollLeftPosition[scrollLeftPosition?.length - 1]?.offset + (padding * 2) >= ulElement.clientWidth) {
                    isOverflowing = false;
                }

                setIsOverflow(isOverflowing);
            }
        }, 100);
    };


    /* Check which elements are visible vs hidden */
    // eslint-disable-next-line consistent-return
    const updateHiddenStatus = () => {
        const tempList = [...elementData];
        console.log(scrollLeftPosition);
        ulElement.childNodes.forEach((el, index) => {
            const box = el.getBoundingClientRect();
            const documentWidth = ulElement.clientWidth;
            //this condition is not working
            tempList[index].hidden = box.left < 0 || box.right > documentWidth;
            tempList[index].leftOffset = box.left;
            tempList[index].rightOffset = box.right;
        });
        console.log(tempList);
        return tempList;
    };

    const reset = () => {
        if (ulElement) {
            ulElement.scrollTo({ left: "0", behavior: 'smooth' });
            ulElement.scrollLeft = "0";
            setElementData(updateHiddenStatus());
            setScrollLeftPosition([]);
            setNavStartIndex(0);
        }
    };

    useEffect(() => {
        checkIsOverflow();
    }, [elementData]);

    const scrollLeft = () => {
        // check for last visible item
        setTimeout(() => {

            const tempList = updateHiddenStatus();
            const lastVisibleIndex = tempList.findIndex((el) => el.leftOffset > 0);
            const newLeftPosition = ulElement.scrollLeft - (ulElement.clientWidth + tempList[lastVisibleIndex].width);

            if (lastVisibleIndex > 0) {
                setNavStartIndex(lastVisibleIndex);
                ulElement.scrollTo({ left: newLeftPosition, behavior: 'smooth' });
                scrollLeftPosition.pop();
                setElementData(updateHiddenStatus());
            } else {
                reset();
            }
        }, 100);
    };

    const scrollRight = () => {
        setTimeout(() => {

            const tempList = updateHiddenStatus();
            const index = tempList.slice(navStartIndex).findIndex((x) => x.hidden) + navStartIndex;

            if (index - 1 > 0) {
                setNavStartIndex(index - 1);
                const leftPosition = tempList[index - 1].originalLeftOffset - padding;
                ulElement.scrollTo({left: leftPosition, behavior: 'smooth'});
                scrollLeftPosition.push({offset: leftPosition, index});
                setElementData(updateHiddenStatus());
            } else {
                reset();
            }
        }, 100);
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
                rightOffset: box.right,
                width: box.width

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
            setElementData(updateHiddenStatus());
            setIsMobile(newWidth < mediumScreen);
        }
    }, 50);

    useEffect(() => {
        const el = navBar.current.querySelector("ul");
        setUlElement(el);
        setPadding(((window.innerWidth - el.clientWidth) + 20) / 2);
    }, []);

    useEffect(() => {
        if (ulElement && padding) {
            getElementList();
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ulElement, padding]);

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
                <div>[Debugging] UL Width: {ulElement?.clientWidth}
                    <br />ScrollLeft (based on scrollLeftPosition object): {scrollLeftPosition?.length > 0 ? scrollLeftPosition[scrollLeftPosition?.length - 1]?.offset : "0"}
                    <br />ScrollLeft (based on scrollLeft): {ulElement?.scrollLeft}
                    <br />Padding: {padding}
                    <br />Hidden {elementData?.map((item, index) => `${index} ${item.hidden}-${item.rightOffset} ||`)}
                </div>
            </div>
        </>
    );
};

export default InPageNav;
