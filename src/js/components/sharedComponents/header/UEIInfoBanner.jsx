import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import InfoBanner from "./InfoBanner";

const propTypes = {
    showModal: PropTypes.func
};

const UEIInfoBanner = (props) => {
    const [showInfoBanner, setShowInfoBanner] = useState(false);
    const cookie = 'usaspending-uei-notification';

    useEffect(() => {
        if (!Cookies.get(cookie) || Cookies.get(cookie) === 'show') {
            setShowInfoBanner(true);
            Cookies.set(cookie, 'show', { expires: 7 });
        }
    }, []);

    const closeBanner = () => {
        // set a cookie to hide the banner in the future if banner is closed
        Cookies.set(cookie, 'hide', { expires: 7 });
        setShowInfoBanner(false);
    };

    const openBannerModal = (e) => {
        e.preventDefault();
        props.showModal(null, 'uei');
    };

    const title = 'New on USAspending: Unique Entity Identifiers';
    const content = (
        <p>
            Beginning in March, UEIs will be added to USAspending displays alongside DUNS numbers.
            <a onClick={openBannerModal} onKeyDown={openBannerModal} role="button" tabIndex={0}> Learn more and find out what changes you’ll see on the site.</a>
        </p>
    );
    const icon = (
        <span className="info-banner__info-circle">
            <FontAwesomeIcon size="lg" icon="info-circle" />
        </span>
    );

    return (
        <>{showInfoBanner && <InfoBanner closeBanner={closeBanner} title={title} content={content} icon={icon} />} </>
    );
};

UEIInfoBanner.propTypes = propTypes;
export default UEIInfoBanner;
