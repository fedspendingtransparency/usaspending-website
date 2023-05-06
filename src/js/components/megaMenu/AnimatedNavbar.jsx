import React, { Component } from "react";
import { Flipper } from "react-flip-toolkit";
import Navbar from "./Navbar";
import DropdownContainer from "./DropdownContainer";
import styled from "styled-components";

const Heading = styled.h3`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: ${props => (props.noMarginBottom ? 0 : "1rem")};
  color: ${({ color }) => (color ? `var(--${color})` : "var(--blue)")};
`;

const HeadingLink = Heading.withComponent("li");

const LinkList = styled.ul`
  li {
    margin-bottom: 1rem;
  }

  li:last-of-type {
    margin-bottom: 0;
  }

  margin-left: ${props => (props.marginLeft ? props.marginLeft : 0)};
`;

const Icon = styled.div`
  width: 13px;
  height: 13px;
  margin-right: 13px;
  background-color: var(--blue);
  opacity: 0.8;
  display: inline-block;
`;

const DropdownSection = styled.div`
  padding: var(--spacer);
  position: relative;
  z-index: 1;
`;

const CompanyDropdownEl = styled.div`
  width: 18.5rem;
`;

const CompanyDropdown = () => {
    return (
        <CompanyDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ul>
                    <HeadingLink>
                        <a href="/">
                            <Icon /> About Stripe
                        </a>
                    </HeadingLink>
                    <HeadingLink>
                        <a href="/">
                            <Icon />Customers
                        </a>
                    </HeadingLink>
                    <HeadingLink>
                        <a href="/">
                            <Icon />Jobs
                        </a>
                    </HeadingLink>
                    <HeadingLink noMarginBottom>
                        <a href="/">
                            <Icon />Environment
                        </a>
                    </HeadingLink>
                </ul>
            </DropdownSection>
            <DropdownSection>
                <div>
                    <Heading>
                        <Icon />From the Blog
                    </Heading>
                    <LinkList marginLeft="25px">
                        <li>
                            <a href="/">Stripe Atlas &rsaquo;</a>
                        </li>
                        <li>
                            <a href="/">Stripe Home &rsaquo;</a>
                        </li>
                        <li>
                            <a href="/">Improved Fraud Detection &rsaquo;</a>
                        </li>
                    </LinkList>
                </div>
            </DropdownSection>
        </CompanyDropdownEl>
    );
};

const DevelopersDropdownEl = styled.div`
  width: 25rem;
`;

const Flex = styled.div`
  display: flex;
  > div:first-of-type {
    margin-right: 48px;
  }
`;

const DevelopersDropdown = () => {
    return (
        <DevelopersDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <div>
                    <Heading>Documentation</Heading>
                    <p>Start integrating Stripe&rsquo;s products and tools</p>
                    <Flex>
                        <div>
                            <h4>Get Started</h4>
                            <LinkList>
                                <li>
                                    <a href="/">Elements</a>
                                </li>
                                <li>
                                    <a href="/">Checkout</a>
                                </li>
                                <li>
                                    <a href="/">Mobile apps</a>
                                </li>
                            </LinkList>
                        </div>
                        <div>
                            <h4>Popular Topics</h4>
                            <LinkList>
                                <li>
                                    <a href="/">Apple Pay</a>
                                </li>
                                <li>
                                    <a href="/">Testing</a>
                                </li>
                                <li>
                                    <a href="/">Launch Checklist</a>
                                </li>
                            </LinkList>
                        </div>
                    </Flex>
                </div>
            </DropdownSection>
            <DropdownSection>
                <ul>
                    <HeadingLink>
                        <a href="/">
                            <Icon /> Full API Reference
                        </a>
                    </HeadingLink>
                    <HeadingLink>
                        <a href="/">
                            <Icon /> API Status
                        </a>
                    </HeadingLink>
                    <HeadingLink noMarginBottom>
                        <a href="/">
                            <Icon /> Open Source
                        </a>
                    </HeadingLink>
                </ul>
            </DropdownSection>
        </DevelopersDropdownEl>
    );
};

const ProductsDropdownEl = styled.div`
  width: 29rem;
`;

const Logo = styled.div`
  width: 38px;
  height: 38px;
  margin-right: 16px;
  border-radius: 100%;
  opacity: 0.6;
  background-color: ${({ color }) => `var(--${color})`};
`;

const SubProductsList = styled.ul`
  li {
    display: flex;
    margin-bottom: 1rem;
  }
  h3 {
    margin-right: 1rem;
    width: 3.2rem;
    display: block;
  }
  a {
    color: var(--dark-grey);
  }
`;

const ProductsSection = styled.ul`
  li {
    display: flex;
  }
`;

const WorksWithStripe = styled.div`
 border-top: 2px solid #fff;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--spacer);
  padding-top: var(--spacer);
}
h3 {
  margin-bottom: 0;
}
`;

const ProductsDropdown = () => {
    return (
        <ProductsDropdownEl>
            <DropdownSection data-first-dropdown-section>
                <ProductsSection>
                    <li>
                        <div>
                            <Logo color="blue" />
                        </div>
                        <div>
                            <Heading color="blue">Payments</Heading>
                            <p>A complete payments platform</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <Logo color="green" />
                        </div>
                        <div>
                            <Heading color="green">Billing</Heading>
                            <p>Build and scale your recurring business model</p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <Logo color="teal" />
                        </div>
                        <div>
                            <Heading color="teal">Connect</Heading>
                            <p style={{ marginBottom: 0 }}>
                                Everything platforms need to get sellers paid
                            </p>
                        </div>
                    </li>
                </ProductsSection>
            </DropdownSection>
            <DropdownSection>
                <SubProductsList>
                    <li>
                        <Heading noMarginBottom>Sigma</Heading>
                        <div>Your business data at your fingertips.</div>
                    </li>
                    <li>
                        <Heading noMarginBottom>Atlas</Heading>
                        <div>The best way to start an internet business.</div>
                    </li>
                    <li>
                        <Heading noMarginBottom>Radar</Heading>
                        <div>Fight fraud with machine learning.</div>
                    </li>
                </SubProductsList>
                <WorksWithStripe>
                    <Heading noMarginBottom>
                        <a href="/">
                            <Icon /> Works with Stripe
                        </a>
                    </Heading>
                </WorksWithStripe>
            </DropdownSection>
        </ProductsDropdownEl>
    );
};

const NavbarItemTitle = styled.button`
  background-color: transparent;
  font-family: inherit;
  font-weight: bold;
  border: none;
  font-size: 18px;
  padding: 1.25rem;
  color: white;
  display: flex;
  justify-content: center;
  transition: opacity 250ms;
  cursor: pointer;
  position: relative;
  z-index: 2;
  &:hover,
  &:focus {
    opacity: 0.7;
    outline: none;
  }
`;

const NavbarItemEl = styled.li`
  position: relative;
  cursor: pointer;
`;

const DropdownSlot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  perspective: 1500px;
`;

class NavbarItem extends Component {
    onMouseEnter = () => {
        this.props.onMouseEnter(this.props.index);
    };

    render() {
        const { title, children } = this.props;
        return (
            <NavbarItemEl>
                <NavbarItemTitle
                    onMouseEnter={this.onMouseEnter}
                    onFocus={this.onMouseEnter}
                >
                    {title}
                </NavbarItemTitle>
                <DropdownSlot>{children}</DropdownSlot>
            </NavbarItemEl>
        );
    }
}

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
