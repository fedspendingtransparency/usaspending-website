/**
 * Covid19Section.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SectionWrapper } from 'data-transparency-ui';

const propTypes = {
    section: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.element,
    headerText: PropTypes.element,
    title: PropTypes.string,
    tooltip: PropTypes.element,
    tooltipProps: PropTypes.object
};

// eslint-disable-next-line react/prop-types
const Covid19Section = ({
    section,
    icon,
    headerText,
    children,
    title,
    tooltip = null,
    tooltipProps
}) => {
    if (section === 'award_question') {
        return (
            <section
                id={`covid19-${snakeCase(section)}`}
                className={`body__section ${snakeCase(section)}`}>
                {children}
            </section>
        );
    }
    return (
        <SectionWrapper
            id={`covid19-${snakeCase(section)}`}
            classNames={`body__section ${snakeCase(section)}`}
            icon={icon ? <FontAwesomeIcon size="2x" icon={icon} /> : null}
            title={title}
            titleTooltip={{ component: tooltip, props: tooltipProps } || null}
            overLine={section?.overLine}
            description={headerText}>
            {children}
        </SectionWrapper>
    );
};

Covid19Section.propTypes = propTypes;
export default Covid19Section;
