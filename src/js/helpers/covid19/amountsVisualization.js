
import {
    rectangleMapping,
    amountsPadding,
    lineStrokeWidth,
    spacingBetweenLineAndText,
    labelTextAdjustment
} from 'dataMapping/covid19/amountsVisualization';

export const defaultTextState = (dataId, type) => ({
    y: 0,
    x: 0,
    height: 0,
    text: rectangleMapping[dataId].text[type],
    className: `amounts-text__${type} white`
});

export const rectangleWidth = (overviewData, scale, dataId) => scale(Math.abs(overviewData[dataId])) - (amountsPadding.right + (rectangleMapping[dataId].offset.right || 0));

export const lineXPosition = (overviewData, scale, dataId) => {
    const x = amountsPadding.left + rectangleMapping[dataId].offset.left;
    const position = (x + rectangleWidth(overviewData, scale, dataId)) - (lineStrokeWidth / 2);
    /**
     * Given a line start is less than half the line width, the line will show off of the graph to the left
     * (this occurs when values are small given the scale). We will set the x position to be half of the line width
     * to show the full line on the chart (Note: we will also update the rectangle to do the same).
     */
    if (position < x + lineStrokeWidth) return x + (lineStrokeWidth / 2);
    return position;
};

export const textDirection = (value) => (Math.sign(value) === -1 ? 'right' : 'left');

const textXPositions = {
    description: {
        right: (overviewData, scale, dataId) => lineXPosition(overviewData, scale, dataId) + spacingBetweenLineAndText,
        left: (overviewData, scale, dataId, textElements) => lineXPosition(overviewData, scale, dataId) - ((textElements.description?.width || 0) + spacingBetweenLineAndText)
    },
    label: {
        left: (overviewData, scale, dataId, textElements) => lineXPosition(overviewData, scale, dataId) - ((textElements.label?.width || 0) + (textElements.value?.width || 0) + spacingBetweenLineAndText + labelTextAdjustment.x),
        right: (overviewData, scale, dataId) => lineXPosition(overviewData, scale, dataId) + spacingBetweenLineAndText
    },
    value: {
        left: (overviewData, scale, dataId, textElements) => lineXPosition(overviewData, scale, dataId) - ((textElements.value?.width || 0) + spacingBetweenLineAndText),
        right: (overviewData, scale, dataId, textElements) => lineXPosition(overviewData, scale, dataId) + (textElements.label?.width || 0) + spacingBetweenLineAndText
    }
};

export const textXPosition = (overviewData, scale, dataId, textElements, currentElement) => {
    /**
     * for all text elements we must know if we are drawing to the left or right of the line,
     * and the longest text element is always the description, based on the design.
     * Therefore, we always get the description position, which tells us to displa
     * text to the left or right of the line.
     */
    const textXValue = lineXPosition(overviewData, scale, dataId) - ((textElements.description?.width || 0) + spacingBetweenLineAndText);
    // If the start of the description is negative then the text must be to the right.
    return textXPositions[currentElement][textDirection(textXValue)](overviewData, scale, dataId, textElements, currentElement);
};
