import React, { useState } from 'react';
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoBanner from "../sharedComponents/header/InfoBanner";
import PropTypes from "prop-types";

const propTypes = {
    closeBanner: PropTypes.func
};

const RecipientInfoBanner = (props) => {
    const [showBanner, setShowBanner] = useState(true);

    const cookie = 'recipient-uei-warning';

    Cookies.set(cookie, 'showUEIBanner');

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
        setShowBanner(false);
    };

    return <>{showBanner && <InfoBanner {...props} title={title} content={content} icon={icon} closeBanner={closeBanner} />}</>;
};

RecipientInfoBanner.propTypes = propTypes;
export default RecipientInfoBanner;
