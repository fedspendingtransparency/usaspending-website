import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    children: PropTypes.element
};

const AboutTheDataHeader = (props) => (
    <div className="usa-atd-header">
        <button
            className="close-button"
            id="atd-close-button"
            aria-label="Close About The Data"
            title="Close About The Data"
            onClick={props.closeAboutTheData}>
            <Icons.Close alt="Close About The Data" />
        </button>
        <h1 className="usa-atd-header__title">About The Data</h1>
    </div>);

AboutTheDataHeader.propTypes = propTypes;
export default AboutTheDataHeader;
