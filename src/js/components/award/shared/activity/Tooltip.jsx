/**
 * Tooltip.jsx
 * Created By Jonathan Hill 04/29/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        sections: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            paragraphs: PropTypes.arrayOf(PropTypes.string)
        }))
    })
};

const Tooltip = ({ data }) => {
    const createSections = () => {
        if (data.sections) {
            return data.sections.map((section) => (
                <div key={uniqueId('section-')} className="tooltip__text">
                    {section.title && <strong>{section.title}</strong>}
                    {section.paragraphs && section.paragraphs.map((body) => (
                        <p key={uniqueId('paragraph-')} className="tooltip__text-section">{body}</p>
                    ))}
                </div>
            ));
        }
        return null;
    };

    return (
        <div className="tooltip">
            {data.title &&
            <div className="tooltip__title">
                {data.title}
            </div>}
            <div className="tooltip-body">
                {createSections()}
            </div>
        </div>
    );
};

Tooltip.propTypes = propTypes;
export default Tooltip;
