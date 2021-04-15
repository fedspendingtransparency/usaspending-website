/**
 * totalObligationsOverTime.js
 * Created by Jonathan Hill 04/08/21
 */

const xLabelHeight = 18;

const xLabelSpacing = 4;

const pathStrokeWidth = 1;

export const xLabelHeightPlusPadding = xLabelHeight + xLabelSpacing;

export const yOffsetForPathStrokeWidth = (pathStrokeWidth + 1) / 2;

export const defaultPadding = {
    top: 0,
    bottom: 24,
    right: 30,
    left: 30
};

export const mockAgencyObligationByPeriod = [
    {
        period: 1,
        obligated: 46698411999.28
    },
    {
        period: 2,
        obligated: 85901744451.98
    },
    {
        period: 3,
        obligated: 100689245470.66
    },
    {
        period: 4,
        obligated: 110898908395.86
    },
    {
        period: 5,
        obligated: 120898908395.86
    },
    {
        period: 6,
        obligated: 10689245470.86
    },
    {
        period: 7,
        obligated: 140898908395.86
    },
    {
        period: 8,
        obligated: 190689245470.86
    },
    {
        period: 9,
        obligated: 160898908395.86
    },
    {
        period: 10,
        obligated: 170898908395.86
    },
    {
        period: 11,
        obligated: 180898908395.86
    },
    {
        period: 12,
        obligated: 185898908395.86
    }
];
