import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TooltipWrapper, LoadingMessage } from 'data-transparency-ui';

const propTypes = {
    section: PropTypes.shape({
        name: PropTypes.string.isRequired,
        display: PropTypes.string.isRequired
    }),
    icon: PropTypes.string,
    children: PropTypes.element,
    isLoading: PropTypes.bool
};

const TooltipComponent = () => (
    <div className="agency-v2-tt">
        <h4 className="tooltip__title">Coming Soon</h4>
        <p className="tooltip__text">The tooltip content for this section is currently under review.</p>
    </div>
);

const AgencySection = ({
    section,
    icon = "chart-area",
    children,
    isLoading = false
}) => (
    <section id={`agency-v2-${section.name}`} className={`body__section ${section.name}`}>
        <div className="body__header">
            <div className="body__header-icon">
                <FontAwesomeIcon size="lg" icon={icon} />
            </div>
            <h3>{section.display}</h3>
            <TooltipWrapper
                className="agency-v2-tt"
                icon="info"
                tooltipComponent={<TooltipComponent />} />
        </div>
        <hr />
        {isLoading && <LoadingMessage />}
        {!isLoading && children}
    </section>
);

AgencySection.propTypes = propTypes;

export default AgencySection;
