/**
 * DrilldownSidebarLevel.jsx
 * Created by Lizzie Salita 11/22/21
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    obligated: PropTypes.string,
    budgetaryResources: PropTypes.string,
    active: PropTypes.bool,
    goBack: PropTypes.func,
    toggle: PropTypes.bool,
    outlay: PropTypes.string
};

const DrilldownSidebar = ({
    label, name, obligated, budgetaryResources, active, goBack, toggle, outlay
}) => (
    <div className={`drilldown-level${active ? ' drilldown-level_active' : ''}`}>
        {goBack ? (
            <button title="Go up a level" className="drilldown-level__back" onClick={goBack}>
                <FontAwesomeIcon icon="chevron-left" />
            </button>) : ''}
        <div className="drilldown-level__wrapper">
            <div className="drilldown-level__label">{label}</div>
            <div className="drilldown-level__content">
                <div className="drilldown-level__trail">
                    <div className="drilldown-level__indicator" />
                    {active ? null : <div className="drilldown-level__line" data-testid="trailLine" />}
                </div>
                <div>
                    <div className="drilldown-level__name">{name}</div>
                    {!toggle &&
                        <div className="drilldown-level__description">
                            <strong>{obligated}</strong> committed of <strong>{budgetaryResources}</strong>  Total Budgetary Resources
                        </div>}
                    {toggle &&
                        <div className="drilldown-level__description">
                            <strong>{outlay}</strong> has been paid out
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
);

DrilldownSidebar.propTypes = propTypes;
export default DrilldownSidebar;
