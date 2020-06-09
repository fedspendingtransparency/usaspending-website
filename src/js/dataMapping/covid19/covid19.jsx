/**
 * covid19
 * Created by Jonathan Hill 06/02/20
 */

import React from 'react';
import { getSocialShareURL } from 'helpers/covid19Helper';
import AwardSpendingOverTime from 'components/covid19/spendingOverTime/AwardSpendingOverTime';

export const slug = 'covid19';

export const getEmailSocialShareData = {
    subject: 'USAspending.gov COVID-19 Response: ',
    body: `View the COVID-19 Response on USAspending.gov: ${getSocialShareURL()}`
};

export const scrollPositionOfSiteHeader = (cookie) => (cookie ? 96 : 187);

export const defCodes = ['L', 'M', 'N', 'O', 'P'];

export const ComingSoon = () => (
    <div className="coming-soon-section">
        <h4>Coming Soon</h4>
        <p>This feature is currently under development.</p>
    </div>
);

export const footerTitle = 'Looking for more insight on COVID-19 relief?';
export const footerDescription = 'for more in-depth analysis on this COVID-19 and more';

const awardAndNonAwardHeaderText = (
    <div className="body__header-text">
        This section covers <strong>Award</strong> and <strong>Non-Award Spending</strong> from FY 2020
    </div>
);

const awardHeaderText = (
    <div className="body__header-text">This section covers <strong>Award Spending</strong> from FY 2020</div>
);

const awardAndNonAwardHeaderTextTT = (
    <div>Content is Coming soon</div>
);

const awardHeaderTextTooltip = (
    <div>Content is Coming soon</div>
);

export const componentByCovid19Section = () => ({
    overview: {
        icon: 'landmark',
        component: <ComingSoon />,
        headerText: awardAndNonAwardHeaderText,
        headerTextTooltip: awardAndNonAwardHeaderTextTT
    },
    total_spending_by_budget_categories: {
        component: <ComingSoon />,
        headerText: awardAndNonAwardHeaderText,
        headerTextTooltipooltip: awardAndNonAwardHeaderTextTT
    },
    award_spending_over_time: {
        icon: 'chart-area',
        component: <AwardSpendingOverTime />,
        headerText: awardHeaderText,
        headerTextTooltip: awardHeaderTextTooltip
    },
    award_spending_by_agency: {
        icon: 'sitemap',
        component: <ComingSoon />,
        headerText: awardHeaderText,
        headerTextTooltip: awardHeaderTextTooltip
    },
    award_spending_recipient: {
        icon: 'building',
        component: <ComingSoon />,
        headerText: awardHeaderText,
        headerTextTooltip: awardHeaderTextTooltip
    },
    award_spending_by_other_dimensions: {
        component: <ComingSoon />,
        headerText: awardHeaderText,
        headerTextTooltip: awardHeaderTextTooltip
    }
});

export const TooltipComponent = () => (
    <div className="covid19-tt">
        <h4 className="tooltip__title">Coming Soon</h4>
        <p className="tooltip__text">The tooltip content for this section is currently under review.</p>
    </div>
);
