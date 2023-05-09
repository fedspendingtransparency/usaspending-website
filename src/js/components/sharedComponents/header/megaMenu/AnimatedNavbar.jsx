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
        dropdown: ItemContent
    },
    {
        title: "Download the Data",
        items: downloadOptions,
        dropdown: ItemContent
    },
    {
        title: "Find Resources",
        items: resourceOptions,
        dropdown: ItemContent
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

        const currentIndex = this.state.activeIndices[
            this.state.activeIndices.length - 1
        ];
        const prevIndex =
            this.state.activeIndices.length > 1 &&
            this.state.activeIndices[this.state.activeIndices.length - 2];

        if (typeof currentIndex === "number") {
            CurrentDropdown = navbarConfig[currentIndex]?.dropdown;
            currentProps = navbarConfig[currentIndex].items;
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
                                    <CurrentDropdown items={currentProps} />
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
