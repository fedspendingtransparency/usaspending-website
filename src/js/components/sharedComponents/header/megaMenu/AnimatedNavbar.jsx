import React, { useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";

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
import NavbarItem from './NavbarItem';
import ItemContent from './ItemContent';

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

const AnimatedNavbar = React.memo(() => {
    const [activeIndices, setActiveIndices] = useState([]);
    const [animatingOut, setAnimatingOut] = useState(false);

    let animatingOutTimeout = null;
    let direction;

    const resetDropdownState = (i) => {
        setActiveIndices(typeof i === "number" ? [i] : []);
        setAnimatingOut(false);
        direction = null;

        animatingOutTimeout = null;
    };

    const getDropdownRootKeyFrame = () => {
        if (animatingOut) return "dropdown-animate-out";
        return "dropdown-animate-in";
    };

    const dropdownRoot = () => {
        if (!animatingOut && direction) {
            return {
                transformOrigin: "0 0",
                animationDuration: '225ms',
                /* use 'forwards' to prevent flicker on leave animation */
                animationFillMode: "forwards",
                /* flex styles will center the caret child component */
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                top: "-20px"
            };
        }
        return {
            transformOrigin: "0 0",
            animationName: getDropdownRootKeyFrame(animatingOut),
            animationDuration: '225ms',
            /* use 'forwards' to prevent flicker on leave animation */
            animationFillMode: "forwards",
            /* flex styles will center the caret child component */
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            top: "-20px"
        };
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

        setActiveIndices((prevState) => prevState.concat(i));

        setAnimatingOut(false);
    };
    const onMouseLeave = () => {
        setAnimatingOut(true);
        direction = null;

        animatingOutTimeout = setTimeout(
            resetDropdownState(), 300
        );
    };

    const currentIndex = activeIndices[activeIndices.length - 1];
    const prevIndex =
        activeIndices.length > 1 &&
        activeIndices[activeIndices.length - 2];

    if (typeof prevIndex === "number") {
        if (currentIndex && prevIndex) {
            if (currentIndex <= prevIndex) {
                if (direction === "left") {
                    return;
                }
                direction = "left";
            }
            else {
                if (direction === "right") {
                    return;
                }
                direction = "right";
            }
        }
    }

    // eslint-disable-next-line consistent-return
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
                            <div
                                style={dropdownRoot()}>
                                <Flipped flipId="dropdown-caret">
                                    <img role="presentation" src="img/caret.svg" alt="" className="caret" />
                                </Flipped>
                                <Flipped flipId="dropdown">
                                    <div className="dropdown-background">
                                        <Flipped inverseFlipId="dropdown" scale>
                                            <div>
                                                <ItemContent
                                                    direction={direction}
                                                    navbarConfig={navbarConfig}
                                                    menuIndex={index}
                                                    prevIndex={prevIndex}
                                                    closeDropdown={onMouseLeave} />
                                            </div>
                                        </Flipped>
                                    </div>
                                </Flipped>
                            </div>
                        )}
                    </NavbarItem>
                ))}
            </Navbar>
        </Flipper>
    );
});

export default AnimatedNavbar;
