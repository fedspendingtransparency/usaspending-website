import React, { Component } from "react";
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

const navbarConfig = [
    {
        title: "Search Award Data",
        url: '/search'
    },
    {
        title: "Explore the Data",
        section1Items: spendingOptions,
        section2Items: profileOptions,
        dropdown: ItemContent,
        section1Options,
        section2Options,
        section3Options
    },
    {
        title: "Download the Data",
        section1Items: awardDownloadOptions,
        section2Items: accountDataOptions,
        section3Items: allDownloadOptions,
        dropdown: ItemContent,
        section1Options,
        section2Options,
        section3Options
    },
    {
        title: "Find Resources",
        section1Items: learnResourceOptions,
        section2Items: referenceMaterialsOptions,
        section3Items: developerOptions,
        dropdown: ItemContent,
        section1Options,
        section2Options,
        section3Options
    }
];

export default class AnimatedNavbar extends Component {
    state = {
        activeIndices: []
    };

    onMouseEnter = (i) => {
        if (this.animatingOutTimeout) {
            clearTimeout(this.animatingOutTimeout);
            this.resetDropdownState(i);
            return;
        }

        if (this.state.activeIndices[this.state.activeIndices.length - 1] === i) {
            return;
        }

        this.setState((prevState) => ({
            activeIndices: prevState.activeIndices.concat(i),
            animatingOut: false
        }));
    };
    onMouseLeave = () => {
        this.setState({
            animatingOut: true,
            direction: null
        });
        this.animatingOutTimeout = setTimeout(
            this.resetDropdownState(),
            this.props.tweenConfig.duration
        );
    };

    resetDropdownState = (i) => {
        this.setState({
            activeIndices: typeof i === "number" ? [i] : [],
            animatingOut: false,
            direction: null
        });
        delete this.animatingOutTimeout;
    };

    render() {
        const { tweenConfig } = this.props;

        let CurrentDropdown;
        let PrevDropdown;

        let currentSection1Props;
        let currentSection2Props;
        let currentSection3Props;
        let prevSection1Props;
        let prevSection2Props;
        let prevSection3Props;

        let currentSection1Title;
        let currentSection2Title;
        let currentSection3Title;
        let currentSection1Sub;
        let currentSection2Sub;
        let currentSection3Sub;
        let currentSection1Icon;
        let currentSection2Icon;
        let currentSection3Icon;

        const currentIndex = this.state.activeIndices[
            this.state.activeIndices.length - 1
        ];
        const prevIndex =
            this.state.activeIndices.length > 1 &&
            this.state.activeIndices[this.state.activeIndices.length - 2];

        if (typeof currentIndex === "number") {
            CurrentDropdown = navbarConfig[currentIndex]?.dropdown;
            currentSection1Props = navbarConfig[currentIndex].section1Items;
            currentSection2Props = navbarConfig[currentIndex].section2Items;
            currentSection3Props = navbarConfig[currentIndex].section3Items;

            currentSection1Title = navbarConfig[currentIndex].section1Options[currentIndex]?.title;
            currentSection2Title = navbarConfig[currentIndex].section2Options[currentIndex]?.title;
            currentSection3Title = navbarConfig[currentIndex].section3Options[currentIndex]?.title;

            currentSection1Sub = navbarConfig[currentIndex].section1Options[currentIndex]?.sub;
            currentSection2Sub = navbarConfig[currentIndex].section2Options[currentIndex]?.sub;
            currentSection3Sub = navbarConfig[currentIndex].section3Options[currentIndex]?.sub;

            currentSection1Icon = navbarConfig[currentIndex].section1Options[currentIndex]?.icon;
            currentSection2Icon = navbarConfig[currentIndex].section2Options[currentIndex]?.icon;
            currentSection3Icon = navbarConfig[currentIndex].section3Options[currentIndex]?.icon;
        }

        setTimeout(() => {
            if (typeof prevIndex === "number") {
                prevSection1Props = navbarConfig[prevIndex].section1Items;
                prevSection2Props = navbarConfig[prevIndex].section2Items;
                prevSection3Props = navbarConfig[prevIndex].section3Items;
                PrevDropdown = navbarConfig[prevIndex].dropdown;

                if (currentIndex && prevIndex) {
                    if (currentIndex <= prevIndex) {
                        if (this.state.direction === "left") {
                            return;
                        }
                        this.setState({
                            direction: "left"
                        });
                    } else {
                        if (this.state.direction === "right") {
                            return;
                        }
                        this.setState({
                            direction: "right"
                        });
                    }
                }
            }
        }, 10);

        return (
            <Flipper flipKey={currentIndex} {...tweenConfig}>
                <Navbar onMouseLeave={this.onMouseLeave}>
                    {navbarConfig.map((n, index) => (
                        <NavbarItem
                            key={`navbaritem-${index}`}
                            title={n.title}
                            index={index}
                            url={n.url}
                            closeDropdown={this.onMouseLeave}
                            onMouseEnter={this.onMouseEnter}>
                            {currentIndex === index && (
                                <DropdownContainer
                                    direction={this.state.direction}
                                    animatingOut={this.state.animatingOut}
                                    tweenConfig={this.props.tweenConfig}>
                                    <CurrentDropdown
                                        section1Items={currentSection1Props}
                                        section2Items={currentSection2Props}
                                        section3Items={currentSection3Props}
                                        section1Title={currentSection1Title}
                                        section2Title={currentSection2Title}
                                        section3Title={currentSection3Title}
                                        section1Sub={currentSection1Sub}
                                        section2Sub={currentSection2Sub}
                                        section3Sub={currentSection3Sub}
                                        section1Icon={currentSection1Icon}
                                        section2Icon={currentSection2Icon}
                                        section3Icon={currentSection3Icon}
                                        menuIndex={index} />
                                    {PrevDropdown && <PrevDropdown section1Items={prevSection1Props} section2Items={prevSection2Props} section3Items={prevSection3Props} menuIndex={index} />}
                                </DropdownContainer>
                            )}
                        </NavbarItem>
                    ))}
                </Navbar>
            </Flipper>
        );
    }
}
