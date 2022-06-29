/**
 * Training.jsx
 * Created by Nick Torres 4/14/22
 **/

import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';
import { Link } from "react-router-dom";
import { faCaretRight, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const propTypes = {
    pageName: PropTypes.string.isRequired
};

const Training = (pageName) => {
    const trackLink = () => Analytics.event({
        category: pageName,
        action: 'Link',
        label: 'learn-more'
    });

    return (
        <div className="training">
            <div className="training__icon">
                <FontAwesomeIcon icon={faLaptop} />
            </div>
            <div className="training__callout">
                     Request training from us!&nbsp;
            </div>
            <div className="training__message">
                Receive customized training&nbsp;
            </div>
            <div className="training__message">
                on how to use USAspending.gov
            </div>
            <Link className="training__link" to={{ pathname: "/about", search: "section=training" }} onMouseUp={trackLink}>
                Learn&nbsp;More
                <FontAwesomeIcon icon={faCaretRight} />
            </Link>
        </div>
    );
};

Training.propTypes = propTypes;
export default Training;
