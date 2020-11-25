/**
 * CellWithModal.jsx
 * Created by Lizzie Salita 11/23/20
 */

import React from 'react';
import PropTypes, { oneOfType, oneOf } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const propTypes = {
    data: oneOfType([PropTypes.string, PropTypes.object]),
    openModal: PropTypes.func.isRequired,
    modalType: oneOf(['publicationDates', 'missingAccountBalance']).isRequired,
    agencyName: PropTypes.string
};

const CellWithModal = ({
    data, openModal, modalType, agencyName
}) => {
    const modalClick = () => openModal(modalType, agencyName);
    return (
        <div className="modal-cell">
            {data}
            <button className="modal-cell__button" onClick={modalClick} title="Open modal">
                <FontAwesomeIcon icon="expand-alt" />
            </button>
        </div>
    );
};

CellWithModal.propTypes = propTypes;
export default CellWithModal;
