import React from 'react';
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoBanner from "../sharedComponents/header/InfoBanner";

const RecipientInfoBanner = (props) => {
    const title = 'NOTICE';
    const content = (
        <p>
            URLs to Recipient Profile pages are being updated as part of a site-wide change based on the new Unique Entity Identifier (UEI) data element. Please update any saved links to avoid service disruption.
        </p>
    );
    const icon = (
        <span className="modal-disclaimer__icon">
            <FontAwesomeIcon size="lg" icon="exclamation-triangle" />
        </span>
    );

    const closeBanner = (bannerType) => {
        // set a cookie to hide the banner in the future if banner is closed
        Cookies.set(cookie, 'hide', { expires: 7 });
        this.setState({
            [bannerType]: false
        });
    };

    return <InfoBanner {...props} title={title} content={content} icon={icon} closeBanner={closeBanner} />;
};

export default RecipientInfoBanner;
