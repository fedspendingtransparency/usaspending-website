/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/**
 * TrainingVideoModal.jsx
 * Created by Nick Torres 12/27/2022
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexGridCol } from "data-transparency-ui";
import parseChapters from "../../helpers/trainingVideoHelper";

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string,
    publishedAt: PropTypes.string,
    id: PropTypes.string
};

const TrainingVideoModal = (props) => {
    const [chapterTimestamp, setChapterTimestamp] = useState(0);
    const [parsedDescription, setParsedDescription] = useState(null);

    const updatePlayerChapter = (e, time) => {
        setChapterTimestamp(time);
        e.preventDefault();
    };

    const chapterKeypressHandler = (e, time) => {
        if (e.keyCode === 13) {
            updatePlayerChapter(e, time);
        }
    };

    useEffect(() => {
        setParsedDescription(parseChapters(props.description, updatePlayerChapter));
    }, [props.description]);

    const youTubeOnReady = (e) => {
        e.target.playVideo();
        const body = document.getElementById('video-description');
        const chapterEls = body?.getElementsByClassName("videoChapter");

        if (body) {
            for (let i = 0; i < chapterEls.length; i++) {
                const chapterTime = chapterEls[i].getAttribute('data-time');
                chapterEls[i].addEventListener('click', (clickEv) => updatePlayerChapter(clickEv, chapterTime));
                chapterEls[i].addEventListener('keyup', (keyEv) => chapterKeypressHandler(keyEv, chapterTime));
            }
        }
    };

    return (
        <Modal
            mounted={props.mounted}
            onExit={props.hideModal}
            titleText="Testing"
            dialogClass="usa-dt-modal"
            verticallyCenter
            escapeExits>
            <div className="usa-dt-modal training-video-modal">
                <div
                    className="usa-dt-modal__header training-video__back"
                    role="button"
                    tabIndex="0"
                    onKeyUp={(e) => {
                        if (e.keyCode === 27) {
                            props.hideModal();
                        }
                    }}
                    onClick={props.hideModal}>
                    <FontAwesomeIcon icon="chevron-left" className="left-chevron-icon" alt="Back" />
                    <span className="training__back__label">
                Back
                    </span>
                </div>
                <div className="usa-dt-modal__body">
                    <FlexGridCol
                        className="usa-dt-modal__card"
                        desktopxl={5}
                        desktop={6}
                        tablet={0}
                        mobile={0}>
                        <div className="usa-dt-modal__title">
                            {props.title}
                        </div>
                        <div tabIndex={0} id="video-description" className="usa-dt-modal__body-text">
                            {parsedDescription}
                        </div>
                        <div className="usa-dt-modal__meta">
                            {props.publishedAt}
                        </div>
                    </FlexGridCol>
                    <FlexGridCol
                        desktopxl={12}
                        desktop={12}
                        mobile={12}
                        tablet={12}
                        className="usa-dt-modal__video">
                        <YouTube
                            videoId={props.id}
                            opts={{
                                height: '400',
                                width: '922',
                                playerVars: {
                                    // https://developers.google.com/youtube/player_parameters
                                    autoplay: 1,
                                    start: chapterTimestamp
                                }
                            }}
                            onReady={youTubeOnReady}
                            title="YouTube video player" />;
                    </FlexGridCol>
                </div>
            </div>
        </Modal>);
};

TrainingVideoModal.propTypes = propTypes;
export default TrainingVideoModal;
