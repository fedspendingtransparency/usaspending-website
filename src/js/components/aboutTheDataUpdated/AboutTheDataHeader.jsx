import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    children: PropTypes.element,
    closeAboutTheData: PropTypes.func
};

const AboutTheDataHeader = (props) => {
    const closeButtonRef = useRef(null);
    useEffect(() => {
        if (closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, []);

    return (
        <div className="usa-atd-header">
            <div role="navigation" aria-label="About The Data navigation">
                <button
                    className="close-button"
                    id="atd-close-button"
                    aria-label="Close About The Data"
                    title="Close About The Data"
                    onClick={props.closeAboutTheData}
                    ref={closeButtonRef}>
                    <Icons.Close alt="Close About The Data" />
                </button>
            </div>
            <h1 tabIndex={-1} className="usa-atd-header__title">About The Data</h1>
        </div>
    );
};

AboutTheDataHeader.propTypes = propTypes;
export default AboutTheDataHeader;
