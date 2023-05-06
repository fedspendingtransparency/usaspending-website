import React from "react";
import PropTypes from "prop-types";

const getFadeContainerKeyFrame = (animatingOut, direction) => {
    if (!direction) return null;

    if (animatingOut) {
        return `fade-content-animate-out-${direction}`;
    } else {
        return `fade-content-animate-in-${direction}`;
    }
}

 const fadeContainer = (props, animatingOut, direction) => {
    return({
        animation: getFadeContainerKeyFrame(animatingOut, direction),
        animationDuration: `${props.duration * 0.75}ms`,
        animationFillMode: "forwards",
        position: props.animatingOut ? "absolute" : "relative",
        opacity: props.direction && !props.animatingOut ? "0" : "1",
        animationTimingFunction: "linear",
        top: "0",
        left: "0"
    });
};

const propTypes = {
    duration: PropTypes.number,
    direction: PropTypes.oneOf(["right", "left"]),
    animatingOut: PropTypes.bool,
    children: PropTypes.node,
    innerRef: PropTypes.func
};

const FadeContents = (props) => {
    const {
        children,
        duration,
        animatingOut,
        innerRef,
        direction
    } = props;
    return (
        <div style={fadeContainer(props, animatingOut, direction)}
            // prevent screen readers from reading out hidden content
            aria-hidden={animatingOut}
            animatingOut={animatingOut}
            direction={direction}
            duration={duration}
            innerRef={innerRef}>
            {children}
        </div>
    );
}

FadeContents.propTypes = propTypes;
export default FadeContents;




