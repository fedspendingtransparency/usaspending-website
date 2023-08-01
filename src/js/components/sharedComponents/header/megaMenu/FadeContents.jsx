import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

// const getFadeContainerKeyFrame = (animatingOut, direction) => {
//     if (animatingOut) {
//         return `fade-content-animate-out-${direction}`;
//     }
//     return `fade-content-animate-in-${direction}`;
// };
//
// const getOpacity = (direction, animatingOut) => {
//     if (direction && !animatingOut) {
//         return 0;
//     }
//     return 1;
// };
//
// const getPosition = (animatingOut) => {
//     if (animatingOut) {
//         return "absolute";
//     }
//     return "relative";
// };
//
// const fadeContainer = (duration, animatingOut, direction) => {
//     if (!direction) {
//         return {
//             animationDuration: '225ms',
//             animationFillMode: "forwards",
//             position: getPosition(animatingOut),
//             opacity: getOpacity(direction, animatingOut),
//             animationTimingFunction: "linear",
//             top: "0",
//             left: "0"
//         };
//     }
//
//     return {
//         animationName: getFadeContainerKeyFrame(animatingOut, direction),
//         animationDuration: '225ms',
//         animationFillMode: "forwards",
//         position: getPosition(animatingOut),
//         opacity: getOpacity(direction, animatingOut),
//         animationTimingFunction: "linear",
//         top: "0",
//         left: "0"
//     };
// };
//

const propTypes = {
    direction: PropTypes.string,
    onLoad: PropTypes.bool,
    children: PropTypes.node,
    innerRefFn: PropTypes.func
};

const FadeContents = (props) => {
    const {
        children,
        direction
    } = props;

    const nodeRef = useRef(null);
    const [unMount, setUnMount] = useState(false);
    const [menuIndex, setMenuIndex] = useState(null);
    const [onLoad, setOnLoad] = useState(false);

    useEffect(() => {
        console.log('mount');
        return (() => {
            setUnMount(true);
        });
    });

    useEffect(() => {
        if (menuIndex !== props.menuIndex) {
            setOnLoad(false);
            setMenuIndex(props.menuIndex);
        }
    }, [props]);

    useEffect(() => {
        if (menuIndex > 0 && menuIndex <= 3) {
            setOnLoad(true);
        } else {
            setOnLoad(false);
        }
    }, [menuIndex]);

    return (
        <CSSTransition
            classNames={direction ? `fadex-${direction}` : `fadex`}
            timeout={100}
            nodeRef={nodeRef}
            in={!unMount}
            exit={unMount}>
            <div ref={nodeRef} aria-hidden={onLoad}>
                {children}
            </div>
        </CSSTransition>
    );
};

FadeContents.propTypes = propTypes;
export default FadeContents;

