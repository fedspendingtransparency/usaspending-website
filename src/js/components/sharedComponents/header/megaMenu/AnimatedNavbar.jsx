import React, { useEffect, useState } from "react";
import { Flipper } from "react-flip-toolkit";

import {
    spendingOptions,
    profileOptions,
    learnResourceOptions,
    referenceMaterialsOptions,
    developerOptions,
    awardDownloadOptions,
    accountDataOptions,
    allDownloadOptions,
    section1Options,
    section2Options,
    section3Options
} from 'dataMapping/navigation/menuOptions';
import Navbar from "./Navbar";
import DropdownContainer from "./DropdownContainer";
import NavbarItem from './NavbarItem';
import ItemContent from './ItemContent';
import FadeContents from "./FadeContents";

const navbarConfig = [
    {
        title: "Search Award Data",
        url: '/search'
    },
    {
        title: "Explore the Data",
        section1Items: spendingOptions,
        section2Items: profileOptions,
        section1Options,
        section2Options,
        section3Options
    },
    {
        title: "Download the Data",
        section1Items: awardDownloadOptions,
        section2Items: accountDataOptions,
        section3Items: allDownloadOptions,
        section1Options,
        section2Options,
        section3Options
    },
    {
        title: "Find Resources",
        section1Items: learnResourceOptions,
        section2Items: referenceMaterialsOptions,
        section3Items: developerOptions,
        section1Options,
        section2Options,
        section3Options
    }
];

const AnimatedNavbar = () => {
    const [activeIndices, setActiveIndices] = useState([]);
    const [animatingOut, setAnimatingOut] = useState(false);
    const [direction, setDirection] = useState(null);

    let animatingOutTimeout = null;

    const resetDropdownState = (i) => {
        setActiveIndices(typeof i === "number" ? [i] : []);
        setAnimatingOut(false);
        setDirection(null);

        animatingOutTimeout = null;
    };

    const onMouseEnter = (i) => {
        if (animatingOutTimeout) {
            clearTimeout(animatingOutTimeout);
            resetDropdownState(i);
            return;
        }

        if (activeIndices[activeIndices?.length - 1] === i) {
            return;
        }

        setActiveIndices((prevState) => [...prevState, i]);

        setAnimatingOut(false);
    };
    const onMouseLeave = () => {
        setAnimatingOut(true);
        setDirection(null);

        animatingOutTimeout = setTimeout(
            resetDropdownState(), 300
        );
    };

    let currentSections;

    const currentIndex = activeIndices[activeIndices.length - 1];
    const prevIndex =
        activeIndices.length > 1 &&
        activeIndices[activeIndices.length - 2];

    if (typeof currentIndex === "number") {
        currentSections = navbarConfig[currentIndex];
    }

    setTimeout(() => {
        if (typeof prevIndex === "number") {
            if (currentIndex && prevIndex) {
                if (currentIndex <= prevIndex) {
                    if (direction === "left") {
                        return;
                    }
                    setDirection("left");
                } else {
                    if (direction === "right") {
                        return;
                    }
                    setDirection("right");
                }
            }
        }
    }, 10);

    return (
        <Flipper flipKey={currentIndex}>
            <Navbar onMouseLeave={onMouseLeave}>
                {navbarConfig.map((n, index) => (
                    <NavbarItem
                        key={`navbaritem-${index}`}
                        title={n.title}
                        index={index}
                        url={n.url}
                        closeDropdown={onMouseLeave}
                        onMouseEnter={onMouseEnter}>
                        {currentIndex === index && (
                            <DropdownContainer
                                direction={direction}
                                animatingOut={animatingOut}>
                                <FadeContents
                                    direction={direction}
                                    menuIndex={index}>
                                    <ItemContent
                                        navbarConfig={currentSections}
                                        menuIndex={index}
                                        closeDropdown={onMouseLeave} />
                                </FadeContents>
                            </DropdownContainer>
                        )}
                    </NavbarItem>
                ))}
            </Navbar>
        </Flipper>
    );
};

export default AnimatedNavbar;
