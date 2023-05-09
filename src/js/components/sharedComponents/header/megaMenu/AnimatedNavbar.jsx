import React, { Component } from "react";
import { Flipper } from "react-flip-toolkit";
import { profileOptions, downloadOptions, resourceOptions } from 'dataMapping/navigation/menuOptions';
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
        items: profileOptions,
        dropdown: ItemContent,
        section1Title: "Spending Explorer",
        section2Title: "Profiles"
    },
    {
        title: "Download the Data",
        items: downloadOptions,
        dropdown: ItemContent,
        section1Title: "Award Data",
        section2Title: "Account Data",
        section3Title: "All Data"
    },
    {
        title: "Find Resources",
        items: resourceOptions,
        dropdown: ItemContent,
        section1Title: "Learn",
        section2Title: "Reference Materials",
        section3Title: "For Developers"
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
            animatingOut: true
        });
        this.animatingOutTimeout = setTimeout(
            this.resetDropdownState,
            this.props.tweenConfig.duration
        );
    };

    resetDropdownState = (i) => {
        this.setState({
            activeIndices: typeof i === "number" ? [i] : [],
            animatingOut: false
        });
        delete this.animatingOutTimeout;
    };

    render() {
        const { tweenConfig } = this.props;

        let CurrentDropdown;
        let PrevDropdown;
        let direction;
        let currentProps;
        let prevProps;
        let currentSection1Title;
        let currentSection2Title;
        let currentSection3Title;
        const currentIndex = this.state.activeIndices[
            this.state.activeIndices.length - 1
        ];
        const prevIndex =
            this.state.activeIndices.length > 1 &&
            this.state.activeIndices[this.state.activeIndices.length - 2];

        if (typeof currentIndex === "number") {
            CurrentDropdown = navbarConfig[currentIndex]?.dropdown;
            currentProps = navbarConfig[currentIndex].items;
            currentSection1Title = navbarConfig[currentIndex].section1Title;
            currentSection2Title = navbarConfig[currentIndex].section2Title;
            currentSection3Title = navbarConfig[currentIndex].section3Title;
        }
        if (typeof prevIndex === "number") {
            PrevDropdown = navbarConfig[prevIndex].dropdown;
            prevProps = navbarConfig[prevIndex].items;

            direction = currentIndex > prevIndex ? "right" : "left";
        }

        return (
            <Flipper flipKey={currentIndex} {...tweenConfig}>
                <Navbar onMouseLeave={this.onMouseLeave}>
                    {navbarConfig.map((n, index) => (
                        <NavbarItem
                            title={n.title}
                            index={index}
                            url={n.url}
                            closeDropdown={this.onMouseLeave}
                            onMouseEnter={this.onMouseEnter}>
                            {currentIndex === index && (
                                <DropdownContainer
                                    direction={direction}
                                    animatingOut={this.state.animatingOut}
                                    tweenConfig={this.props.tweenConfig}>
                                    <CurrentDropdown items={currentProps} section1Title={currentSection1Title} section2Title={currentSection2Title} section3Title={currentSection3Title} />
                                    {PrevDropdown && <PrevDropdown items={prevProps} />}
                                </DropdownContainer>
                            )}
                        </NavbarItem>
                    ))}
                </Navbar>
            </Flipper>
        );
    }
}
