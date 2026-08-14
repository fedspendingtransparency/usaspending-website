import React, { memo } from "react";
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

const fadeContainer = (animatingOut, direction) => {
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
    direction: PropTypes.string,
    children: PropTypes.node,
    hide: PropTypes.bool
};

// eslint-disable-next-line prefer-arrow-callback
const FadeContents = memo(function FadeContents ({
    children,
    direction,
    hide
}) {
    return (
        <div
            style={fadeContainer(hide, direction)}
            // prevent screen readers from reading out hidden content
            aria-hidden={hide}>
            {children}
        </div>
    );
});

FadeContents.propTypes = propTypes;
export default FadeContents;
