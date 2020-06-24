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

export const paddingBetweenRectangles = 4;

export const rectangleMapping = {
    _totalBudgetAuthority: {
        fill: 'black',
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
            valueLeft: 182,
            valueDown: 50,
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
        fill: '#02bfe7', // $color-primary-alt
        offset: {
            left: 2 * paddingBetweenRectangles,
            right: 2 * paddingBetweenRectangles,
            top: 2 * paddingBetweenRectangles,
            bottom: 2 * paddingBetweenRectangles
        },
        primaryKey: '_totalBudgetAuthority'
    },
    _totalObligations: {
        fill: '#046b99', // $color-primary-alt-darkest
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
            questionDown: 26,
            valueLeft: 161,
            valueDown: 40,
            labelLeft: 123,
            labelDown: 25
        }
    },
    _totalOutlays: {
        fill: '#112e51', // $color-primary-darkest
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
            valueLeft: 161,
            valueDown: 50,
            labelLeft: 97,
            labelDown: 25
        }
    },
    _remainingBalance: {
        fill: '#046b99', // $color-primary-alt-darkest
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
            valueLeft: 182,
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

export const startOfChartY = 200;
export const rectangleHeight = 60;
export const lineStrokeWidth = 2;
export const lineLength = 127;


export const mockNodes = [
    {
        name: 'totalBudgetAuthority',
        label: 'Total Budgetary Resources',
        color: '#AAC6E2',
        glossary: `#/${slug}?glossary=budget-authority`,
        textWidth: 140,
        textHeight: 31
    },
    {
        name: 'awardObligations',
        label: 'Award Obligations',
        color: '#558EC6',
        glossary: `#/${slug}?glossary=award-obligations`,
        textWidth: 99,
        textHeight: 31
    },
    {
        name: 'nonAwardObligations',
        label: 'Non-Award Obligations',
        color: '#558EC6',
        glossary: `#/${slug}?glossary=non-award-obligations`,
        textWidth: 123,
        textHeight: 31
    },
    {
        name: 'awardOutlays',
        label: 'Award Outlays',
        color: '#0A2F5A',
        glossary: `#/${slug}?glosary=outlay`,
        textWidth: 79,
        textHeight: 31
    },
    {
        name: 'notYetOutlayed',
        label: 'Obligated But Not Yet Outlayed',
        color: '#0A2F5A',
        glossary: `#/${slug}?glosary=outlay`,
        textWidth: 163,
        textHeight: 31,
        whiteRectangle: true
    },
    {
        name: 'nonAwardOutlays',
        label: 'Other Outlays',
        color: '#0A2F5A',
        glossary: `#/${slug}?glosary=outlay`,
        textWidth: 75,
        textHeight: 31
    },
    {
        name: 'notYetOutlayed',
        label: 'Obligated But Not Yet Outlayed',
        color: '#0A2F5A',
        glossary: `#/${slug}?glosary=outlay`,
        textWidth: 163,
        textHeight: 31,
        whiteRectangle: true
    },
    {
        name: 'unObligatedBalance',
        label: 'Remainging Balance',
        color: '#558EC6',
        glossary: `#/${slug}?glossary=unobligated-balance`,
        textWidth: 109,
        textHeight: 31,
        whiteRectangle: true
    }
];
// total amount = 3500000
export const mockLinks = [
    {
        source: 0, // O to total
        target: 5,
        value: 500000
    },
    {
        source: 1, // L to total
        target: 5,
        value: 600000
    },
    {
        source: 2, // M to total
        target: 5,
        value: 700000
    },
    {
        source: 3, // N to total
        target: 5,
        value: 800000
    },
    {
        source: 4, // P to total
        target: 5,
        value: 900000
    },
    {
        source: 5, // total to award obligations
        target: 6,
        value: 1100000
    },
    {
        source: 5, // total to non award obligations
        target: 7,
        value: 700000
    },
    {
        source: 6, // award to award outlays
        target: 8,
        value: 550000
    },
    {
        source: 6, // award to not yet outlayed
        target: 9,
        value: 550000
    },
    {
        source: 7, // non award to non award outlays
        target: 10,
        value: 350000
    },
    {
        source: 7, // non award to non award not yet outlayed
        target: 11,
        value: 350000
    },
    {
        source: 5, // total to unobligated balance
        target: 12,
        value: 1700000
    }
];

export const defCodeColor = '#B699C6';
