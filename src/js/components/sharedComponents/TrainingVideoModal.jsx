/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/**
 * TrainingVideoModal.jsx
 * Created by Nick Torres 12/27/2022
 */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FlexGridCol } from "data-transparency-ui";

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.object,
    duration: PropTypes.string,
    publishedAt: PropTypes.string,
    id: PropTypes.string
};

const TrainingVideoModal = (props) => (
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
                    <p tabIndex="0" className="usa-dt-modal__body-text">
                        {props.description}
                    </p>
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
                    <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${props.id}&autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </FlexGridCol>
            </div>
        </div>
    </Modal>
);

TrainingVideoModal.propTypes = propTypes;
export default TrainingVideoModal;
