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

const AgencySection = ({
    section,
    icon,
    children
}) => (
    <SectionTitle
        id={`agency-v2-${section.name}`}
        icon={<FontAwesomeIcon size="2x" icon={icon} />}
        title={section.display}
        isCollapsible
        overLine={section?.overLine}
        description={<span className="usda-section-title__desc">Data Sources</span>}>
        {children}
    </SectionTitle>

);

AgencySection.propTypes = propTypes;

export default AgencySection;
