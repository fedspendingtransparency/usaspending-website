import React from 'react';
import PropTypes from 'prop-types';
import { SectionWrapper } from 'data-transparency-ui';

const propTypes = {
    section: PropTypes.shape({
        section: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        showSectionWrapper: PropTypes.bool
    }),
    icon: PropTypes.string,
    children: PropTypes.element
};

const InteractiveDataSourcesSection = ({
    section,
    children
}) => (
    <>
        {section.showSectionWrapper
            ?
            <SectionWrapper
                // isCollapsible // Currently disable for `Scroller`
                id={`interactive-data-sources-${section.section}`}
                title={section.label}>
                {children}
            </SectionWrapper>
            :
            <section
                id={`interactive-data-sources-${section.section}`}>
                {children}
            </section>
        }
    </>
);

InteractiveDataSourcesSection.propTypes = propTypes;
export default InteractiveDataSourcesSection;
