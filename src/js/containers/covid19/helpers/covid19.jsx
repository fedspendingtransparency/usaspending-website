/**
 * covid19.jsx
 * Created by Jonathan Hill 06/10/20
 */

import OverviewContainer from 'containers/covid19/OverviewContainer';
import RecipientContainer from 'containers/covid19/recipient/RecipientContainer';

import React from 'react';
import BudgetCategories from 'components/covid19/budgetCategories/BudgetCategories';
import AwardSpendingOverTime from 'components/covid19/spendingOverTime/AwardSpendingOverTime';
import AwardQuestion from 'components/covid19/AwardQuestions';
import SpendingByCFDA from 'components/covid19/assistanceListing/SpendingByCFDA';

export const TooltipComponent = () => (
    <div className="covid19-tt">
        <h4 className="tooltip__title">Coming Soon</h4>
        <p className="tooltip__text">The tooltip content for this section is currently under review.</p>
    </div>
);

const totalSpendingText = (
    <div className="body__header-text">
      This section covers <strong>Total Spending</strong>
    </div>
);

const awardSpendingText = (
    <div className="body__header-text">
      This section covers <strong>Award Spending</strong>
    </div>
);

const totalSpendingTooltip = (
    <div>Content is Coming soon</div>
);

const awardSpedingTooltip = (
    <div>Content is Coming soon</div>
);

const ComingSoon = () => (
    <div className="coming-soon-section">
        <h3>Coming Soon</h3>
        <p>This feature is currently under development.</p>
    </div>
);

export const componentByCovid19Section = () => ({
    overview: {
        icon: 'hand-holding-medical',
        component: <OverviewContainer />,
        headerText: totalSpendingText,
        headerTextTooltip: totalSpendingTooltip,
        showInMenu: true,
        title: 'Overview'
    },
    total_spending_by_budget_categories: {
        icon: 'cubes',
        component: <BudgetCategories />,
        headerText: totalSpendingText,
        headerTextTooltipooltip: totalSpendingTooltip,
        showInMenu: true,
        title: 'Total Spending by Budget Categories'
    },
    award_question: {
        component: <AwardQuestion />,
        showInMenu: false
    },
    award_spending_by_recipient: {
        icon: 'building',
        component: <RecipientContainer />,
        headerText: awardSpendingText,
        headerTextTooltip: awardSpedingTooltip,
        showInMenu: true,
        title: 'Award Spending by Recipient'
    },
    award_spending_by_agency: {
        icon: 'sitemap',
        component: <ComingSoon />,
        headerText: awardSpendingText,
        headerTextTooltip: awardSpedingTooltip,
        showInMenu: true,
        title: 'Award Spending by Agency'
    },
    award_spending_over_time: {
        icon: 'chart-area',
        component: <AwardSpendingOverTime />,
        headerText: awardSpendingText,
        headerTextTooltip: awardSpedingTooltip,
        showInMenu: true,
        title: 'Award Spending Over Time'
    },
    award_spending_by_assistance_listing: {
        icon: 'plus-circle',
        component: <SpendingByCFDA />,
        headerText: awardSpendingText,
        headerTextTooltip: awardSpedingTooltip,
        showInMenu: true,
        title: 'Award Spending by Assistance Listing (CFDA Program)'
    }
});
