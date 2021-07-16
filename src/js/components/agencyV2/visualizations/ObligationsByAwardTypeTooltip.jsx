/**
 * ObligationsByAwardTypeTooltip.jsx
 * Created by Lizzie Salita 7/16/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table } from 'data-transparency-ui';
import { calculatePercentage, formatMoney } from 'helpers/moneyFormatter';

const propTypes = {
    awardTypes: PropTypes.array
};

const columns = [
    {
        title: 'type',
        displayName: 'Award Types'
    },
    {
        title: 'obligations',
        displayName: 'Award Obligations',
        right: true
    },
    {
        title: 'percent',
        displayName: '% of Total',
        right: true
    }
];

export default function ObligationsByAwardTypeTooltip({ awardTypes }) {
    const { _awardObligations } = useSelector((state) => state.agencyV2);
    const rows = awardTypes.map((type) => ([
        (
            <div>
                <svg height="12" width="18">
                    <circle cx="6" cy="6" r="6" fill={type.color} />
                </svg>
                {type.label}
            </div>
        ),
        formatMoney(type.value),
        calculatePercentage(type.value, _awardObligations)
    ]));
    // Add the "Totals" row
    rows.push([
        'Total',
        formatMoney(_awardObligations),
        '100%'
    ]);
    return (
        <Table
            classNames="obligations-by-award-type__table"
            columns={columns}
            rows={rows} />
    );
}

ObligationsByAwardTypeTooltip.propTypes = propTypes;
