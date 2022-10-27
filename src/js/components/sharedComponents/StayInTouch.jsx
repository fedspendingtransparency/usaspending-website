/**
 * StayInTouch.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import PropTypes from "prop-types";
import Analytics from 'helpers/analytics/Analytics';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const propTypes = {
    pageName: PropTypes.string.isRequired
};

const StayInTouch = (pageName) => {
    const trackLinkSignUp = () => Analytics.event({
        category: pageName,
        action: 'Link',
        label: 'sign-up'
    });
    const trackLinkLearnMore = () => Analytics.event({
        category: pageName,
        action: 'Link',
        label: 'learn-more'
    });

    return (
        <section className="stay-in-touch__section">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <FlexGridRow className="stay-in-touch__container-row" hasGutter gutterSize="lg">
                    <FlexGridCol
                        className="stay-in-touch__title-col"
                        mobile={12}
                        tablet={12}>
                        <FlexGridRow className="stay-in-touch__title-row">
                            <div className="stay-in-touch__icon-container">
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </div>
                            <div className="stay-in-touch__title">
                                Stay in touch
                            </div>
                        </FlexGridRow>
                    </FlexGridCol>
                    <FlexGridCol
                        className="stay-in-touch__second-row-container top"
                        mobile={12}
                        tablet={6}>
                        <div className="stay-in-touch__second-row-title">
                                Get release notes delivered to your inbox
                        </div>
                        <div className="stay-in-touch__second-row-text">
                                Sign up to receive our release notes to keep up with what’s new on USAspending.gov.
                        </div>
                        <div className="stay-in-touch__second-row-link">
                            <a
                                href="mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Yes!%20I'd%20like%20to%20receive%20updates."
                                onClick={trackLinkSignUp}>
                                    Sign Up
                                <FontAwesomeIcon icon={faArrowRight} />
                            </a>
                        </div>
                    </FlexGridCol>
                    <FlexGridCol
                        className="stay-in-touch__second-row-container"
                        mobile={12}
                        tablet={6}>
                        <div className="stay-in-touch__second-row-title">
                                Request a USAspending training session
                        </div>
                        <div className="stay-in-touch__second-row-text">
                                Receive customized training for your organization on how to use our tools and data.
                        </div>
                        <div className="stay-in-touch__second-row-link">
                            <Link className="training__link" to={{ pathname: "/about", search: "section=training" }} onMouseUp={trackLinkLearnMore}>
                                    Learn&nbsp;More
                                <FontAwesomeIcon icon={faArrowRight} />
                            </Link>
                        </div>
                    </FlexGridCol>
                </FlexGridRow>
            </div>
        </section>
    );
};

StayInTouch.propTypes = propTypes;
export default StayInTouch;
