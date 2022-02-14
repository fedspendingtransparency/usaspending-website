import React from 'react';
import PropTypes from "prop-types";
import InfoBanner from "./InfoBanner";
import Cookies from "js-cookie";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const propTypes = {
    closeBanner: PropTypes.func,
    triggerModal: PropTypes.func,
};

const UEIInfoBanner = (props) => {
    const title = 'New on USAspending: Unique Entity Identifiers';
    const content = (
        <p>
            Beginning in March, UEIs will be added to USAspending displays alongside DUNS numbers.
            <a onClick={props.triggerModal} onKeyDown={props.triggerModal} role="button" tabIndex={0}> Learn more and find out what changes you’ll see on the site.</a>
        </p>
    );
    const icon = (
        <span className="info-banner__info-circle">
            <FontAwesomeIcon size="lg" icon="info-circle" />
        </span>
    );

    return (
        <InfoBanner {...props} title={title} content={content} icon={icon} />
    );
};

UEIInfoBanner.propTypes = propTypes;
export default UEIInfoBanner;
