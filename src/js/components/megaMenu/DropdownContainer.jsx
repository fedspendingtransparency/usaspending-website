import styled, { keyframes } from "styled-components";
import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import { Flipped } from "react-flip-toolkit";
import FadeContents from "./FadeContents";

const getDropdownRootKeyFrame = ({ animatingOut, direction }) => {
    if (!animatingOut && direction) return null;
    return keyframes`
  from {
    transform: ${animatingOut ? "rotateX(0)" : "rotateX(-15deg)"};
    opacity: ${animatingOut ? 1 : 0};
  }
  to {
    transform: ${animatingOut ? "rotateX(-15deg)" : "rotateX(0)"};
    opacity: ${animatingOut ? 0 : 1};
  }
`;
};

const DropdownRoot = styled.div`
  transform-origin: 0 0;
  animation-name: ${getDropdownRootKeyFrame};
  animation-duration: ${props => props.duration}ms;
  /* use 'forwards' to prevent flicker on leave animation */
  animation-fill-mode: forwards;
  /* flex styles will center the caret child component */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: -20px;
`;
const Caret = styled.div`
  width: 0;
  height: 0;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent var(--white);
  /* make sure it's above the main dropdown container so now box-shadow bleeds over it */
  z-index: 1;
  position: relative;
  /* prevent any gap in between caret and main dropdown */
  top: 1px;
`;

const DropdownBackground = styled.div`
  transform-origin: 0 0;
  background-color: var(--white);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 50px 100px rgba(50, 50, 93, 0.1),
    0 15px 35px rgba(50, 50, 93, 0.15), 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const AltBackground = styled.div`
  background-color: var(--grey);
  width: 200%;
  height: 100%;
  position: absolute;
  top: 0;
  left: -50%;
  transform-origin: 0 0;
  z-index: 0;
  transition: transform ${props => props.duration}ms;
`;

const getFirstDropdownSectionHeight = el => {
    if (!el) return null;
    return el.querySelector("*[data-first-dropdown-section]")
        ? el.querySelector("*[data-first-dropdown-section]").offsetHeight
        : 0;
};

const updateAltBackground = ({
    altBackground,
    prevDropdown,
    currentDropdown
}) => {
    const prevHeight = getFirstDropdownSectionHeight(prevDropdown);
    const currentHeight = getFirstDropdownSectionHeight(currentDropdown);

    const immediateSetTranslateY = (el, translateY) => {
        if(el && e.style) {
            console.log("here");
            el.style.transform = `translateY(${translateY}px)`;
            el.style.transition = "transform 0s";
            requestAnimationFrame(() => (el.style.transitionDuration = ""));
        }
    };

    if (prevHeight) {
        // transition the grey ("alt") background from its previous height to its current height
        immediateSetTranslateY(altBackground, prevHeight);
        requestAnimationFrame(() => {
            altBackground.style.transform = `translateY(${currentHeight}px)`;
        });
    } else {
        // just immediately set the background to the appropriate height
        // since we don't have a stored value
        immediateSetTranslateY(altBackground, currentHeight);
    }
};

export default class DropdownContainer extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        animatingOut: PropTypes.bool,
        direction: PropTypes.oneOf(["left", "right"]),
        tweenConfig: PropTypes.shape({
            duration: PropTypes.number,
            easing: PropTypes.string
        })
    };

    componentDidMount() {
        updateAltBackground({
            altBackground: this.altBackgroundEl,
            prevDropdown: this.prevDropdownEl,
            currentDropdown: this.currentDropdownEl,
            tweenConfig: this.props.tweenConfig
        });
    }

    render() {
        const { children, direction, animatingOut, tweenConfig } = this.props;
        const [currentDropdown, prevDropdown] = Children.toArray(children);
        return (
            <DropdownRoot
                direction={direction}
                animatingOut={animatingOut}
                duration={tweenConfig.duration}
            >
                <Flipped flipId="dropdown-caret">
                    <Caret />
                </Flipped>
                <Flipped flipId="dropdown">
                    <DropdownBackground>
                        <Flipped inverseFlipId="dropdown" scale>
                            <div>
                                <AltBackground
                                    innerRef={el => (this.altBackgroundEl = el)}
                                    duration={tweenConfig.duration}
                                />
                                <FadeContents
                                    direction={direction}
                                    duration={tweenConfig.duration}
                                    innerRef={el => (this.currentDropdownEl = el)}
                                >
                                    {currentDropdown}
                                </FadeContents>
                                {prevDropdown && (
                                    <FadeContents
                                        animatingOut
                                        direction={direction}
                                        duration={tweenConfig.duration}
                                        innerRef={el => (this.prevDropdownEl = el)}
                                    >
                                        {prevDropdown}
                                    </FadeContents>
                                )}
                            </div>
                        </Flipped>
                    </DropdownBackground>
                </Flipped>
            </DropdownRoot>
        );
    }
}
