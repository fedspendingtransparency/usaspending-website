/**
 * ObligationsByAwardTypeTooltip.jsx
 * Created by Lizzie Salita 7/16/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'data-transparency-ui';

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
    const rows = awardTypes.map((type) => ([
        (
            <div>
                <svg height="12" width="18">
                    <circle cx="6" cy="6" r="6" fill={type.color} />
                </svg>
                {type.label}
            </div>
        ),
        type.value, // TODO - format $ amount
        '50%' // TODO - calculate percentage
    ]));
    // TODO - add "Totals" row
    return (
        <Table
            classNames="obligations-by-award-type__table"
            columns={columns}
            rows={rows} />
    );
}

ObligationsByAwardTypeTooltip.propTypes = propTypes;
