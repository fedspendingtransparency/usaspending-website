/**
 * covid19.jsx
 * Created by Jonathan Hill 06/10/20
 */

import React from 'react';
import AwardSpendingAgency from 'components/covid19/awardSpendingAgency/AwardSpendingAgency';
import BudgetCategories from 'components/covid19/budgetCategories/BudgetCategories';
import AwardQuestion from 'components/covid19/AwardQuestions';
import OverviewContainer from 'containers/covid19/OverviewContainer';
import RecipientSection from 'components/covid19/recipient/RecipientSection';
import SpendingByCFDA from 'components/covid19/assistanceListing/SpendingByCFDA';
import { TooltipWrapper } from 'data-transparency-ui';
import {
    AwardSpendingTT,
    TotalSpendingTT
} from 'components/covid19/Covid19Tooltips';

const totalSpendingText = (
    <div className="body__header-text">
      This section covers
        <span>
            <strong> Total Spending</strong>
            <div style={{ float: 'right' }}>
                <TooltipWrapper
                    className="homepage__covid-19-tt"
                    icon="info"
                    tooltipPosition="left"
                    tooltipComponent={<TotalSpendingTT />} />
            </div>
        </span>
    </div>
);

const awardSpendingText = (
    <div className="body__header-text">
      This section covers
        <span>
            <strong> Award Spending</strong>
            <div style={{ float: 'right' }}>
                <TooltipWrapper
                    className="homepage__covid-19-tt"
                    icon="info"
                    tooltipPosition="left"
                    tooltipComponent={<AwardSpendingTT />} />
            </div>
        </span>
    </div>
);

// eslint-disable-next-line import/prefer-default-export
export const componentByCovid19Section = (publicLaw, handleExternalLinkClick) => ({
    overview: {
        icon: 'hand-holding-medical',
        component: <OverviewContainer publicLaw={publicLaw} />,
        headerText: totalSpendingText,
        showInMenu: true,
        showInMainSection: true,
        title: 'Overview'
    },
    total_spending_by_budget_categories: {
        icon: 'cubes',
        component: <BudgetCategories publicLaw={publicLaw} />,
        headerText: totalSpendingText,
        showInMenu: true,
        showInMainSection: true,
        title: 'Total Spending by Budget Category'
    },
    award_question: {
        component: <AwardQuestion publicLaw={publicLaw} />,
        showInMenu: false,
        showInMainSection: true
    },
    award_spending_by_recipient: {
        icon: 'building',
        component: <RecipientSection publicLaw={publicLaw} />,
        headerText: awardSpendingText,
        showInMenu: true,
        showInMainSection: true,
        title: 'Award Spending by Recipient'
    },
    award_spending_by_agency: {
        icon: 'sitemap',
        component: <AwardSpendingAgency publicLaw={publicLaw} />,
        headerText: awardSpendingText,
        showInMenu: true,
        showInMainSection: true,
        title: 'Award Spending by Sub-Agency'
    },
    award_spending_by_assistance_listing: {
        icon: 'plus-circle',
        component: <SpendingByCFDA publicLaw={publicLaw} handleExternalLinkClick={handleExternalLinkClick} />,
        headerText: awardSpendingText,
        showInMenu: true,
        showInMainSection: true,
        title: 'Award Spending by Assistance Listing'
    },
    data_sources_and_methodology: {
        showInMenu: true,
        showInMainSection: false,
        title: 'Data Sources & Methodology'
    },
    other_resources: {
        showInMenu: true,
        showInMainSection: false,
        title: 'Other Resources'
    }
});
