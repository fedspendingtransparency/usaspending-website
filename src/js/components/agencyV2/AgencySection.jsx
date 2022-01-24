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
    isLoading: PropTypes.bool,
    dataThroughDate: PropTypes.string
};

const AgencySection = ({
    section,
    icon = "chart-area",
    children,
    isLoading,
    dataThroughDate
}) => (
    <SectionTitle
        id={`agency-v2-${section.name}`}
        icon={<FontAwesomeIcon size="2x" icon={icon} />}
        title={section.display}
        isCollapsible >
        {dataThroughDate ? <div className="section__date-note">Data through {dataThroughDate}</div> : null}
        {isLoading ? <LoadingMessage /> : children}
    </SectionTitle>

);

AgencySection.propTypes = propTypes;
export default AgencySection;
