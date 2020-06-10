/**
 * covid19.jsx
 * Created by Jonathan Hill 06/10/20
 */

import React from 'react';

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
        <h4>Coming Soon</h4>
        <p>This feature is currently under development.</p>
    </div>
);

export const componentByCovid19Section = () => ({
    overview: {
        icon: 'hand-holding-medical',
        component: <ComingSoon />,
        headerText: totalSpendingText,
        headerTextTooltip: totalSpendingTooltip
    },
    total_spending_by_budget_categories: {
        icon: 'cubes',
        component: <ComingSoon />,
        headerText: totalSpendingText,
        headerTextTooltipooltip: totalSpendingTooltip
    },
    award_spending_recipient: {
        icon: 'building',
        component: <ComingSoon />,
        headerText: awardSpendingText,
        headerTextTooltip: awardSpedingTooltip
    },
    award_spending_by_agency: {
        icon: 'sitemap',
        component: <ComingSoon />,
        headerText: awardSpendingText,
        headerTextTooltip: awardSpedingTooltip
    },
    award_spending_over_time: {
        icon: 'chart-area',
        component: <ComingSoon />,
        headerText: awardSpendingText,
        headerTextTooltip: awardSpedingTooltip
    },
    award_spending_by_assistance_living: {
        icon: 'plus-circle',
        component: <ComingSoon />,
        headerText: awardSpendingText,
        headerTextTooltip: awardSpedingTooltip
    }
});
