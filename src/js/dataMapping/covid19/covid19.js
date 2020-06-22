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
