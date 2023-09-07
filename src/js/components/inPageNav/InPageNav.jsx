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
    // const [elementData, setElementData] = useState([]);
    const [ulElement, setUlElement] = useState(null);
    const [elementData, setElementData] = useState([]);
    const [isOverflowLeft, setIsOverflowLeft] = useState(false);
    const [isOverflowRight, setIsOverflowRight] = useState(false);
    const [padding, setPadding] = useState(32);

    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const navBar = useRef(null);

    // detect if the element is overflowing on the left or the right
    const checkIsOverflowHidden = () => {
        let left = false;
        let right = false;
        const ulEl = navBar.current.querySelector("ul");
        const elArray = [...ulEl.childNodes];
        const firstElPosition = elArray[0].getBoundingClientRect();
        const lastElPosition = elArray[elArray.length - 1].getBoundingClientRect();

        if (firstElPosition.left < 0 || ulEl.scrollLeft > 0) {
            left = true;
        }

        if (lastElPosition.right > ulEl.scrollWidth) {
            right = true;
        }

        if (isMobile) {
            left = false;
            right = false;
        }

        setIsOverflowLeft(left);
        setIsOverflowRight(right);
    };

    const reset = () => {
        const ulEl = navBar.current.querySelector("ul");
        ulEl.scrollTo({ left: "0", behavior: 'smooth' });
    };

    const scrollLeft = () => {
        const ulEl = navBar.current.querySelector("ul");
        const elArray = [...ulEl.childNodes];
        const lastVisibleEl = {
            name: "",
            index: 0
        };

        // eslint-disable-next-line array-callback-return,consistent-return
        elArray.find((el, i) => {
            const box = el.getBoundingClientRect();
            if (box.left > 0) {
                lastVisibleEl.name = el.querySelector('a').innerHTML;
                lastVisibleEl.index = i;
                return i;
            }
        });

        const lastVisibleIndex = lastVisibleEl.index;

        // check for last visible item

        if (lastVisibleIndex + 2 < elementData.length) {
            const newLeftPosition = (ulEl.scrollLeft - ulEl.clientWidth) + elementData[lastVisibleIndex + 2].width;
            ulEl.scrollTo({ left: newLeftPosition, behavior: 'smooth' });
            checkIsOverflowHidden();
        }
        else {
            reset();
        }
    };

    const scrollRight = () => {
        const ulEl = navBar.current.querySelector("ul");
        const elArray = [...ulEl.childNodes];
        const firstRtHiddenEl = {
            name: "",
            index: 0
        };

        // eslint-disable-next-line array-callback-return,consistent-return
        elArray.find((el, i) => {
            const box = el.getBoundingClientRect();
            const documentWidth = ulEl.clientWidth;
            // Check if element is hidden
            if (box.right > documentWidth && box.left > 0) {
                firstRtHiddenEl.name = el.querySelector('a').innerHTML;
                firstRtHiddenEl.index = i;
                return i;
            }
        });

        const index = firstRtHiddenEl.index;

        if (index - 2 >= 0) {
            const leftPosition = elementData[index - 2].originalLeftOffset + (padding / 2);
            ulEl.scrollTo({ left: leftPosition, behavior: 'smooth' });
            checkIsOverflowHidden();
        }
        else {
            reset();
        }
    };

    const getInitialElements = useCallback(() => {
        const tempElementData = [];
        const ulEl = navBar.current.querySelector("ul");
        ulEl.childNodes.forEach((el) => {
            const box = el.getBoundingClientRect();
            tempElementData.push({
                name: el.innerHTML,
                originalLeftOffset: box.left,
                // hidden: box.left < 0 || box.right > documentWidth,
                // leftOffset: box.left,
                // rightOffset: box.right,
                width: box.width

            });
        });

        setPadding(((window.innerWidth - ulEl.clientWidth) + 20) / 2);
        checkIsOverflowHidden();
        setUlElement(ulEl);
        setElementData(tempElementData);
    });

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
            checkIsOverflowHidden();
            getInitialElements();
        }
    }, 50);

    useEffect(() => {
        getInitialElements();

        window.addEventListener('resize', () => handleResize());
        return () => window.removeEventListener('resize', () => handleResize());
    }, []);

    return (
        <>
            <nav className="in-page-nav__wrapper" ref={navBar}>
                {isOverflowLeft &&
                    <div
                        className="in-page-nav__paginator"
                        tabIndex="0"
                        role="button"
                        onKeyDown={(e) => onKeyPress(e, "left")}
                        onClick={() => scrollLeft()}>
                        <FontAwesomeIcon icon="chevron-left" alt="Back" />
                    </div>
                }

                <ul>
                    {sections.map((section) => (
                        <li className="in-page-nav__element" key={`in-page-nav-li-${section.label}`}>
                            <a
                                role="button"
                                tabIndex="0"
                                key={`in-page-nav-link-${section.label}`}
                                onKeyDown={(e) => (e.key === "Enter" ? jumpToSection(section.section) : "")}
                                onClick={() => jumpToSection(section.label)}>{section.label}
                            </a>&nbsp;&nbsp;&nbsp;
                        </li>))}
                </ul>

                {isOverflowRight &&
                    <div
                        className="in-page-nav__paginator"
                        tabIndex="0"
                        role="button"
                        onKeyDown={(e) => onKeyPress(e, "right")}
                        onClick={() => scrollRight()}>
                        <FontAwesomeIcon icon="chevron-right" alt="Forward" />
                    </div>}
            </nav>
            <div style={{ marginLeft: "32px" }} >
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <div onClick={() => reset()}>Reset (for development purposes)</div>
                <div>[Debugging] UL Width: {ulElement?.clientWidth}
                    {/* <br />ScrollLeft (based on scrollLeftPosition object): {scrollLeftPosition?.length > 0 ? scrollLeftPosition[scrollLeftPosition?.length - 1]?.offset : "0"}*/}
                    <br />ScrollLeft (based on scrollLeft): {ulElement?.scrollLeft}
                    <br />Left Most Element (based on elementData object): {elementData?.length > 0 ? elementData[0]?.leftOffset : "0"}
                    <br />Right Most Element - right side (based on elementData object): {elementData?.length > 0 ? elementData[elementData?.length - 1]?.rightOffset : "0"}
                    <br />Padding: {padding}
                    <br />UIElement Scrollwidth: {ulElement?.scrollWidth}
                </div>
            </div>
        </>
    );
};

export default InPageNav;
