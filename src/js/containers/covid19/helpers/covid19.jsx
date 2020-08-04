/**
 * covid19.jsx
 * Created by Jonathan Hill 06/10/20
 */

import OverviewContainer from 'containers/covid19/OverviewContainer';
import RecipientContainer from 'containers/covid19/recipient/RecipientContainer';

import React from 'react';
import AwardSpendingAgency from 'components/covid19/awardSpendingAgency/AwardSpendingAgency';
import BudgetCategories from 'components/covid19/budgetCategories/BudgetCategories';
import AwardQuestion from 'components/covid19/AwardQuestions';
import SpendingByCFDA from 'components/covid19/assistanceListing/SpendingByCFDA';

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

export const componentByCovid19Section = () => ({
    overview: {
        icon: 'hand-holding-medical',
        component: <OverviewContainer />,
        headerText: totalSpendingText,
        showInMenu: true,
        showInMainSection: true,
        title: 'Overview'
    },
    total_spending_by_budget_categories: {
        icon: 'cubes',
        component: <BudgetCategories />,
        headerText: totalSpendingText,
        showInMenu: true,
        showInMainSection: true,
        title: 'Total Spending by Budget Category'
    },
    award_question: {
        component: <AwardQuestion />,
        showInMenu: false,
        showInMainSection: true
    },
    award_spending_by_recipient: {
        icon: 'building',
        component: <RecipientContainer />,
        headerText: awardSpendingText,
        showInMenu: true,
        showInMainSection: true,
        title: 'Award Spending by Recipient'
    },
    award_spending_by_agency: {
        icon: 'sitemap',
        component: <AwardSpendingAgency />,
        headerText: awardSpendingText,
        showInMenu: true,
        showInMainSection: true,
        title: 'Award Spending by Agency'
    },
    award_spending_by_assistance_listing: {
        icon: 'plus-circle',
        component: <SpendingByCFDA />,
        headerText: awardSpendingText,
        showInMenu: true,
        showInMainSection: true,
        title: 'Award Spending by CFDA Program (Assistance Listing)'
    },
    data_sources_and_methodology: {
        showInMenu: true,
        showInMainSection: false,
        title: 'Data Sources & Methodology'
    }
});
