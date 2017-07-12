/**
 * scrollToHelper.js
 * Created by Kevin Li 7/5/17
 */

import { easeInOutQuad } from './animation/easingFunctions';

const stepAnimate = (positions, index) => {
    const newX = positions.xPos[index];
    const newY = positions.yPos[index];
    window.scrollTo(newX, newY);

    if ((positions.yPos.length - index) > 1) {
        window.requestAnimationFrame(() => {
            stepAnimate(positions, index + 1);
        });
    }
};

export const scrollTo = (x = 0, y = 0, time = 150) => {
    // get the starting X and Y positions
    const startY = window.scrollY || window.pageYOffset;
    const startX = window.scrollX || window.pageXOffset;

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
        }, 0);
    });
};

export const scrollToX = (x = 0, time = 150) => scrollTo(x, 0, time);

export const scrollToY = (y = 0, time = 150) => scrollTo(0, y, time);
