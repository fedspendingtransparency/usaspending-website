/**
 * InPageNav.jsx
 * Created by Andrea Blackwell 08/09/2023
 **/

import React, { useEffect, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { throttle } from "lodash";
import { mediumScreen, largeScreen } from 'dataMapping/shared/mobileBreakpoints';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    sections: PropTypes.array,
    activeSection: PropTypes.string,
    jumpToSection: PropTypes.func
};

const InPageNav = ({ sections, activeSection, jumpToSection }) => {
    const [windowWidth, setWindowWidth] = useState(0);
    const [ulElement, setUlElement] = useState(null);
    const [elementData, setElementData] = useState([]);
    const [isOverflowLeft, setIsOverflowLeft] = useState(false);
    const [isOverflowRight, setIsOverflowRight] = useState(false);
    const [padding, setPadding] = useState(32);
    const [isMobile, setIsMobile] = useState(0);
    const navBar = useRef(null);

    // detect if the element is overflowing on the left or the right
    const checkIsOverflowHidden = () => {
        let left = false;
        let right = false;
        const ulEl = navBar?.current?.querySelector("ul");
        const elArray = [...ulEl?.childNodes];
        const firstElPosition = elArray[0]?.getBoundingClientRect();
        const lastElPosition = elArray[elArray.length - 1]?.getBoundingClientRect();

        if (firstElPosition.left < 0 || ulEl.scrollLeft > 0) {
            left = true;
        }

        if (lastElPosition.right > ulEl.clientWidth + padding || lastElPosition.right > ulEl.scrollWidth) {
            right = true;
        }

        setIsOverflowLeft(left);
        setIsOverflowRight(right);
    };

    const handleScroll = (e) => {
        e.stopPropagation();
        checkIsOverflowHidden();
    };

    const reset = () => {
        const ulEl = navBar.current.querySelector("ul");
        ulEl.scrollTo({ left: "0", behavior: 'smooth' });
    };

    const scrollLeft = useCallback((e) => {
        e.stopPropagation();

        const ulEl = navBar.current.querySelector("ul");
        const elArray = [...ulEl.childNodes];
        const lastVisibleEl = {
            name: "",
            index: 0
        };

        // eslint-disable-next-line array-callback-return,consistent-return
        elArray.find((el, i) => {
            const box = el.getBoundingClientRect();
            if (box.left > 0 && box.right < ulEl.clientWidth) {
                lastVisibleEl.name = el.querySelector('a').innerHTML;
                lastVisibleEl.index = i;
                return i;
            }
        });

        const lastVisibleIndex = lastVisibleEl.index;
        // check for last visible item
        if (lastVisibleIndex + 2 < elementData.length) {
            const newLeftPosition = (ulEl.scrollLeft - ulEl.clientWidth) + 20 + elementData[lastVisibleIndex + 1].width + elementData[lastVisibleIndex + 2].width;
            ulEl.scrollTo({ left: newLeftPosition, behavior: 'smooth' });
        }
        else {
            reset();
        }
    });

    const scrollRight = useCallback((e) => {
        e.stopPropagation();

        if (elementData) {
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
                if (box.right > documentWidth && box.left > padding / 2) {
                    firstRtHiddenEl.name = el.querySelector('a').innerHTML;
                    firstRtHiddenEl.index = i;
                    return i;
                }
            });


            const index = firstRtHiddenEl.index;

            if (index - 2 >= 0) {
                const leftPosition = elementData[index - 2]?.originalLeftOffset + (padding / 2);
                ulEl.scrollTo({ left: leftPosition, behavior: 'smooth' });
            }
            else {
                reset();
            }
        }
    });

    const getInitialElements = useCallback(() => {
        const tempElementData = [];
        const ulEl = navBar.current.querySelector("ul");
        ulEl.childNodes.forEach((el) => {
            const box = el.getBoundingClientRect();
            tempElementData.push({
                name: el.innerHTML,
                originalLeftOffset: box.left,
                width: box.width
            });
        });

        setUlElement(ulEl);
        setElementData(tempElementData);
        checkIsOverflowHidden();
    });

    const onKeyPress = useCallback((e, direction) => {
        if (e.key === "Enter") {
            if (direction === "left") {
                scrollLeft(e);
            }

            if (direction === "right") {
                scrollRight(e);
            }
        }
    });

    const handleResize = throttle(() => {
        const newWidth = window.innerWidth;
        if (windowWidth !== newWidth) {
            setWindowWidth(newWidth);
        }
    }, 50);

    useEffect(() => {
        handleResize();
        getInitialElements();
        window.addEventListener('resize', () => handleResize());
        return () => window.removeEventListener('resize', () => handleResize());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (windowWidth) {
            setIsMobile(windowWidth < mediumScreen);

            if (windowWidth > mediumScreen) {
                setPadding(20 + 24);
            }
            else if (windowWidth > largeScreen) {
                setPadding(40 + 24);
            }

            checkIsOverflowHidden();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth]);

    useEffect(() => {
        checkIsOverflowHidden();
        ulElement?.addEventListener('scrollend', (e) => handleScroll(e));
        return () => ulElement?.removeEventListener('scrollend', (e) => handleScroll(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ulElement]);

    return (
        <div className="in-page-nav__container">
            <nav ref={navBar} className={`in-page-nav__wrapper ${isOverflowLeft ? 'left-fade-effect' : ''} ${isOverflowRight ? 'right-fade-effect' : ''} `}>
                {isOverflowLeft && !isMobile &&
                    <div
                        className="in-page-nav__paginator left"
                        tabIndex="0"
                        role="button"
                        onKeyDown={(e) => onKeyPress(e, "left")}
                        onClick={(e) => scrollLeft(e)}>
                        <FontAwesomeIcon icon="chevron-left" alt="Back" />
                    </div>
                }

                <ul>
                    {sections.map((section) => (
                        <li className={`in-page-nav__element ${section.section === activeSection ? 'active' : ''}`} key={`in-page-nav-li-${section.label}`}>
                            <a
                                role="button"
                                tabIndex="0"
                                key={`in-page-nav-link-${section.label}`}
                                onKeyDown={(e) => (e.key === "Enter" ? jumpToSection(section.section) : "")}
                                onClick={() => jumpToSection(section.section)}>
                                {section.label}
                            </a>
                        </li>))}
                </ul>

                {isOverflowRight && !isMobile &&
                    <div
                        className="in-page-nav__paginator right"
                        tabIndex="0"
                        role="button"
                        onKeyDown={(e) => onKeyPress(e, "right")}
                        onClick={(e) => scrollRight(e)}>
                        <FontAwesomeIcon icon="chevron-right" alt="Forward" />
                    </div>}
            </nav>
        </div>
    );
};

InPageNav.propTypes = propTypes;
export default InPageNav;
