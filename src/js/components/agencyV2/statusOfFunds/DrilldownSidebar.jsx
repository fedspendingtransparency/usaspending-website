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
    const { agencyBudgetShort, agencyObligatedShort } = useSelector((state) => state.agencyV2.budgetaryResources?.[fy]) || '--';
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
                    obligated={selectedSubcomponent?.obligations}
                    budgetaryResources={selectedSubcomponent?.budgetaryResources}
                    goBack={goBack} />
            ) : '')
            )}
            <div>
                {level < levels.length - 1 ? (
                    <button onClick={() => setLevel(level + 1)}>
                        Down
                    </button>
                ) : ''}
                {level > 0 ? (
                    <button onClick={goBack}>
                        Up
                    </button>
                ) : ''}
            </div>
        </>
    );
};

DrilldownSidebar.propTypes = propTypes;
export default DrilldownSidebar;
