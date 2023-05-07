import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const getFadeContainerKeyFrame = (animatingOut, direction) => {
    if (!direction) return null;

    if (animatingOut) {
        return `fade-content-animate-out-${direction}`;
    } else {
        return `fade-content-animate-in-${direction}`;
    }
}

const getOpacity = (direction, animatingOut) => {
    if (direction && !animatingOut) {
        return 0;
    }
    return 1;
}

const getPosition = (animatingOut) => {
    if (animatingOut) {
        return "absolute";
    }
    return "relative";
}

const fadeContainer = (duration, animatingOut, direction) => {
    return({
        animationName: getFadeContainerKeyFrame(animatingOut, direction),
        animationDuration: '225ms',
        animationFillMode: "forwards",
        position: getPosition(animatingOut),
        opacity: getOpacity(direction, animatingOut),
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
    innerRefFn: PropTypes.func
};

const FadeContents = (props) => {
    const {
        children,
        duration,
        animatingOut,
        innerRefFn,
        direction
    } = props;

    const [fadeContainerStyles, setFadeContainerStyles] = useState();
    useEffect(() => {
        setFadeContainerStyles(fadeContainer(duration, animatingOut, direction));
    }, [props]);

    return (
        <div style={fadeContainerStyles}
            // prevent screen readers from reading out hidden content
            aria-hidden={animatingOut}
            animatingOut={animatingOut}
            direction={direction}
            duration={duration}
            ref={(el) => innerRefFn(el)}>
            {children}
        </div>
    );
}

FadeContents.propTypes = propTypes;
export default FadeContents;




