import React from "react";
import PropTypes from "prop-types";

const getFadeContainerKeyFrame = (animatingOut, direction) => {
    if (animatingOut) {
        return `fade-content-animate-out-${direction}`;
    }
    return `fade-content-animate-in-${direction}`;
};

const getOpacity = (direction, animatingOut) => {
    if (direction && !animatingOut) {
        return 0;
    }
    return 1;
};

const getPosition = (animatingOut) => {
    if (animatingOut) {
        return "absolute";
    }
    return "relative";
};

const fadeContainer = (duration, animatingOut, direction) => {
    if (!direction) {
        return {
            animationDuration: '225ms',
            animationFillMode: "forwards",
            position: getPosition(animatingOut),
            opacity: getOpacity(direction, animatingOut),
            animationTimingFunction: "linear",
            top: "0",
            left: "0"
        };
    }

    return {
        animationName: getFadeContainerKeyFrame(animatingOut, direction),
        animationDuration: '225ms',
        animationFillMode: "forwards",
        position: getPosition(animatingOut),
        opacity: getOpacity(direction, animatingOut),
        animationTimingFunction: "linear",
        top: "0",
        left: "0"
    };
};


const propTypes = {
    duration: PropTypes.number,
    direction: PropTypes.oneOf(["right", "left"]),
    animatingOut: PropTypes.bool,
    children: PropTypes.node,
    innerRefFn: PropTypes.func
};

const FadeContents = (props) => {
    const {
        children,
        duration,
        animatingOut,
        direction
    } = props;

    return (
        <div
            style={fadeContainer(duration, animatingOut, direction)}
            // prevent screen readers from reading out hidden content
            aria-hidden={animatingOut}>
            {children}
        </div>
    );
};

FadeContents.propTypes = propTypes;
export default FadeContents;

