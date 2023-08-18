/**
 * InPageNav.jsx
 * Created by Andrea Blackwell 08/09/2023
 **/

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { throttle } from "lodash";
import { tabletScreen, mediumScreen } from 'dataMapping/shared/mobileBreakpoints';


const aboutSections = [
    {
        section: 'mission',
        label: 'Mission'
    },
    {
        section: 'background',
        label: 'Background'
    },
    {
        section: 'development',
        label: 'Development and Releases'
    },
    {
        section: 'licensing',
        label: 'Licensing'
    },
    {
        section: 'more-info',
        label: 'More Information'
    },
    {
        section: 'contact',
        label: 'Contact'
    },
    {
        section: 'mission2',
        label: 'Mission2'
    },
    {
        section: 'background2',
        label: 'Background2'
    },
    {
        section: 'development2',
        label: 'Development and Releases2'
    },
    {
        section: 'licensing2',
        label: 'Licensing2'
    },
    {
        section: 'more-info2',
        label: 'More Information2'
    },
    {
        section: 'contact2',
        label: 'Contact2'
    },
    {
        section: 'mission3',
        label: 'Mission3'
    },
    {
        section: 'background3',
        label: 'Background3'
    },
    {
        section: 'development3',
        label: 'Development and Releases3'
    },
    {
        section: 'licensing3',
        label: 'Licensing3'
    },
    {
        section: 'more-info3',
        label: 'More Information3'
    },
    {
        section: 'contact3',
        label: 'Contact3'
    }
];

const InPageNav = () => {
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

        if (navStartIndex > 0) {
            navBar.current.scrollLeft -= navBar.current.clientWidth - padding;
        }
        else {
            navBar.current.scrollLeft = "0";
        }

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
            {isOverflow() && <div>
                <span
                    tabIndex={isMobile ? 0 : ""}
                    role="button"
                    onKeyDown={(e) => onKeyPress(e, "left")}
                    onClick={() => scrollLeft()}>left
                </span> |
                <span
                    tabIndex={isMobile ? 0 : ""}
                    role="button"
                    onKeyDown={(e) => onKeyPress(e, "right")}
                    onClick={() => scrollRight()}>right
                </span> |
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
                <span onClick={() => reset()}>reset</span>
            </div>}
            <nav className="in-page-nav-wrapper" ref={navBar}>
                <ul>
                    {aboutSections.map((section) => (<li className="in-page-nav__element">
                        <a
                            onKeyDown={(e) => onKeyPress(e, "left")}
                            onClick={() => scrollLeft()}>{section.label}
                        </a>
                        |
                    </li>))}
                </ul>
            </nav>
        </>
    );
};

export default InPageNav;
