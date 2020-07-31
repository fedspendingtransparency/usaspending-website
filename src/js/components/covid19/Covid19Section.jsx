/**
 * Covid19Section.jsx
 * Created by Jonathan Hill 06/02/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from 'lodash';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    section: PropTypes.string,
    icon: PropTypes.string,
    children: PropTypes.element,
    headerText: PropTypes.element,
    title: PropTypes.string
};

// eslint-disable-next-line react/prop-types
const Covid19Section = ({
    section,
    icon = "chart-area",
    headerText,
    children,
    title
}) => (
    <section id={`covid19-${snakeCase(section)}`} className={`body__section ${snakeCase(section)}`}>
        <div className="body__header">
            <div className="body__header-left">
                <div className="body__header-icon">
                    <FontAwesomeIcon size="lg" icon={icon} />
                </div>
                <h2>{title}</h2>
            </div>
            <div className="body__header-right">
                {headerText}
            </div>
        </div>
        {children}
    </section>
);

Covid19Section.propTypes = propTypes;
export default Covid19Section;
