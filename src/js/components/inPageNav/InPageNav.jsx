/**
 * InPageNav.jsx
 * Created by Andrea Blackwell 08/09/2023
 **/

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { throttle } from "lodash";
import { tabletScreen, mediumScreen } from 'dataMapping/shared/mobileBreakpoints';

const InPageNav = ({ sections, jumpToSection }) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [elements, setElements] = useState([]);
    const [navStartIndex, setNavStartIndex] = useState(0);
    const [isOverflow, setIsOverflow] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const navBar = useRef(null);


    const checkIsOverflow = useCallback(() => {
        let isOverflowing = false;
        if (navBar?.current?.querySelector("ul")) {
            const el = navBar?.current?.querySelector("ul");
            if (el.clientWidth < el.scrollWidth
                || el.clientHeight < el.scrollHeight) {
                if (!elements) {
                    isOverflowing = true;
                }

                if (elements && elements[elements?.length - 1]?.hidden) {
                    isOverflowing = true;
                }
            }
        }

        setIsOverflow(isOverflowing);
    });


    const reset = () => {
        navBar.current.querySelector("ul").scrollTo({ left: "0", behavior: 'smooth' });
    };

    const updateHiddenStatus = () => {
        const list = [...elements];
        navBar.current.querySelector("ul").childNodes.forEach((el, index) => {
            const box = el.getBoundingClientRect();
            const documentWidth = navBar.current.clientWidth;
            list[index].hidden = box.left < 0 || box.right > documentWidth;
        });

        return list;
    };
    const scrollLeft = () => {
        const tempList = updateHiddenStatus();
        const index = tempList.findIndex((x) => x.offset < navBar.current.querySelector("ul").scrollLeft - navBar.current.clientWidth);
        setElements(tempList);

        setNavStartIndex(index);

        if (index > 0) {
            navBar.current.querySelector("ul").scrollTo({ left: tempList[index + 1].offset, behavior: 'smooth' });
        }
        else {
            reset();
        }

        console.log(navBar.current.querySelector("ul").scrollLeft);
    };

    const scrollRight = () => {
        const tempList = updateHiddenStatus();
        const index = tempList.slice(navStartIndex).findIndex((x) => x.hidden) + navStartIndex;
        setElements(tempList);

        if (index > 0) {
            setNavStartIndex(index);
            // navBar.current.querySelector("ul").scrollLeft += tempElements[index - 1].offset;
            navBar.current.querySelector("ul").scrollTo({ left: navBar.current.querySelector("ul").scrollLeft + tempList[index - 1].offset, behavior: 'smooth' });
        }
    };

    const getElementList = () => {
        const els = [];

        navBar.current.querySelector("ul").childNodes.forEach((el) => {
            const box = el.getBoundingClientRect();
            const documentWidth = navBar.current.clientWidth;
            // replace the document width with the width of the in page nav container element
            els.push({
                element: el,
                name: el.firstChild.innerHTML,
                offset: box.left,
                hidden: box.left < 0 || box.right > documentWidth
            });
        });

        setElements(els);
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
        checkIsOverflow();
    }, [checkIsOverflow, elements]);

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                // getElementList();
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
                getElementList();
                checkIsOverflow();
            }
        }, 50);

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [checkIsOverflow, getElementList, windowWidth]);

    return (
        <>
            <nav className="in-page-nav-wrapper" ref={navBar} style={{ display: "flex", flexDirection: "row" }}>
                {navBar?.current?.querySelector("ul")?.scrollLeft > 0 &&
                    <div
                        style={{ marginTop: "16px" }}
                        tabIndex={isMobile ? 0 : ""}
                        role="button"
                        onKeyDown={(e) => onKeyPress(e, "left")}
                        onClick={() => scrollLeft()}>left
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
                        onClick={() => scrollRight()}>right
                    </div>
                }
            </nav>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div onClick={() => reset()}>Reset</div>
        </>
    );
};

export default InPageNav;
