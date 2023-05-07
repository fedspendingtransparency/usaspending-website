import React, { Children, Component } from "react";
import PropTypes from "prop-types";
import { Flipped } from "react-flip-toolkit";
import FadeContents from "./FadeContents";

const getDropdownRootKeyFrame = ({ animatingOut, direction }) => {
    if (!animatingOut && direction) return null;
    if (animatingOut) return "dropdown-animate-out";
    return "dropdown-animate-in";
};

const dropdownRoot = (props) => ({
    transformOrigin: "0 0",
    animationName: getDropdownRootKeyFrame(props),
    animationDuration: '300ms',
    /* use 'forwards' to prevent flicker on leave animation */
    animationFillMode: "forwards",
    /* flex styles will center the caret child component */
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    top: "-20px"
});

const altBackgroundStyles = (props) => ({
    backgroundColor: "var(--grey)",
    width: "200%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "-50%",
    transformOrigin: "0 0",
    zIndex: "0",
    transition: `transform ${props.duration}ms`
});

const getFirstDropdownSectionHeight = (el) => {
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
        // eslint-disable-next-line no-param-reassign
        el.style.transform = `translateY(${translateY}px)`;
        // eslint-disable-next-line no-param-reassign
        el.style.transition = "transform 0s";
        // eslint-disable-next-line no-undef,no-return-assign,no-param-reassign
        requestAnimationFrame(() => (el.style.transitionDuration = ""));
    };

    if (prevHeight) {
        // transition the grey ("alt") background from its previous height to its current height
        immediateSetTranslateY(altBackground, prevHeight);
        // eslint-disable-next-line no-undef
        requestAnimationFrame(() => {
            // eslint-disable-next-line no-param-reassign
            altBackground.style.transform = `translateY(${currentHeight}px)`;
        });
    }
    else {
        // just immediately set the background to the appropriate height
        // since we don't have a stored value
        immediateSetTranslateY(altBackground, currentHeight);
    }
};

export default class DropdownContainer extends Component {
    // eslint-disable-next-line react/sort-comp
    constructor(props) {
        super(props);

        this.state = {
            dropdownRootStyles: dropdownRoot(props)
        };
    }

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
        const {
            children, direction, animatingOut, tweenConfig
        } = this.props;
        const [currentDropdown, prevDropdown] = Children.toArray(children);
        return (
            <div
                style={this.state.dropdownRootStyles}
                direction={direction}
                animatingOut={animatingOut}
                duration={tweenConfig.duration} >
                <Flipped flipId="dropdown-caret">
                    <div className="caret" />
                </Flipped>
                <Flipped flipId="dropdown">
                    <div className="dropdown-background">
                        <Flipped inverseFlipId="dropdown" scale>
                            <div>
                                <div
                                    style={altBackgroundStyles(this.props)}
                                    /* eslint-disable-next-line no-return-assign */
                                    ref={(el) => (this.altBackgroundEl = el)}
                                    duration={tweenConfig.duration} />
                                <FadeContents
                                    direction={direction}
                                    duration={tweenConfig.duration}
                                    /* eslint-disable-next-line no-return-assign */
                                    innerRefFn={(el) => (this.currentDropdownEl = el)}>
                                    {currentDropdown}
                                </FadeContents>
                                {prevDropdown && (
                                    <FadeContents
                                        direction={direction}
                                        duration={tweenConfig.duration}
                                        /* eslint-disable-next-line no-return-assign */
                                        innerRefFn={(el) => (this.prevDropdownEl = el)}>
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
