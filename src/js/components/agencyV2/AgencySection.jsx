import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingMessage, SectionTitle } from 'data-transparency-ui';

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
    children,
    isLoading
}) => (
    <SectionTitle
        id={`agency-v2-${section.name}`}
        icon={<FontAwesomeIcon size="2x" icon={icon} />}
        title={section.display}
        isCollapsible
        overLine={section?.overLine}
        description={<span className="usda-section-title__desc">Data Sources</span>}
        descTooltip={{ component: <TooltipComponent /> }}>
        {isLoading ? <LoadingMessage /> : children}
    </SectionTitle>

);

AgencySection.propTypes = propTypes;

export default AgencySection;
