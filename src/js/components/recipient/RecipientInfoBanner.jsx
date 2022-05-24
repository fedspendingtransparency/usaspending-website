import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoBanner from "../sharedComponents/header/InfoBanner";

const RecipientInfoBanner = () => {
    const [showInfoBanner, setShowInfoBanner] = useState(false);

    const cookie = 'usaspending-recipient-uei-warning';

    useEffect(() => {
        if (!Cookies.get(cookie) || Cookies.get(cookie) === 'show') {
            setShowInfoBanner(true);
            Cookies.set(cookie, 'show', { expires: 7 });
        }
    }, []);

    const title = 'NOTICE';
    const content = (
        <p>
            URLs to Recipient Profile pages are being updated as part of a site-wide change based on the new Unique Entity Identifier (UEI) data element. <strong>Please update any saved links to avoid service disruption</strong>.
        </p>
    );
    const icon = (
        <span className="info-banner__exclamation-triangle">
            <FontAwesomeIcon size="lg" icon="exclamation-triangle" />
        </span>
    );

    const closeBanner = () => {
    // set a cookie to hide the banner in the future if banner is closed
        Cookies.set(cookie, 'hide', { expires: 7 });
        setShowInfoBanner(false);
    };

    return <>{showInfoBanner && <InfoBanner closeBanner={closeBanner} title={title} content={content} icon={icon} />}</>;
};

export default RecipientInfoBanner;
