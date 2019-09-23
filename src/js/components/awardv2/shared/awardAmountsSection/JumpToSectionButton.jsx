import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    onClick: PropTypes.func,
    linkText: PropTypes.string,
    icon: PropTypes.string
};

const JumpToSectionButton = ({ onClick, linkText, icon }) => (
    <button
        onClick={onClick}
        className="award-viz__button">
        <div className="award-viz__link-icon">
            <FontAwesomeIcon icon={icon} />
        </div>
        <div className="award-viz__link-text">
            {linkText}
        </div>
    </button>
);

JumpToSectionButton.propTypes = propTypes;

export default JumpToSectionButton;
