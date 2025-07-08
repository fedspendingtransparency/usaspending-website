/**
 * tanStackTableColumns.jsx
 * Created by JD House July 2, 2025
 */

import React from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';

export const subAwardDefaultColumns = [
    {
        header: () => (
            <div className="table-header__content">
                <div className="table-header__label">
                    Prime Award ID
                </div>
            </div>
        ),
        key: "award_id",
        type: "expandableButton",
        element: null
    },
    {
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">
                    Count of Subwards that Match Search Criteria
                </div>
            </div>
        ),
        key: 'subaward_count',
        type: "alphaNumeric",
        element: null
    },
    {
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">
                    Obligations that Match Search Criteria
                </div>
            </div>
        ),
        key: 'subaward_obligation',
        type: "formatted",
        element: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
    }
];

export const transactionsDefaultColumns = [
    {
        header: () => (
            <div className="table-header__content">
                <div className="table-header__label">
                    Prime Award ID
                </div>
            </div>
        ),
        key: "award_id",
        type: "expandableButton",
        element: null
    },
    {
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">
                    Count of Transactions that Match Search Criteria
                </div>
            </div>
        ),
        key: 'transaction_count',
        type: "alphaNumeric",
        element: null
    },
    {
        header: () => (
            <div className="table-header__content table-header__content_right">
                <div className="table-header__label">
                    Obligations that Match Search Criteria
                </div>
            </div>
        ),
        key: 'transaction_obligation',
        type: "formatted",
        element: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
    }
];
