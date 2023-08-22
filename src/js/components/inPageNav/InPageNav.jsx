/**
 * InPageNav.jsx
 * Created by Andrea Blackwell 08/09/2023
 **/

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { throttle } from "lodash";
import { tabletScreen, mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InPageNav = ({ sections, jumpToSection }) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [elementData, setElementData] = useState([]);
    const [ulElement, setUlElement] = useState(null);
    const [navStartIndex, setNavStartIndex] = useState(0);
    const [isOverflow, setIsOverflow] = useState(false);
    const [isScrollableLeft, setIsScrollableLeft] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const navBar = useRef(null);

    const padding = 32;

    const checkIsOverflow = useCallback(() => {
        let isOverflowing = false;

        if (ulElement) {
            console.log(ulElement.scrollLeft);
            console.log(ulElement.scrollWidth);
            console.log(ulElement.clientWidth);
            if (ulElement.scrollLeft >= ulElement.scrollWidth - ulElement.clientWidth) {
                isOverflowing = false;
            }

            if (elementData && !elementData[elementData?.length - 1]?.hidden) {
                isOverflowing = false;
            }

            if (ulElement.clientWidth < ulElement.scrollWidth
                || ulElement.clientHeight < ulElement.scrollHeight) {
                isOverflowing = true;
            }

            console.log(isOverflowing);
            setIsOverflow(isOverflowing);
        }
    });


    const reset = useCallback(() => {
        if (ulElement) {
            ulElement.scrollTo({ left: "0", behavior: 'smooth' });
            setIsScrollableLeft(false);
            checkIsOverflow();
        }
    });

    const updateHiddenStatus = () => {
        const tempList = [...elementData];
        ulElement.childNodes.forEach((el, index) => {
            const box = el.getBoundingClientRect();
            const documentWidth = ulElement.clientWidth;
            tempList[index].hidden = box.left < 0 || box.right > documentWidth;
        });

        return tempList;
    };

    const scrollLeft = () => {
        const tempList = updateHiddenStatus();
        // eslint-disable-next-line no-mixed-operators
        const index = tempList.findIndex((x) => x.offset > ulElement.scrollLeft - ulElement.clientWidth + (padding * 2));
        setElementData(tempList);
        setNavStartIndex(index);

        if (index > 0) {
            console.log("scroll left index", index);
            setNavStartIndex(index + 1);
            ulElement.scrollTo({ left: tempList[index + 1].offset - padding, behavior: 'smooth' });
            setIsScrollableLeft(true);
        }
        else {
            reset();
        }
    };

    const scrollRight = () => {
        const tempList = updateHiddenStatus();
        console.log("starting index", navStartIndex);
        const index = tempList.slice(navStartIndex).findIndex((x) => x.hidden) + navStartIndex;
        setElementData(tempList);

        if (index - 1 > 0) {
            console.log("scroll right index", index);
            setNavStartIndex(index - 1);
            ulElement.scrollTo({ left: tempList[index - 1].offset - padding, behavior: 'smooth' });
            setIsScrollableLeft(true);
            checkIsOverflow();
        } else {
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
                offset: box.left,
                hidden: box.left < 0 || box.right > documentWidth
            });
        });

        setElementData(els);
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
    }, [ulElement]);

    return (
        <>
            <nav className="in-page-nav-wrapper" ref={navBar} style={{ display: "flex", flexDirection: "row" }}>
                {isScrollableLeft &&
                    <div
                        style={{ marginTop: "16px" }}
                        tabIndex={isMobile ? 0 : ""}
                        role="button"
                        onKeyDown={(e) => onKeyPress(e, "left")}
                        onClick={() => scrollLeft()}>
                        <FontAwesomeIcon icon="chevron-left" alt="Back" />
                    </div>}

                <ul style={{ margin: "16px 32px", width: "90%", overflow: "hidden" }}>
                    {sections.map((section) => (
                        <li className="in-page-nav__element">
                            <a
                                role="button"
                                tabIndex="0"
                                onKeyDown={(e) => (e.key === "Enter" ? jumpToSection(section.section) : "")}
                                onClick={() => jumpToSection(section.section)}>{section.label}
                            </a>&nbsp;&nbsp;&nbsp;
                        </li>))}
                </ul>

                {isOverflow &&
                    <div
                        style={{ marginTop: "16px" }}
                        tabIndex={isMobile ? 0 : ""}
                        role="button"
                        onKeyDown={(e) => onKeyPress(e, "right")}
                        onClick={() => scrollRight()}>
                        <FontAwesomeIcon icon="chevron-right" alt="Forward" />
                    </div>
                }
            </nav>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div onClick={() => reset()}>Reset</div>
        </>
    );
};

export default InPageNav;
