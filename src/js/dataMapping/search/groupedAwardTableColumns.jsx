/**
 * tanStackTableColumns.jsx
 * Created by JD House July 2, 2025
 */

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { pickLocationFormat } from 'helpers/locationFormatter';
import { twoVariableFormat } from 'helpers/search/table/tableUtilsHelper';
import { convertToTitleCase } from 'helpers/searchHelper';
import ReadMore from 'components/sharedComponents/ReadMore';

export const subAwardDefaultColumns = [
    {
        header: "Prime Award Id",
        key: "award_id",
        type: "expandableButton",
        element: null
    },
    {
        header: "Count of Subwards that Match Search Criteria",
        key: 'subaward_count',
        type: "alphaNumeric",
        element: null
    },
    {
        header: "Obligations that Match Search Criteria",
        key: 'subaward_obligation',
        type: "formatted",
        element: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
    }
];

export const transactionsDefaultColumns = [
    {
        header: "Prime Award Id",
        key: "award_id",
        type: "expandableButton",
        element: null
    },
    {
        header: "Count of Transactions that Match Search Criteria",
        key: 'transaction_count',
        type: "alphaNumeric",
        element: null
    },
    {
        header: "Obligations that Match Search Criteria",
        key: 'transaction_obligation',
        type: "formatted",
        element: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
    }
];

export const expandedTransactionColumns = [
    {
        key: 'Award ID',
        header: () => (
            <div className="table-header__content">
                <div className="table-header__label">Prime Award ID</div>
            </div>
        ),
        type: 'link',
        link: (row) => (`/award/${row.generated_internal_id}`)
    },
    {
        key: 'Mod',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Modification Number</div>
            </div>
        ),
        type: "alphaNumeric",
        element: null
    },
    {
        key: 'Recipient Name',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Recipient Name</div>
            </div>
        ),
        type: "link",
        element: (row) => (`/recipient/${row.recipient_id}`)
    },
    {
        key: 'Transaction Amount',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Obligations</div>
            </div>
        ),
        type: "formatted",
        element: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
    },
    {
        key: 'Action Date',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Action Date</div>
            </div>
        ),
        type: "date",
        element: null
    },
    {
        key: 'Transaction Description',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Transaction Description</div>
            </div>
        ),
        type: 'formatted',
        element: (info) => (
            <ReadMore
                openPrompt="read more"
                closePrompt="read less"
                openIcon=""
                closeIcon=""
                text={info.getValue() || '--'}
                limit={90} />
        )
    },
    {
        key: 'Action Type',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Action Type</div>
            </div>
        ),
        type: "alphaNumeric",
        element: null
    },
    {
        key: 'Award Type',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Award Type</div>
            </div>
        ),
        type: "alphaNumeric",
        element: null
    },
    {
        key: 'Recipient Location',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Recipient Location</div>
            </div>
        ),
        type: "formatted",
        element: (info) => pickLocationFormat(info.getValue())
    },
    {
        key: 'Primary Place of Performance',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Primary Place of Performance</div>
            </div>
        ),
        type: "formatted",
        element: (info) => pickLocationFormat(info.getValue())
    },
    {
        key: 'Awarding Agency',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Awarding Agency</div>
            </div>
        ),
        type: "alphaNumeric",
        element: null
    },
    {
        key: 'Awarding Sub Agency',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Awarding Sub Agency</div>
            </div>
        ),
        type: "alphaNumeric",
        element: null
    },
    {
        key: 'NAICS',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">North American Industry Classification System (NAICS)</div>
            </div>
        ),
        type: "formatted",
        element: (info) => (
            <ReadMore
                openPrompt="read more"
                closePrompt="read less"
                openIcon=""
                closeIcon=""
                text={twoVariableFormat(info.getValue(), 'code', 'description')}
                limit={80} />
        )
    },
    {
        key: 'PSC',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Product and Service Code (PSC)</div>
            </div>
        ),
        type: "formatted",
        element: (info) => (
            <ReadMore
                openPrompt="read more"
                closePrompt="read less"
                openIcon=""
                closeIcon=""
                text={twoVariableFormat(info.getValue(), 'code', 'description')}
                limit={90} />
        )
    }
];

export const expandedSubawardColumns = [
    {
        key: 'Sub-Award ID',
        header: () => (
            <div className="table-header__content">
                <div className="table-header__label">Subaward ID</div>
            </div>
        ),
        type: 'link',
        link: (row) => (`/award/${row.generated_internal_id}`)
    },
    {
        key: 'Sub-Awardee Name',
        header: () => (
            <div className="table-header__content">
                <div className="table-header__label">Subrecipient Name</div>
            </div>
        ),
        type: 'alphaNumeric',
        element: null
    },
    {
        key: 'Sub-Award Amount',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Subaward Obligations</div>
            </div>
        ),
        type: "formatted",
        element: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
    },
    {
        key: 'Sub-Award Date',
        header: () => (
            <div className="table-header__content">
                <div className="table-header__label">Subaward Action Date</div>
            </div>
        ),
        type: 'alphaNumeric',
        element: null
    },
    {
        key: 'Sub-Award Description',
        header: () => (
            <div className="table-header__content">
                <div className="table-header__label">Subaward Description</div>
            </div>
        ),
        type: "formatted",
        element: (info) => (
            <ReadMore
                openPrompt="read more"
                closePrompt="read less"
                openIcon=""
                closeIcon=""
                text={info.getValue() || '--'}
                limit={90} />
        )
    },
    {
        key: 'Sub-Recipient UEI',
        header: () => (
            <div className="table-header__content">
                <div className="table-header__label">Subrecipient UEI</div>
            </div>
        ),
        type: 'alphaNumeric',
        element: null
    },
    {
        key: 'Sub-Recipient Location',
        header: () => (
            <div className="table-header__content">
                <div className="table-header__label">Subrecipient Location</div>
            </div>
        ),
        type: "formatted",
        element: (info) => pickLocationFormat(info.getValue())
    },
    {
        key: 'Sub-Award Primary Place of Performance',
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">Subaward Primary Place of Performance</div>
            </div>
        ),
        type: "formatted",
        element: (info) => pickLocationFormat(info.getValue())
    },
    {
        key: 'Sub-Award Type',
        header: () => (
            <div className="table-header__content">
                <div className="table-header__label">Subaward Type</div>
            </div>
        ),
        type: "formatted",
        element: (info) => convertToTitleCase(info.getValue())
    }
];

