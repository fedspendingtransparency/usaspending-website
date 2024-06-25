import React, { useState, useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cookies from "js-cookie";

const globalInfoBanner = 'usaspending_info-banner';

const propTypes = {
    closeBanner: PropTypes.func,
    title: oneOfType([PropTypes.string, PropTypes.object]),
    content: oneOfType([PropTypes.string, PropTypes.object]),
    icon: oneOfType([PropTypes.string, PropTypes.object])
};

const InfoBanner = (props) => {
    const [closeBanner, setCloseBanner] = useState(true);
    const bannerClosed = () => {
        if (Cookies.get(globalInfoBanner) !== 'hide') {
            Cookies.set(globalInfoBanner, 'hide', { secure: true, httpOnly: true, expires: 7 });
            if (props.closeBanner && typeof props.closeBanner === "function") {
                props.closeBanner("showInfoBanner");
            }
            setCloseBanner(true);
        }
    };

    useEffect(() => {
        if (Cookies.get(globalInfoBanner) !== 'hide' || props.notDismissable) {
            setCloseBanner(false);
        }
    }, []);

    return (
        <div
            className="info-banner"
            style={{
                display: `${closeBanner ? 'none' : ''}`,
                backgroundColor: props.backgroundColor,
                borderTop: `5px solid ${props.borderTopColor}`,
                borderBottom: `1px solid ${props.borderBottomColor}`
            }}>
            <div className="info-banner__content">
                <div className="info-banner__icon">
                    {props.icon}
                </div>
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
                        {!props.notDismissable && <FontAwesomeIcon size="lg" alt="Dismiss message" icon="times" />}
                    </button>
                </>
            </div>
        </div>
    );
};

InfoBanner.propTypes = propTypes;
export default InfoBanner;
