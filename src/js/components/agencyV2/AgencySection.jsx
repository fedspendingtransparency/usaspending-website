import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SectionTitle } from 'data-transparency-ui';

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
    <>
        <h4 className="tooltip__title">Coming Soon</h4>
        <p className="tooltip__text">The tooltip content for this section is currently under review.</p>
    </>
);

const AgencySection = ({
    section,
    icon = "chart-area",
    children
}) => (
    <SectionTitle
        id={`agency-v2-${section.name}`}
        icon={<FontAwesomeIcon size="2x" icon={icon} />}
        title={section.display}
        isCollapsible
        overLine={section?.overLine}
        description={section?.overLine
            ? <span className="usda-section-title__desc">This section covers <strong>{section.overLine}</strong></span>
            : <span className="usda-section-title__desc">This section covers <strong>Total and Award Spending</strong></span>}
        descTooltip={{ component: <TooltipComponent /> }}
        titleTooltip={{ component: <TooltipComponent /> }}>
        {children}
    </SectionTitle>

);

AgencySection.propTypes = propTypes;

export default AgencySection;
