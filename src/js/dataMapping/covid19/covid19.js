/**
 * covid19.js
 * Created by Jonathan Hill 06/02/20
 */

import { getBaseUrl } from 'helpers/socialShare';

export const slug = 'covid-19';

export const getEmailSocialShareData = {
    subject: 'USAspending.gov COVID-19 Response: ',
    body: `View the COVID-19 Response on USAspending.gov: ${getBaseUrl(slug)}`
};

export const scrollPositionOfSiteHeader = (cookie) => (cookie ? 96 : 187);

export const defCodes = ['L', 'M', 'N', 'O', 'P'];

export const footerTitle = 'Looking for more insight on COVID-19 relief?';
export const footerDescription = 'for more in-depth analysis on this COVID-19 and more';

export const amountsHeight = 400;
export const sankeyHeight = 400;
export const amountsPadding = {
    left: 45,
    right: 45
};

export const moneyLabel = {
    B: 'Billion',
    M: 'Million',
    T: 'Trillion'
};

export const paddingBetweenRectangles = 3;

export const rectangleMapping = {
    _totalBudgetAuthority: {
        fill: '#555',
        offset: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        line: true,
        text: {
            question: ['How much is', 'available to be spent?'],
            questionLeft: 197,
            questionDown: 15,
            valueLeft: 188,
            valueDown: 70,
            labelLeft: 186,
            labelDown: 25,
            label: 'Total Budgetary Resources'
        }
    },
    contentOuter: { // white rectangle
        fill: 'white',
        offset: {
            left: paddingBetweenRectangles,
            right: paddingBetweenRectangles,
            top: paddingBetweenRectangles,
            bottom: paddingBetweenRectangles
        },
        primaryKey: '_totalBudgetAuthority'
    },
    content: { // baby blue rectangle
        fill: '#AAC6E2',
        offset: {
            left: 2 * paddingBetweenRectangles,
            right: 2 * paddingBetweenRectangles,
            top: 2 * paddingBetweenRectangles,
            bottom: 2 * paddingBetweenRectangles
        },
        primaryKey: '_totalBudgetAuthority'
    },
    _totalObligations: {
        fill: '#558EC6',
        offset: {
            left: 2 * paddingBetweenRectangles,
            right: 0,
            top: 3 * paddingBetweenRectangles,
            bottom: 3 * paddingBetweenRectangles
        },
        line: true,
        text: {
            question: ['How much was', 'promised to be spent?'],
            label: 'Total Obligations',
            questionLeft: 198,
            questionDown: 46,
            valueLeft: 165,
            valueDown: 40,
            labelLeft: 123,
            labelDown: 25
        }
    },
    _totalOutlays: {
        fill: '#0A2F5A',
        offset: {
            left: 2 * paddingBetweenRectangles,
            right: 0,
            top: 4 * paddingBetweenRectangles,
            bottom: 4 * paddingBetweenRectangles
        },
        line: true,
        text: {
            question: ['How much has', 'been paid out?'],
            label: 'Total Outlays',
            questionLeft: 138,
            questionDown: 15,
            valueLeft: 165,
            valueDown: 70,
            labelLeft: 97,
            labelDown: 25
        }
    },
    _remainingBalance: {
        fill: '#558EC6',
        primaryKey: '_totalObligations',
        offset: {
            left: 3 * paddingBetweenRectangles,
            right: 6 * paddingBetweenRectangles,
            top: 3 * paddingBetweenRectangles,
            bottom: 3 * paddingBetweenRectangles
        },
        line: true,
        text: {
            question: ['How much is left?'],
            label: 'Total Remaining Balance',
            questionLeft: 158,
            questionDown: 41,
            valueLeft: 183,
            valueDown: 40,
            labelLeft: 175,
            labelDown: 25
        }
    },
    remainingBalanceFiller: {
        fill: 'white',
        primaryKey: '_totalObligations',
        offset: {
            left: 4 * paddingBetweenRectangles,
            right: 8 * paddingBetweenRectangles,
            top: 4 * paddingBetweenRectangles,
            bottom: 4 * paddingBetweenRectangles
        }
    }
};

export const startOfChartY = 160;
export const rectangleHeight = 50;
export const lineStrokeWidth = 2;
export const lineLength = 127;


export const otherSankeyNodes = [
    {
        name: '_totalBudgetAuthority',
        label: 'Total Budgetary Resources',
        color: '#AAC6E2',
        glossary: `#/${slug}?glossary=budget-authority`,
        textWidth: 140,
        textHeight: 31
    },
    {
        name: '_awardObligations',
        label: 'Award Obligations',
        color: '#558EC6',
        glossary: `#/${slug}?glossary=award-obligations`,
        textWidth: 99,
        textHeight: 31
    },
    {
        name: '_otherObligations',
        label: 'Non-Award Obligations',
        color: '#558EC6',
        glossary: `#/${slug}?glossary=non-award-obligations`,
        textWidth: 123,
        textHeight: 31
    },
    {
        name: '_awardOutlays',
        label: 'Award Outlays',
        color: '#0A2F5A',
        glossary: `#/${slug}?glosary=outlay`,
        textWidth: 79,
        textHeight: 31
    },
    {
        name: '_awardObligationsNotOutlayed',
        label: 'Obligated But Not Yet Outlayed',
        color: '#0A2F5A',
        glossary: `#/${slug}?glosary=outlay`,
        textWidth: 163,
        textHeight: 31,
        whiteRectangle: true
    },
    {
        name: '_nonAwardOutLays',
        label: 'Other Outlays',
        color: '#0A2F5A',
        glossary: `#/${slug}?glosary=outlay`,
        textWidth: 75,
        textHeight: 31
    },
    {
        name: '_nonAwardNotOutlayed',
        label: 'Obligated But Not Yet Outlayed',
        color: '#0A2F5A',
        glossary: `#/${slug}?glosary=outlay`,
        textWidth: 163,
        textHeight: 31,
        whiteRectangle: true
    },
    {
        name: '_remainingBalance',
        label: 'Remainging Balance',
        color: '#558EC6',
        glossary: `#/${slug}?glossary=unobligated-balance`,
        textWidth: 109,
        textHeight: 31,
        whiteRectangle: true
    }
];
// total amount = 3500000
export const dataForLinks = [
    {
        source: 0, // O to total
        target: 5,
        value: 1800000000000
    },
    {
        source: 1, // L to total
        target: 5,
        value: 7400000000
    },
    {
        source: 2, // M to total
        target: 5,
        value: 11100000000
    },
    {
        source: 3, // N to total
        target: 5,
        value: 327700000000
    },
    {
        source: 4, // P to total
        target: 5,
        value: 125100000000
    },
    {
        source: 5, // total to award obligations
        target: 6,
        value: 866700000000
    },
    {
        source: 5, // total to non award obligations
        target: 7,
        value: 96300000000
    },
    {
        source: 6, // award to award outlays
        target: 8,
        value: 413100000000
    },
    {
        source: 6, // award to not yet outlayed
        target: 9,
        value: 453600000000
    },
    {
        source: 7, // non award to non award outlays
        target: 10,
        value: 45900000000
    },
    {
        source: 7, // non award to non award not yet outlayed
        target: 11,
        value: 50400000000
    },
    {
        source: 5, // total to unobligated balance
        target: 12,
        value: 1400000000000
    }
];

export const defCodeColor = '#B699C6';
