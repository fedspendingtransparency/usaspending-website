
/**
 * TrainingVideoModal.jsx
 * Created by Nick Torres 12/27/2022
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexGridCol } from "data-transparency-ui";
import { Helmet } from 'react-helmet';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.object,
    duration: PropTypes.string,
    publishedAt: PropTypes.string,
    id: PropTypes.string
};

const TrainingVideoModal = (props) => {
    const [chapterTimestamp, setChapterTimestamp] = useState(0);

    useEffect(() => {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        function onYouTubeIframeAPIReady() {
            console.log('Yay, YT exists!', YT);
        };
    }, []);

    const updatePlayerChapter = (e, time) => {
        setChapterTimestamp(time);
        e.preventDefault();
        // player.playVideo();
        // add code to play the video
    };

    useEffect(() => {
        const body = document.getElementById('video-description');
        console.log(body);
        const chapterEls = body?.getElementsByClassName("videoChapter");

        if (body) {
            for (let i = 0; i < chapterEls?.length; i++) {
                const chapterTime = chapterEls[i].getAttribute('data-time');
                chapterEls[i].addEventListener('click', (e) => updatePlayerChapter(e, chapterTime));
            }
        }

        return () => {
            if (body && chapterEls) {
                for (let i = 0; i < chapterEls?.length; i++) {
                    const chapterTime = chapterEls[i].getAttribute('data-time');
                    chapterEls[i].removeEventListener('click', (e) => updatePlayerChapter(e, chapterTime));
                }
            }
        };
    }, [props.description, updatePlayerChapter]);

    return (
        <>
            <Helmet>

            </Helmet>
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
                            <div id="video-description" className="usa-dt-modal__body-text">
                                {props.description}
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
                            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${props.id}&autoplay=1&t=${chapterTimestamp}s`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        </FlexGridCol>
                    </div>
                </div>
            </Modal>
        </>);
};

TrainingVideoModal.propTypes = propTypes;
export default TrainingVideoModal;
