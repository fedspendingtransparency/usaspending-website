import React from 'react';
import { TooltipWrapper } from 'data-transparency-ui';
import TooltipComponent from 'components/award/shared/activity/Tooltip';

const tooltipContent = () => ({
    loans: {
        title: 'Loans',
        sections: [
            {
                title: 'Loan Face Value',
                paragraphs: ['The Face Value of a loan represents how much has actually been lent out to the entity that received the loan dollars. Sometimes loans are financed by a financial institution (with the Federal government merely providing a \'loan guarantee\' to the financial institution and reimbursement in cases where the loan isn\'t paid back), and other times they are financed by the Federal government directly (direct loans). Regardless of how it is financed, a loan\'s face value is not considered Federal spending, because it does not, in itself, represent a long-term cost to the government. The estimated long-term cost to the government of a loan is captured in the subsidy cost field.']
            },
            {
                title: 'Loan Subsidy Cost (Total Obligations To Date)',
                paragraphs: ['The implications of a loan or loan guarantee for the Federal Budget (and thus the loan version of spending/obligations) are known as the loan\'s subsidy cost. Subsidy cost is the calculated net present value of the loan to the government, taking into account the interest rate and the modeled risk of the recipient failing to pay back the loan in part or full; subsidy cost can be positive (indicating that the government is likely to lose money on the loan) or negative (indicating that the government is likely to make money on the loan). Subsidy cost should never be larger in absolute value terms than the face value itself. Administrative costs of running the loan or loan guarantee program itself are excluded from subsidy cost calculations. Note that a loan\'s face value is not considered Federal spending, since it does not in itself represent a long-term cost to the government.']
            }
        ]
    }
});

const TableTabsTooltips = (type) => {
    const tooltipProps = tooltipContent()[type];
    if (!tooltipProps) return null;
    return (
        <TooltipWrapper
            className="award-section-tt"
            icon="info"
            tooltipPosition="left"
            tooltipComponent={<TooltipComponent data={tooltipProps} />} />
    );
};

export default TableTabsTooltips;
