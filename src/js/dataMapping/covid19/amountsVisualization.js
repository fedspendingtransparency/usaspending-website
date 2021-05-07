
export const defaultRectangleData = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: 'transparent',
    description: ''
};

export const defaultLineData = {
    lineColor: 'transparent',
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0
};

export const tooltipMapping = {
    _totalBudgetAuthority: {
        data: 'totalRectangleData',
        title: 'Total Budgetary Resources',
        paragraph: 'This amount represents all congressional appropriations and other available budgetary resources.'
    },
    _totalOutlays: {
        data: 'outlayRectangleData',
        title: 'Total Outlays',
        paragraph: 'This amount represents all outlays, or actual payments, made by agencies.'
    },
    _totalObligations: {
        data: 'obligationRectangleData',
        title: 'Total Obligations',
        paragraph: 'This amount represents all obligations, or promises of payment, made by agencies.'
    },
    _remainingBalance: {
        data: 'remainingBalanceRectangleData',
        title: 'Total Remaining Balance',
        paragraph: 'This amount represents how much is left to be obligated, or promised to be paid, by agencies. '
    }
};

export const defaultTooltipWidth = 375;
export const amountsPadding = {
    left: 45,
    right: 45
};

export const amountsHeight = 400;
export const paddingBetweenRectangles = 3;
export const startOfChartY = 160;
export const rectangleHeight = 45;
export const lineStrokeWidth = 3;
export const lineLength = [162 - (rectangleHeight / 2), 84 - (rectangleHeight / 2)];
export const heightOfRemainingBalanceLines = 10;
export const remaniningBalanceLineWidth = 1;
export const spacingBetweenLineAndText = 10;
export const labelTextAdjustment = {
    x: 4,
    y: 4
};

export const rectangleMapping = {
    _totalBudgetAuthority: {
        fill: {
            default: '#D0BEDA',
            defCode: '#AAC6E2'
        },
        lineColor: {
            default: '#D0BEDA',
            defCode: '#AAC6E2'
        },
        offset: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        line: true,
        lineLength: lineLength[0],
        text: {
            description: 'This was the total amount made available.',
            descriptionWidth: 312.2,
            label: 'Total Budgetary Resources:'
        }
    },
    _totalObligations: {
        fill: {
            default: '#9266AA',
            defCode: '#558EC6'
        },
        lineColor: {
            default: '#9266AA',
            defCode: '#558EC6'
        },
        offset: {
            left: 0,
            right: 0,
            top: paddingBetweenRectangles,
            bottom: paddingBetweenRectangles
        },
        line: true,
        lineLength: lineLength[0],
        text: {
            description: 'This amount has been promised to be spent.',
            descriptionWidth: 322.7,
            label: 'Total Obligations:'
        }
    },
    _totalOutlays: {
        fill: {
            default: '#3B005B',
            defCode: '#0A2F5A'
        },
        lineColor: {
            default: '#3B005B',
            defCode: '#0A2F5A'
        },
        offset: {
            left: 0,
            right: 0,
            top: 2 * paddingBetweenRectangles,
            bottom: 2 * paddingBetweenRectangles
        },
        line: true,
        lineLength: lineLength[1],
        text: {
            description: 'This amount has been paid out.',
            descriptionWidth: 230.5,
            label: 'Total Outlays:'
        }
    },
    _remainingBalance: {
        lineColor: '#9D9D9D',
        fill: 'white',
        primaryKey: '_totalObligations',
        offset: {
            left: 0,
            right: paddingBetweenRectangles,
            top: paddingBetweenRectangles,
            bottom: paddingBetweenRectangles
        },
        line: true,
        lineLength: lineLength[1],
        text: {
            description: 'This amount has not yet been promised to be spent.',
            descriptionWidth: 376.4,
            label: 'Total Remaining Balance:',
            offset: {
                y: 3
            }
        }
    }
};

export const tooltipShortName = {
    'american-rescue-plan': 'American Rescue Plan'
};
