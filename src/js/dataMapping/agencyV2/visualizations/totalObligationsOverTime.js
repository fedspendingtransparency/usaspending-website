/**
 * totalObligationsOverTime.js
 * Created by Jonathan Hill 04/08/21
 */

const xLabelHeight = 18;

const xLabelSpacing = 4;

const pathStrokeWidth = 1;

export const xLabelHeightPlusPadding = xLabelHeight + xLabelSpacing;

export const yOffsetForPathStrokeWidth = (pathStrokeWidth + 1) / 2;

export const defaultHeight = 208;

export const defaultPadding = {
    top: 24,
    bottom: 24,
    right: 30,
    left: 30
};

// $color-secondary
export const pathStopColorRed = '#e31c3d';
// $color-cool-blue
export const pathStopColorBlue = '#205493';
// $color-secondary-lightest
export const areaPathStopColorRed = '#f9dede';
// $color-cool-blue-lightest
export const areaPathStopColorBlue = '#dce4ef';

export const normalStoppingPoints = [
    { offset: '0%', stopColor: 'blue' },
    { offset: '100%', stopColor: 'blue' }
];
