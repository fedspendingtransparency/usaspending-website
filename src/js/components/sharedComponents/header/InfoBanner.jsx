import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    closeBanner: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string,
    icon: PropTypes.string
};

const InfoBanner = (props) => {
    const [closeBanner, setCloseBanner] = useState(false);
    const bannerClosed = () => {
        if (props.closeBanner && typeof props.closeBanner === "function") {
            props.closeBanner("showInfoBanner");
        }
        setCloseBanner(true);
    };

    return (
        <div className="info-banner" style={{ display: `${closeBanner ? 'none' : ''}`, backgroundColor: props.backgroundColor, borderTop: `5px solid ${props.border}` }}>
            <div className="info-banner__content">
                {props.icon}
                <>
                    <div className="info-banner__alert-text">
                        <p className="info-banner__title-text">{props.title}</p>
                        {props.content}
                    </div>
                    <button
                        className="info-banner__close-button"
                        title="Dismiss message"
                        aria-label="Dismiss message"
                        onKeyUp={(e) => ((e.key === 'Enter') ? bannerClosed : '')}
                        onClick={bannerClosed}>
                        <FontAwesomeIcon size="lg" alt="Dismiss message" icon="times" />
                    </button>
                </>
            </div>
        </div>
    );
};

InfoBanner.propTypes = propTypes;
export default InfoBanner;
