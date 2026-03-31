import React from "react";
import { TooltipWrapper } from "data-transparency-ui";
import { getHeaderTooltipsByTypeAndCol } from "../tooltips";
import { subawardID, recipientName, actionDateSub, amountSub, descriptionSub } from "../../../components/award/shared/InfoTooltipContent";

export const transactionsTableMapping = {
    idv: [
        {
            columnWidth: 150,
            displayName: 'Modification Number',
            right: false,
            title: 'modification_number',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('idv', 'modificationNumber')} />
        },
        {
            columnWidth: 150,
            displayName: 'Action Date',
            right: false,
            title: 'action_date',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('idv', 'actionDate')} />
        },
        {
            columnWidth: 150,
            displayName: 'Amount',
            right: true,
            title: 'federal_action_obligation',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('idv', 'amount')} />
        },
        {
            columnWidth: 250,
            displayName: 'Action Type',
            right: false,
            title: 'action_type',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('idv', 'actionType')} />
        },
        {
            columnWidth: 300,
            displayName: 'Transaction Description',
            right: false,
            title: 'description',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('idv', 'transactionDescription')} />
        }
    ],
    loan: [
        {
            columnWidth: 150,
            displayName: 'Modification Number',
            right: false,
            title: 'modification_number',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('loan', 'modificationNumber')} />
        },
        {
            columnWidth: 150,
            displayName: 'CFDA Number',
            right: false,
            title: 'cfda_number'
        },
        {
            columnWidth: 150,
            displayName: 'Action Date',
            right: false,
            title: 'action_date',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('loan', 'actionDate')} />
        },
        {
            columnWidth: 150,
            displayName: 'Loan Face Value',
            right: true,
            title: 'face_value_loan_guarantee',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('loan', 'loanFaceValue')} />
        },
        {
            columnWidth: 250,
            displayName: 'Loan Subsidy Cost (Total Obligations To Date)',
            right: true,
            title: 'original_loan_subsidy_cost',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('loan', 'loanSubsidyCost')} />
        },
        {
            columnWidth: 250,
            displayName: 'Action Type',
            right: false,
            title: 'action_type',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('loan', 'actionType')} />
        },
        {
            columnWidth: 300,
            displayName: 'Transaction Description',
            right: false,
            title: 'description',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('loan', 'transactionDescription')} />
        }
    ],
    contract: [
        {
            columnWidth: 150,
            displayName: 'Modification Number',
            right: false,
            title: 'modification_number',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('contract', 'modificationNumber')} />
        },
        {
            columnWidth: 150,
            displayName: 'Action Date',
            right: false,
            title: 'action_date',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('contract', 'actionDate')} />
        },
        {
            columnWidth: 150,
            displayName: 'Amount',
            right: false,
            title: 'federal_action_obligation',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('contract', 'amount')} />
        },
        {
            columnWidth: 250,
            displayName: 'Action Type',
            right: false,
            title: 'action_type',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('contract', 'actionType')} />
        },
        {
            columnWidth: 300,
            displayName: 'Transaction Description',
            right: false,
            title: 'description',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('contract', 'transactionDescription')} />
        }
    ],
    assistance: [
        {
            columnWidth: 150,
            displayName: 'Modification Number',
            right: false,
            title: 'modification_number',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('assistance', 'modificationNumber')} />
        },
        {
            columnWidth: 150,
            displayName: 'Assistance Listing',
            right: false,
            title: 'cfda_number'
        },
        {
            columnWidth: 150,
            displayName: 'Action Date',
            right: false,
            title: 'action_date',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('assistance', 'actionDate')} />
        },
        {
            columnWidth: 150,
            displayName: 'Amount',
            right: true,
            title: 'federal_action_obligation',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('assistance', 'amount')} />
        },
        {
            columnWidth: 250,
            displayName: 'Action Type',
            right: false,
            title: 'action_type',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('assistance', 'actionType')} />
        },
        {
            columnWidth: 300,
            displayName: 'Transaction Description',
            right: false,
            title: 'description',
            icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={getHeaderTooltipsByTypeAndCol('assistance', 'transactionDescription')} />
        }
    ]
};

export const federalAccountsTableMapping = {
    idv: [
        {
            columnWidth: 150,
            displayName: 'Submission Period',
            right: false,
            title: 'reporting_fiscal_date'
        },
        {
            columnWidth: 150,
            displayName: 'Award ID',
            right: false,
            title: 'piid'
        },
        {
            columnWidth: 300,
            displayName: 'Funding Agency',
            right: false,
            title: 'funding_agency_name'
        },
        {
            columnWidth: 300,
            displayName: 'Awarding Agency',
            right: false,
            title: 'awarding_agency_name'
        },
        {
            columnWidth: 100,
            displayName: 'DEFC',
            right: false,
            title: 'disaster_emergency_fund_code'
        },
        {
            columnWidth: 500,
            displayName: 'Federal Account Name',
            right: false,
            title: 'account_title'
        },
        {
            columnWidth: 300,
            displayName: 'Program Activity',
            right: false,
            title: 'program_activity_name'
        },
        {
            columnWidth: 300,
            displayName: 'Object Class',
            right: false,
            title: 'object_class'
        },
        {
            columnWidth: 250,
            displayName: 'Funding Obligated',
            right: true,
            title: 'transaction_obligated_amount'
        },
        {
            columnWidth: 250,
            displayName: 'Outlayed Amount (Beginning of FY to Period End)',
            right: true,
            title: 'gross_outlay_amount'
        }
    ],
    otherFunding: [
        {
            columnWidth: 150,
            displayName: 'Submission Period',
            right: false,
            title: 'reporting_fiscal_date'
        },
        {
            columnWidth: 500,
            displayName: 'Federal Account',
            right: false,
            title: 'account_title'
        },
        {
            columnWidth: 300,
            displayName: 'Funding Agency',
            right: false,
            title: 'funding_agency_name'
        },
        {
            columnWidth: 300,
            displayName: 'Awarding Agency',
            right: false,
            title: 'awarding_agency_name'
        },
        {
            columnWidth: 100,
            displayName: 'DEFC',
            right: false,
            title: 'disaster_emergency_fund_code'
        },
        {
            columnWidth: 300,
            displayName: 'Program Activity',
            right: false,
            title: 'program_activity_name'
        },
        {
            columnWidth: 300,
            displayName: 'Object Class',
            right: false,
            title: 'object_class'
        },
        {
            columnWidth: 250,
            displayName: 'Funding Obligated',
            right: true,
            title: 'transaction_obligated_amount'
        },
        {
            columnWidth: 250,
            displayName: 'Outlayed Amount (Beginning of FY to Period End)',
            right: true,
            title: 'gross_outlay_amount'
        }
    ]
};

export const subawardTableMapping = [
    {
        columnWidth: 150,
        displayName: 'Sub-Award ID',
        right: false,
        title: 'subaward_number',
        icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={subawardID} />
    },
    {
        columnWidth: 300,
        displayName: 'Recipient Name',
        right: false,
        title: 'recipient_name',
        icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={recipientName} />
    },
    {
        columnWidth: 150,
        displayName: 'Action Date',
        right: false,
        title: 'action_date',
        icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={actionDateSub} />
    },
    {
        columnWidth: 150,
        displayName: 'Amount',
        right: true,
        title: 'amount',
        icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={amountSub} />
    },
    {
        columnWidth: 300,
        displayName: 'Sub-Award Description',
        right: false,
        title: 'description',
        icon: <TooltipWrapper tooltipPosition="right" icon="info" className="award-summary-tooltip" tooltipComponent={descriptionSub} />
    }
];
