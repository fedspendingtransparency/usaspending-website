import React, { useEffect, useState } from 'react';
import { Table } from 'data-transparency-ui';
import PropTypes from 'prop-types';
import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';

const propTypes = {
    fy: PropTypes.string,
    results: PropTypes.array,
    level: PropTypes.number.isRequired,
    setDrilldownLevel: PropTypes.func,
    toggle: PropTypes.bool,
    isMobile: PropTypes.bool,
    maxLevel: PropTypes.number,
    dropdownSelection: PropTypes.string
};

const StatusOfFundsTable = ({
    results, fy, setDrilldownLevel, level, toggle, isMobile, maxLevel, dropdownSelection
}) => {
    const [atMaxLevel, setAtMaxLevel] = useState(false);
    const fyString = `FY${fy.slice(2)}`;

    // this table now gets its own array for these labels, because of the differences in
    // levels 4 and 5 between chart and table
    const levels = [
        'Sub-Component',
        'Federal Account',
        'Treasury Account Symbol',
        `${dropdownSelection}`,
        `${dropdownSelection === 'Program Activity' ? 'Object Class' : 'Program Activity'}`
    ];

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
        [data.name,
            formatMoneyWithPrecision(data._outlays)]
        :
        [data.name,
            formatMoneyWithPrecision(data._budgetaryResources),
            formatMoneyWithPrecision(data._obligations)
        ]));

    const onClickHandler = (item) => {
        const itemName = item[0] || '';
        const data = results.find(({ name }) => name === itemName);
        if (level < maxLevel) {
            setDrilldownLevel(level + 1, data);
        }
    };

    useEffect(() => {
        setAtMaxLevel(level === maxLevel);
    }, [level, maxLevel]);

    return (
        <Table
            classNames="award-type-tooltip__table"
            columns={columns}
            rows={rows}
            onClickHandler={onClickHandler}
            isMobile={isMobile}
            atMaxLevel={atMaxLevel}
            isStacked />
    );
};

StatusOfFundsTable.propTypes = propTypes;
export default StatusOfFundsTable;

