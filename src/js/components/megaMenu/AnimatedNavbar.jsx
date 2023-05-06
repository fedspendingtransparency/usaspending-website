import React, { Component } from "react";
import { Flipper } from "react-flip-toolkit";
import Navbar from "./Navbar";
import DropdownContainer from "./DropdownContainer";
import NavbarItem from './NavbarItem';
import { ProductsDropdown, DevelopersDropdown, CompanyDropdown } from './dropdownContent';

const navbarConfig = [
    { title: "Products", dropdown: ProductsDropdown },
    { title: "Developers", dropdown: DevelopersDropdown },
    { title: "Company", dropdown: CompanyDropdown }
];

export default class AnimatedNavbar extends Component {
    state = {
        activeIndices: []
    };

    resetDropdownState = i => {
        this.setState({
            activeIndices: typeof i === "number" ? [i] : [],
            animatingOut: false
        });
        delete this.animatingOutTimeout;
    };

    onMouseEnter = i => {
        if (this.animatingOutTimeout) {
            clearTimeout(this.animatingOutTimeout);
            this.resetDropdownState(i);
            return;
        }
        if (this.state.activeIndices[this.state.activeIndices.length - 1] === i)
            return;

        this.setState(prevState => ({
            activeIndices: prevState.activeIndices.concat(i),
            animatingOut: false
        }));
    };
    onMouseLeave = ev => {
        this.setState({
            animatingOut: true
        });
        this.animatingOutTimeout = setTimeout(
            this.resetDropdownState,
            this.props.tweenConfig.duration
        );
    };

    render() {
        const { tweenConfig } = this.props;

        let CurrentDropdown;
        let PrevDropdown;
        let direction;

        const currentIndex = this.state.activeIndices[
        this.state.activeIndices.length - 1
            ];
        const prevIndex =
            this.state.activeIndices.length > 1 &&
            this.state.activeIndices[this.state.activeIndices.length - 2];

        if (typeof currentIndex === "number")
            CurrentDropdown = navbarConfig[currentIndex].dropdown;
        if (typeof prevIndex === "number") {
            PrevDropdown = navbarConfig[prevIndex].dropdown;
            direction = currentIndex > prevIndex ? "right" : "left";
        }

        return (
            <Flipper flipKey={currentIndex} {...tweenConfig}>
                <Navbar onMouseLeave={this.onMouseLeave}>
                    {navbarConfig.map((n, index) => {
                        return (
                            <NavbarItem
                                title={n.title}
                                index={index}
                                onMouseEnter={this.onMouseEnter}
                            >
                                {currentIndex === index && (
                                    <DropdownContainer
                                        direction={direction}
                                        animatingOut={this.state.animatingOut}
                                        tweenConfig={this.props.tweenConfig}
                                    >
                                        <CurrentDropdown />
                                        {PrevDropdown && <PrevDropdown />}
                                    </DropdownContainer>
                                )}
                            </NavbarItem>
                        );
                    })}
                </Navbar>
            </Flipper>
        );
    }
}
