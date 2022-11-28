import React from 'react';
import PropTypes from 'prop-types';
import { SectionTitle } from 'data-transparency-ui';

const propTypes = {
    section: PropTypes.shape({
        name: PropTypes.string.isRequired,
        display: PropTypes.string.isRequired,
        showSectionTitle: PropTypes.bool
    }),
    icon: PropTypes.string,
    children: PropTypes.element
};

const InteractiveDataSourcesSection = ({
    section,
    children
}) => (
    <>
        {section.showSectionTitle
            ?
            <SectionTitle
                // isCollapsible // Currently disable for `Scroller`
                id={`interactive-data-sources-${section.name}`}
                title={section.display}>
                {children}
            </SectionTitle>
            :
            <section
                id={`interactive-data-sources-${section.name}`}>
                {children}
            </section>
        }
    </>
);

InteractiveDataSourcesSection.propTypes = propTypes;
export default InteractiveDataSourcesSection;
