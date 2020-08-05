/**
 * scrollToHelper.js
 * Created by Kevin Li 7/5/17
 */

import { easeInOutQuad } from './animation/easingFunctions';

const stepAnimate = (positions, index, element = window) => {
    const newX = positions.xPos[index];
    const newY = positions.yPos[index];
    element.scrollTo(newX, newY);

    if ((positions.yPos.length - index) > 1) {
        window.requestAnimationFrame(() => {
            stepAnimate(positions, index + 1, element);
        });
    }
};

export const scrollTo = (x = 0, y = 0, time = 150, element = window) => {
    // get the starting X and Y positions
    const startY = element === window
        ? element.scrollY || element.pageYOffset
        : element.scrollTop;
    const startX = element === window
        ? element.scrollX || element.pageXOffset
        : element.scrollLeft;

    const frameLength = 1000 / 60; // 60fps
    const steps = Math.round(time / frameLength);

    // precalculate each frame's position
    const yPos = [];
    const xPos = [];
    for (let i = 0; i < steps; i++) {
        const frame = i * frameLength;
        yPos.push(easeInOutQuad(frame, startY, y, time));
        xPos.push(easeInOutQuad(frame, startX, x, time));
    }

    window.requestAnimationFrame(() => {
        stepAnimate({
            yPos,
            xPos
        }, 0, element);
    });
};

export const scrollToX = (x = 0, time = 150, element = window) => scrollTo(x, 0, time, element);

export const scrollToY = (y = 0, time = 150, element = window) => scrollTo(0, y, time, element);
