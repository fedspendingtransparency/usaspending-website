/**
 * DrilldownSidebar.jsx
 * Created by Lizzie Salita 10/29/21
 */

import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { levels } from './StatusOfFunds';
import DrilldownSidebarLevel from './DrilldownSidebarLevel';

const propTypes = {
    level: PropTypes.number.isRequired,
    setLevel: PropTypes.func,
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
    level, setLevel, fy, agencyName, selectedSubcomponent
}) => {
    const { agencyBudgetShort, agencyObligatedShort } = useSelector((state) => state.agency.budgetaryResources?.[fy]) || '--';
    const goBack = () => setLevel(level - 1);
    return (
        <>
            <DrilldownSidebarLevel
                active={level === 0}
                name={agencyName}
                label="Parent Agency"
                obligated={agencyObligatedShort}
                budgetaryResources={agencyBudgetShort} />
            {levels.map((dataType, i) => ((i < level) ? (
                <DrilldownSidebarLevel
                    key={dataType}
                    active={level === i + 1}
                    name={selectedSubcomponent?.name}
                    label={dataType}
                    obligated={selectedSubcomponent?._obligations}
                    budgetaryResources={selectedSubcomponent?._budgetaryResources}
                    goBack={goBack} />
            ) : '')
            )}
        </>
    );
};

DrilldownSidebar.propTypes = propTypes;
export default DrilldownSidebar;
