import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import { Flipped } from "react-flip-toolkit";
import FadeContents from "./FadeContents";

const getDropdownRootKeyFrame = (animatingOut) => {
    if (animatingOut) return "dropdown-animate-out";
    return "dropdown-animate-in";
};

const dropdownRoot = ({ animatingOut, direction }) => {
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

    render() {
        const {
            children, direction, tweenConfig
        } = this.props;

        const [currentDropdown, prevDropdown] = Children.toArray(children);
        // to get an outline around a caret you have to add a larger caret behind a white one and then get them to line up
        return (
            <div
                style={dropdownRoot(this.props)}>
                <Flipped flipId="dropdown-caret">
                    <img role="presentation" src="img/caret.svg" alt="" className="caret" />
                </Flipped>
                <Flipped flipId="dropdown">
                    <div className="dropdown-background">
                        <Flipped inverseFlipId="dropdown" scale>
                            <div>
                                <FadeContents
                                    animatingOut={this.props.animatingOut}
                                    direction={direction}
                                    duration={tweenConfig.duration}>
                                    {currentDropdown}
                                </FadeContents>
                                {prevDropdown && (
                                    <FadeContents
                                        animatingOut={this.props.animatingOut}
                                        direction={direction}
                                        duration={tweenConfig.duration}>
                                        {prevDropdown}
                                    </FadeContents>
                                )}
                            </div>
                        </Flipped>
                    </div>
                </Flipped>
            </div>
        );
    }
}
