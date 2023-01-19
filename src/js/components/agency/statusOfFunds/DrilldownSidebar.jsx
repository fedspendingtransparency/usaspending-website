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
    toggle, level, goBack, fy, agencyName, selectedSubcomponent, selectedSubcomponentArray
}) => {
    const { agencyBudgetShort, agencyObligatedShort } = useSelector((state) => state.agency.budgetaryResources?.[fy]) || '--';
    const { toptierCode } = useSelector((state) => state.agency.overview) || '--';
    const outlay = useSelector((state) => state.agency.agencyOutlays[toptierCode]) || '--';


    useEffect(() => {
        console.log("on initial load");
        console.log(level)
        console.log(selectedSubcomponent)
        console.log(selectedSubcomponentArray)

        // if (level === 0) {
        //     selectedSubcomponentArray.push({
        //         name: agencyName,
        //         obligated: agencyObligatedShort,
        //         bugetaryResources: agencyBudgetShort,
        //         outlay: MoneyFormatter.formatMoneyWithUnitsShortLabel(outlay, 2)
        //     });
        // }
        //
        // if (level > 0) {
        //     selectedSubcomponentArray.push({
        //         name: selectedSubcomponent.name,
        //         obligated: selectedSubcomponent._obligations,
        //         bugetaryResources: selectedSubcomponent._budgetaryResources,
        //         outlay: selectedSubcomponent._outlays
        //     });
        // }
        //
        // console.log(selectedSubcomponentArray)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [level]);

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
                    name={selectedSubcomponent?.name}
                    label={dataType}
                    obligated={selectedSubcomponent?._obligations}
                    budgetaryResources={selectedSubcomponent?._budgetaryResources}
                    goBack={goBack}
                    toggle={toggle}
                    outlay={selectedSubcomponent?._outlays} />
            ) : '')
            )}
        </>
    );
};

DrilldownSidebar.propTypes = propTypes;
export default DrilldownSidebar;
