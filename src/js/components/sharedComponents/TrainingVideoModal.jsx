
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
    thumbnailUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.string,
    publishedAt: PropTypes.string
};

const TrainingVideoModal = (props) => {
    console.debug("working");

    return (
        <Modal
            mounted={props.mounted}
            onExit={props.hideModal}
            titleText="Testing"
            dialogClass="usa-dt-modal"
            verticallyCenter
            escapeExits>
            <div className="usa-dt-modal training-video-modal">
                <div className="usa-dt-modal__header training-video__back" role="button" tabIndex="0" onKeyUp={() => console.debug("fart")} onClick={props.hideModal}>
                    <FontAwesomeIcon icon="chevron-left" className="left-chevron-icon" alt="Back" />
                    <span className="training__back__label">
                    Back
                    </span>
                </div>
                <div className="usa-dt-modal__body">
                    <FlexGridCol
                        className="usa-dt-modal__card"
                        desktopxl={5}
                        desktop={4}
                        tablet={0}
                        mobile={0}>
                        <div className="usa-dt-modal__title">
                            {props.title}
                        </div>
                        <p className="usa-dt-modal__body-text">
                            {props.description}
                        </p>
                        <div className="usa-dt-modal__meta">
                            {props.publishedAt}
                        </div>
                    </FlexGridCol>
                    <FlexGridCol
                        desktopxl={7}
                        desktop={6}
                        mobile={12}
                        tablet={12}
                        className="usa-dt-modal__video">
                        <img className="usa-dt-modal__thumb" src={props.thumbnailUrl} alt="" />
                    </FlexGridCol>
                </div>
            </div>
        </Modal>
    );
};

TrainingVideoModal.propTypes = propTypes;
export default TrainingVideoModal;
