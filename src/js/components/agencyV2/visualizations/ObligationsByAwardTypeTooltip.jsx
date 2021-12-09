/**
 * ObligationsByAwardTypeTooltip.jsx
 * Created by Lizzie Salita 7/16/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Table } from 'data-transparency-ui';
import { calculatePercentage, formatMoney, formatMoneyWithUnitsShortLabel } from 'helpers/moneyFormatter';

const propTypes = {
    awardTypes: PropTypes.array,
    fiscalYear: PropTypes.number,
    activeType: PropTypes.string,
    category: PropTypes.string
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


const ObligationsByAwardTypeTooltip = ({ awardTypes, fiscalYear, activeType, category }) => {
    const { _awardObligations } = useSelector((state) => state.agencyV2);
    const awardTypesByCategory = awardTypes.filter(item => item.type === category);
    const totalByCategory = awardTypesByCategory.reduce((acc, item) =>  acc + item.value, 0);

    const titles = {
        'contracts': 'Total Contract Obligations',
        'financial': 'Total Financial Assistance Obligations'
    }

    const rows = awardTypesByCategory.map((type) => {
        const activeClass = `award-type-tooltip__table-data${type.label === activeType ? ' award-type-tooltip__table-data_active' : ''}`;
        return [
            (
                <div className={activeClass}>
                    <svg height="12" width="18">
                        <circle cx="6" cy="6" r="6" fill={type.color}/>
                    </svg>
                    {type.label}
                </div>
            ),
            (
                <div className={activeClass}>
                    {formatMoney(type.value)}
                </div>
            ),
            (
                <div className={activeClass}>
                    {type.value >= 0 ? calculatePercentage(type.value, _awardObligations, '--', 0) : '--'}
                </div>
            )
        ];
    });

    // Add the "Totals" row
    rows.push([
        'Total',
        formatMoney(_awardObligations),
        '100%'
    ]);

    return (
        <div className="award-type-tooltip">
            <div className="tooltip__title">
                FY {fiscalYear} {titles[category]}: {formatMoneyWithUnitsShortLabel(totalByCategory)}
            </div>
            <div className="tooltip__text">
                <Table
                    classNames="award-type-tooltip__table"
                    columns={columns}
                    rows={rows} />
            </div>
        </div>
    );
};

ObligationsByAwardTypeTooltip.propTypes = propTypes;
export default ObligationsByAwardTypeTooltip;
