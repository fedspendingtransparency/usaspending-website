/**
 * DetailModal.jsx
 * Created by Jonathan Hill 08/31/20
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DetailModalSection from './DetailModalSection';

const propTypes = {
    mounted: PropTypes.bool,
    closeModal: PropTypes.func,
    data: PropTypes.object
};

const DetailModal = ({ mounted, closeModal, data }) => {
    if (!data) return null;
    return (
        <Modal
            mounted={mounted}
            onExit={closeModal}
            titleText={data.name}
            dialogClass="usa-dt-modal"
            verticallyCenter
            escapeExits>
            <div className="usa-dt-modal">
                <div className="usa-dt-modal__header">
                    <h1 className="usa-dt-modal__title">
                        {data.title}
                    </h1>
                    <button
                        className="usa-dt-modal__close-button"
                        onClick={closeModal}
                        title="Close"
                        aria-label="Close">
                        <FontAwesomeIcon icon="times" size="lg" />
                    </button>
                </div>
                <div className="usa-dt-modal__body">
                    {
                        data.sections.map((section) => (
                            <div className="usa-dt-modal__body__column">
                                <DetailModalSection {...section} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </Modal>
    );
};

DetailModal.propTypes = propTypes;
export default DetailModal;
