
import * as MoneyFormatter from 'helpers/moneyFormatter';

export const subAwardDefaultColumns = [
    {
        header: "Prime Award ID",
        key: "award_id",
        type: "expandableButton",
        className: "",
        element: null
    },
    {
        header: 'Count of Subwards that Match Search Criteria',
        key: 'subaward_count',
        type: "alphaNumeric",
        className: "",
        element: null
    },
    {
        header: 'Obligations that Match Search Criteria',
        key: 'subaward_obligation',
        type: "formatted",
        className: "",
        element: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
    }
];

export const transactionsDefaultColumns = [
    {
        header: "Prime Award ID",
        key: "award_id",
        type: "expandableButton",
        className: "",
        element: null
    },
    {
        header: 'Count of Transactions that Match Search Criteria',
        key: 'transaction_count',
        type: "alphaNumeric",
        className: "",
        element: null
    },
    {
        header: 'Obligations that Match Search Criteria',
        key: 'transaction_obligation',
        type: "formatted",
        className: "",
        element: (info) => MoneyFormatter.formatMoneyWithPrecision(info.getValue(), 2, "--")
    }
];
