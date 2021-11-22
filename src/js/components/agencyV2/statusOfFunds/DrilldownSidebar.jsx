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
    level: PropTypes.number,
    setLevel: PropTypes.func,
    fy: PropTypes.string,
    agencyName: PropTypes.string
};

const DrilldownSidebar = ({
    level, setLevel, fy, agencyName
}) => {
    const agencyBudget = useSelector((state) => state.agencyV2.budgetaryResources?.[fy]?.agencyBudget) || '--';
    return (
        <>
            <DrilldownSidebarLevel
                active
                name={agencyName}
                label="Parent Agency"
                obligated="$14.95B"
                budgetaryResources={agencyBudget} />
            <div>
                {level < levels.length - 1 ? (
                    <button onClick={() => setLevel(level + 1)}>
                        Down
                    </button>
                ) : ''}
                {level > 0 ? (
                    <button onClick={() => setLevel(level - 1)}>
                        Up
                    </button>
                ) : ''}
            </div>
        </>
    );
};

DrilldownSidebar.propTypes = propTypes;
export default DrilldownSidebar;
