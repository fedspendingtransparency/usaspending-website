
import {
    rectangleMapping,
    amountsPadding,
    startOfChartY,
    spacingBetweenLineAndText,
    labelTextAdjustment,
    rectangleHeight
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
    return x + rectangleWidth(overviewData, scale, dataId);
};

export const textXPosition = (overviewData, scale, dataId, width) => lineXPosition(overviewData, scale, dataId) - width - spacingBetweenLineAndText;
export const textYPosition = (dataId, type, labelHeight, valueHeight) => {
    const { isLineAboveChart, lineLength } = rectangleMapping[dataId];
    if (isLineAboveChart) {
        return (startOfChartY - lineLength() - labelTextAdjustment.y) + (type === 'label' ? valueHeight + labelHeight : valueHeight);
    }
    return (startOfChartY + rectangleHeight + lineLength()) - (type === 'value' ? labelTextAdjustment.y + labelHeight : labelTextAdjustment.y);
};
