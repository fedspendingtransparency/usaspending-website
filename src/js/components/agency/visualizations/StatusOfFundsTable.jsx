import React from 'react';
import { Table } from 'data-transparency-ui';
import PropTypes from 'prop-types';
import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';
import { levels } from "../statusOfFunds/StatusOfFunds";

const propTypes = {
    fy: PropTypes.string,
    results: PropTypes.array,
    level: PropTypes.number.isRequired,
    setDrilldownLevel: PropTypes.func,
    toggle: PropTypes.bool,
    isMobile: PropTypes.bool
};

const StatusOfFundsTable = ({
    results, fy, setDrilldownLevel, level, toggle, isMobile
}) => {
    const fyString = `FY${fy.slice(2)}`;

    const columns = toggle ?
        [
            {
                title: 'subComponent',
                displayName: levels[level]
            },
            {
                title: 'outlays',
                displayName: [`${fyString} Outlays`],
                right: true
            }
        ]
        :
        [
            {
                title: 'subComponent',
                displayName: levels[level]
            },
            {
                title: 'totalBudgetaryResources',
                displayName: isMobile ? `${fyString} Total Budgetary Resources` : [`${fyString} Total Budgetary`, <br />, 'Resources'],
                right: true
            },
            {
                title: 'obligations',
                displayName: `${fyString} Obligations`,
                right: true
            }
        ];

    const rows = results.map((data) => (toggle ?
        [
            (
                <div>
                    {data.name}
                </div>
            ),
            (
                <div>
                    {formatMoneyWithPrecision(data._outlays)}
                </div>
            )
        ]
        :
        [
            (
                <div>
                    {data.name}
                </div>
            ),
            (
                <div>
                    {formatMoneyWithPrecision(data._budgetaryResources)}
                </div>
            ),
            (
                <div>
                    {formatMoneyWithPrecision(data._obligations)}
                </div>
            )
        ]));

    return (
        <Table
            classNames="award-type-tooltip__table"
            columns={columns}
            rows={rows}
            isStacked />
    );
};

StatusOfFundsTable.propTypes = propTypes;
export default StatusOfFundsTable;

