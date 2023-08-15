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
                    <p className="filter-modal__top-description">
                    Active filters in Award Search use Boolean Operators, which are simple words (AND, OR) used to combine or exclude keywords in order to limit or modify search results. When selecting from the categories of filters in Award Search (e.g., “Time Period”, “Location” or “Recipient Type”), these operators function differently depending on whether you have selected multiple filters from within the same category (e.g., searching for spending to multiple states under the Location category), or across categories (e.g., searching for award spending in one location to one type of recipient).
                    </p>
                    <p className="filter-modal__top-description-2">
                    Generally, active filters within the same category function as an OR, while active filters across categories function as an AND. There are also some filters which search to see if the selected value is included within an award summary using INCLUDES or IN operators.
                    </p>
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
                        If the selected Time Period is “FY 2021” and the selected Recipient Type is “All Women Owned Business”, the search results will include all awards with any activity in Fiscal Year 2021 <span className="filter-modal__operator">AND</span>{' '}awards also issued to a Women Owned Business.
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
                        If the selected Time Period is “FY 2021” and the selected Recipient Types are “All Women Owned Business” and “All Veteran Owned Business”, the search results will include all awards with any activity in Fiscal Year 2021 <span className="filter-modal__operator">AND</span>{' '}awards issued to a Women Owned Business <span className="filter-modal__operator">OR</span>{' '}a Veteran Owned Business.
                        </div>
                    </div>
                    <div className="filter-modal__example">
                        <div className="filter-modal__title">
                            Example 3:  INCLUDES or IN operators are used to check if active filters are included in lists associated with prime award summaries
                        </div>
                        <div className="filter-modal__image">
                            <img
                                role="presentation"
                                src="../../../../img/WOB_VOB.png"
                                alt="" />
                        </div>
                        <div className="filter-modal__description">
                        If the selected Recipient Type filters are “All Women Owned Business” and “All Veteran Owned Business”, the search results will contain all <span className="filter-modal__operator">prime</span> awards which include either the Women Owned Business or Veteran Owned Business recipient type. A single award may have many recipient types. The Disaster Emergency Fund Code (DEFC) filter also uses the INCLUDES or IN operators.
                        </div>
                    </div>
                </div>
            </div>
        </Modal>);
};

FilterModal.propTypes = propTypes;
export default FilterModal;
