import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { startCase, snakeCase } from 'lodash';
import { TooltipWrapper } from 'data-transparency-ui';

const propTypes = {
    section: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.element
};

const TooltipComponent = () => (
    <div className="agency-v2-tt">
        <h4 className="tooltip__title">Coming Soon</h4>
        <p className="tooltip__text">The tooltip content for this section is currently under review.</p>
    </div>
);

const AgencySection = ({ section, icon = "chart-area", children }) => (
    <section id={`agency-v2-${snakeCase(section)}`} className={`body__section ${snakeCase(section)}`}>
        <div className="body__header">
            <div className="body__header-icon">
                <FontAwesomeIcon size="lg" icon={icon} />
            </div>
            <h3>{startCase(section)}</h3>
            <TooltipWrapper
                className="agency-v2-tt"
                icon="info"
                tooltipComponent={<TooltipComponent />} />
        </div>
        <hr />
        {children}
    </section>
);

AgencySection.propTypes = propTypes;

export default AgencySection;
