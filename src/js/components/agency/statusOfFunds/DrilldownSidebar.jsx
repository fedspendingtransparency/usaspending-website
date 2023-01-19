/**
 * DrilldownSidebar.jsx
 * Created by Lizzie Salita 10/29/21
 */

import React, { useEffect } from 'react';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { levels } from './StatusOfFunds';
import DrilldownSidebarLevel from './DrilldownSidebarLevel';

const propTypes = {
    toggle: PropTypes.bool.isRequired,
    level: PropTypes.number.isRequired,
    goBack: PropTypes.func,
    fy: PropTypes.string.isRequired,
    agencyName: PropTypes.string,
    selectedSubcomponent: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        budgetaryResources: PropTypes.string,
        obligations: PropTypes.string
    })
};

const DrilldownSidebar = ({
    toggle, level, goBack, fy, agencyName, selectedLevelDataArray, selectedLevelData
}) => {
    const { agencyBudgetShort, agencyObligatedShort } = useSelector((state) => state.agency.budgetaryResources?.[fy]) || '--';
    const { toptierCode } = useSelector((state) => state.agency.overview) || '--';
    const outlay = useSelector((state) => state.agency.agencyOutlays[toptierCode]) || '--';

    return (
        <>
            <DrilldownSidebarLevel
                active={level === 0}
                name={agencyName}
                label="Parent Agency"
                obligated={agencyObligatedShort}
                budgetaryResources={agencyBudgetShort}
                toggle={toggle}
                outlay={MoneyFormatter.formatMoneyWithUnitsShortLabel(outlay, 2)} />
            {levels.map((dataType, i) => ((i < level) ? (
                <DrilldownSidebarLevel
                    key={dataType}
                    active={level === i + 1}
                    name={selectedLevelData[i]?.name}
                    label={dataType}
                    obligated={MoneyFormatter.formatMoneyWithUnitsShortLabel(selectedLevelData[i]?._obligations, 2)}
                    budgetaryResources={MoneyFormatter.formatMoneyWithUnitsShortLabel(selectedLevelData[i]?._budgetaryResources, 2)}
                    goBack={goBack}
                    toggle={toggle}
                    outlay={MoneyFormatter.formatMoneyWithUnitsShortLabel(selectedLevelData[i]?._outlays, 2)} />
            ) : '')
            )}
        </>
    );
};

DrilldownSidebar.propTypes = propTypes;
export default DrilldownSidebar;
