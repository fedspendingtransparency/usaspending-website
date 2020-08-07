/**
 * covid19.js
 * Created by Jonathan Hill 06/02/20
 */

import { getBaseUrlNoHash } from 'helpers/socialShare';

export const slug = 'covid-19';

export const globalCovidBannerCookie = 'usaspending_covid_release';
export const dataDisclaimerBannerCookie = 'usaspending_data_disclaimer';

export const getEmailSocialShareData = {
    subject: 'USAspending.gov COVID-19 Spending',
    body: `View COVID-19 Spending on USAspending.gov: ${getBaseUrlNoHash(slug)}`
};

export const dataDisclaimerHeight = 75;
export const stickyHeaderHeight = 66;
export const globalBannerHeight = 90;
// result of document.querySelector('.site-header').clientHeight + sticky header height when not sticky
export const siteHeaderHeight = 97 + stickyHeaderHeight;

export const defCodes = ['L', 'M', 'N', 'O', 'P'];
export const allDefCAwardTypeCodes = ['02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];

export const amountsHeight = 400;
export const sankeyHeight = 400;
export const amountsPadding = {
    left: 45,
    right: 45
};

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
        fill: '#AAC6E2',
        lineColor: '#AAC6E2',
        offset: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        },
        line: true,
        lineLength: lineLength[0],
        text: {
            question: 'This was the total amount made available.',
            questionLeft: 265,
            questionDown: 40,
            valueLeft: 128,
            valueDown: 25,
            labelLeft: 340,
            labelDown: 25,
            label: 'Total Budgetary Resources:'
        }
    },
    _totalObligations: {
        fill: '#558EC6',
        lineColor: '#558EC6',
        offset: {
            left: 0,
            right: 0,
            top: paddingBetweenRectangles,
            bottom: paddingBetweenRectangles
        },
        line: true,
        lineLength: lineLength[0],
        text: {
            question: 'This amount has been promised to be spent.',
            label: 'Total Obligations:',
            questionLeft: -10,
            questionDown: 15,
            valueLeft: -150,
            valueDown: 35,
            labelLeft: -10,
            labelDown: 35
        }
    },
    _totalOutlays: {
        fill: '#0A2F5A',
        lineColor: '#0A2F5A',
        offset: {
            left: 0,
            right: 0,
            top: 2 * paddingBetweenRectangles,
            bottom: 2 * paddingBetweenRectangles
        },
        line: true,
        lineLength: lineLength[1],
        text: {
            question: 'This amount has been paid out.',
            label: 'Total Outlays:',
            questionLeft: -10,
            questionDown: 20,
            valueLeft: -120,
            valueDown: 25,
            labelLeft: -10,
            labelDown: 25
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
            question: 'This amount has not yet been promised to be spent.',
            label: 'Total Remaining Balance:',
            offset: {
                y: 3
            }
        }
    }
};

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
        label: 'Total Unobligated Balance',
        color: '#558EC6',
        glossary: `#/${slug}?glossary=unobligated-balance`,
        textWidth: 109,
        textHeight: 31,
        whiteRectangle: true
    }
];
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

export const spendingTableSortFields = {
    obligation: 'obligation',
    outlay: 'outlay',
    awardCount: 'award_count',
    name: 'description',
    faceValueOfLoan: 'face_value_of_loan'
};

export const financialAssistanceTabs = [
    {
        internal: 'all',
        label: 'All Assistance Awards'
    },
    {
        internal: 'grants',
        label: 'Grants'
    },
    {
        internal: 'loans',
        label: 'Loans'
    },
    {
        internal: 'direct_payments',
        label: 'Direct Payments'
    },
    {
        internal: 'other',
        label: 'Other Financial Assistance'
    }
];

export const awardTypeTabs = [
    {
        internal: 'all',
        label: 'All Awards'
    },
    {
        internal: 'grants',
        label: 'Grants'
    },
    {
        internal: 'loans',
        label: 'Loans'
    },
    {
        internal: 'direct_payments',
        label: 'Direct Payments'
    },
    {
        internal: 'other',
        label: 'Other Financial Assistance'
    },
    {
        internal: 'contracts',
        label: 'Contracts'
    },
    {
        internal: 'idvs',
        label: 'Contract IDVs'
    }
];

export const covidColor = '#6E338E';
export const covidObligatedColor = '#B699C6';

export const mapFilterSortOrderByValue = {
    states: 0,
    congressionalDistricts: 1,
    counties: 2,
    obligations: 0,
    faceValueOfLoans: 2,
    outlays: 1,
    totalSpending: 0,
    perCapita: 1
};
