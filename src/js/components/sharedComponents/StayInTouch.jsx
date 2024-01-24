/**
 * StayInTouch.jsx
 * Created by Brian Petway 08/22/22
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'redux/actions/modal/modalActions';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import PropTypes from "prop-types";
import Analytics from 'helpers/analytics/Analytics';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Button from './buttons/Button';

const propTypes = {
    pageName: PropTypes.string.isRequired
};

const StayInTouch = (pageName) => {
    const dispatch = useDispatch();

    const trackLinkSignUp = () => Analytics.event({
        event: 'stay-in-touch',
        category: pageName,
        action: 'Link',
        label: 'sign-up'
    });
    const trackLinkLearnMore = () => Analytics.event({
        event: 'stay-in-touch',
        category: pageName,
        action: 'Link',
        label: 'learn-more'
    });
    const trackLinkSurvey = () => Analytics.event({
        event: 'stay-in-touch',
        category: pageName,
        action: 'Survey',
        label: 'survey'
    });

    const handleSignUp = () => {
        trackLinkSignUp();
        window.location.href = "mailto:join-usaspending@lists.fiscal.treasury.gov?subject=Yes!%20I'd%20like%20to%20receive%20updates.";
    };
    const handleLearnMore = () => {
        trackLinkLearnMore();
        window.open("/training-videos", "_self");
    };
    const handleSurveyClick = () => {
        trackLinkSurvey();
        dispatch(showModal("https://forms.office.com/g/neemMd2J4a"));
    };

    return (
        <section className="stay-in-touch__section">
            <FlexGridRow className="stay-in-touch__container-row" hasGutter gutterSize="lg">
                <FlexGridCol
                    className="stay-in-touch__title-col"
                    mobile={12}
                    tablet={12}
                    desktop={3}>
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
                    className="stay-in-touch__second-row-container"
                    mobile={12}
                    tablet={12}
                    desktop={3}>
                    <div className="stay-in-touch__second-row-title">
                        Share your story
                    </div>
                    <div className="stay-in-touch__second-row-text">
                        Love USAspending.gov? Join the "Your Data, Your Story" campaign to share how you use the data!
                    </div>
                    <div className="stay-in-touch__second-row-link">
                        <Button
                            copy="Share Now"
                            buttonTitle="Share Now"
                            buttonSize="md"
                            onClick={handleSurveyClick}
                            buttonType="text"
                            backgroundColor="light"
                            imageAlignment="right"
                            textAlignment="left"
                            image={<FontAwesomeIcon icon={faArrowRight} style={{ height: '16px', width: '14px' }} />} />
                    </div>
                </FlexGridCol>
                <FlexGridCol
                    className="stay-in-touch__second-row-container"
                    mobile={12}
                    tablet={12}
                    desktop={3}>
                    <div className="stay-in-touch__second-row-title">
                        Learn how to use USAspending
                    </div>
                    <div className="stay-in-touch__second-row-text">
                        Access specialized training videos on how to use our tools and data.
                    </div>
                    <div className="stay-in-touch__second-row-link">
                        <Button
                            copy="Learn More"
                            onClick={handleLearnMore}
                            buttonTitle="Learn More"
                            buttonSize="md"
                            buttonType="text"
                            backgroundColor="light"
                            textAlignment="left"
                            imageAlignment="right"
                            image={<FontAwesomeIcon icon={faArrowRight} style={{ height: '16px', width: '14px' }} />} />
                    </div>
                </FlexGridCol>
                <FlexGridCol
                    className="stay-in-touch__second-row-container"
                    mobile={12}
                    tablet={12}
                    desktop={3}>
                    <div className="stay-in-touch__second-row-title">
                        Sign up for release notes
                    </div>
                    <div className="stay-in-touch__second-row-text">
                        Get release notes to your inbox to keep up with what's new on USAspending.gov.
                    </div>
                    <div className="stay-in-touch__second-row-link">
                        <Button
                            copy="Sign Up"
                            buttonTitle="Sign Up"
                            buttonSize="md"
                            onClick={handleSignUp}
                            buttonType="text"
                            backgroundColor="light"
                            imageAlignment="right"
                            textAlignment="left"
                            image={<FontAwesomeIcon icon={faArrowRight} style={{ height: '16px', width: '14px' }} />} />
                    </div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

StayInTouch.propTypes = propTypes;
export default StayInTouch;
