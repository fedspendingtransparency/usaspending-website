
import { rectangleMapping, amountsPadding, lineStrokeWidth } from 'dataMapping/covid19/amountsVisualization';

export const defaultTextState = (dataId, type) => ({
    y: 0,
    x: 0,
    height: 0,
    text: rectangleMapping[dataId].text[type],
    className: `amounts-text__${type} white`
});

export const lineXPosition = (overviewData, scale, dataId) => {
    const { offset } = rectangleMapping[dataId];
    const { left, right } = amountsPadding;
    const x = left + offset.left;
    const rectWidth = scale(Math.abs(overviewData[dataId])) - (right + (offset.right || 0));
    return (x + rectWidth) - (lineStrokeWidth / 2);
};
