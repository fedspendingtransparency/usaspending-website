/**
 * DrilldownSidebar.jsx
 * Created by Lizzie Salita 11/22/21
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    obligated: PropTypes.string,
    budgetaryResources: PropTypes.string,
    active: PropTypes.bool
};

const DrilldownSidebar = ({
    label, name, obligated, budgetaryResources, active
}) => (
    <div className="drilldown-level">
        <div className="drilldown-level__label">{label}</div>
        <div className="drilldown-level__content">
            <div className="drilldown-level__trail">
                <div className={`drilldown-level__indicator${active ? ' drilldown-level__indicator_active' : ''}`} />
                {active ? null : <div className="drilldown-level__line" />}
            </div>
            <div>
                <div className="drilldown-level__name">{name}</div>
                <div className="drilldown-level__description">
                    <strong>{obligated}</strong> spent of <strong>{budgetaryResources}</strong>  Total Budgetary Resources
                </div>
            </div>
        </div>
    </div>
);

DrilldownSidebar.propTypes = propTypes;
export default DrilldownSidebar;
