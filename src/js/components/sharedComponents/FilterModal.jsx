/**
 * FilterModal.jsx
 * Created by Nick Torres 3/6/2023
 */

import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-aria-modal';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../sharedComponents/buttons/Button";
import { hideModal } from "../../redux/actions/modal/modalActions";

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func
};

const FilterModal = (props) => {
    const dispatch = useDispatch();
    return (
        <Modal
            mounted={props.mounted}
            onExit={props.hideModal}
            titleText="Filter Modal"
            dialogClass="usa-dt-modal"
            verticallyCenter>
            <div className="filter-modal" >
                <div className="filter-modal__header">
                    <div className="filter-modal__header-text">
                        Learn how active filters work
                    </div>
                    <div className="filter-modal__header-close">
                        <Button
                            additionalClassnames="usa-dt-modal__close-button"
                            onClick={(e) => {
                                e.persist();
                                dispatch(hideModal());
                            }}
                            onKeyUp={(e) => {
                                e.persist();
                                if (e.key === 'Enter') {
                                    dispatch(hideModal());
                                }
                            }}
                            copy=""
                            buttonTitle="close"
                            buttonSize="lg"
                            buttonType="icon"
                            backgroundColor="dark"
                            image={<FontAwesomeIcon icon="times" />} />
                    </div>
                </div>
                <div className="filter-modal__body">
                    <div className="filter-modal__top-description">
                        Active filters from within the same filter category function as an OR, and active filters across categories function as an AND. There are also some filters which search to see if the selected value is included within an award summary using INCLUDES or IN operators.
                    </div>
                    <div className="filter-modal__example">
                        <div className="filter-modal__title">
                            Example 1: An AND operator is used across filter categories
                        </div>
                        <div className="filter-modal__image">
                            <img
                                role="presentation"
                                src="../../../../img/FY21_WOB.png"
                                alt="" />
                        </div>
                        <div className="filter-modal__description">
                            If the selected Time Period is "FY 2021" and the selected Recipient Type is "All Women Owned Business," the resulting awards will include all awards with any activity in Fiscal Year 2021 AND were given to a Women Owned Business.
                        </div>
                    </div>
                    <div className="filter-modal__example">
                        <div className="filter-modal__title">
                            Example 2: An OR operator is used for filters within the same category
                        </div>
                        <div className="filter-modal__image">
                            <img
                                role="presentation"
                                src="../../../../img/FY21_WOB_VOB.png"
                                alt="" />
                        </div>
                        <div className="filter-modal__description">
                            If the selected Time Period is "Fy 2021" and the selected Recipient Types are "All Women Owned Business" and "All Veteran Owned Business," the resulting awards include all awards with any activity in Fiscal Year 2021 AND were also given to a Women Owned Business OR a Veteran Owned Business.
                        </div>
                    </div>
                    <div className="filter-modal__example">
                        <div className="filter-modal__title">
                            Example 3: INCLUDES or IN operators are used to check if active filters are included in lists associated with prime award summaries
                        </div>
                        <div className="filter-modal__image">
                            <img
                                role="presentation"
                                src="../../../../img/WOB_VOB.png"
                                alt="" />
                        </div>
                        <div className="filter-modal__description">
                            If the selected Recipient Type filters are "All Women Owned Business" and "All Veteran Owned Business" the resulting awards are identified because their prime award summary is on a list of awards that are associated with each Recipient Type. Another filter that also identifies awards because of their inclusion in a list of the Disaster Emergency Fund Code (DEFC) filter.
                        </div>
                    </div>
                </div>
            </div>
        </Modal>);
};

FilterModal.propTypes = propTypes;
export default FilterModal;
