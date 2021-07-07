

import React from 'react';
import { useDispatch } from 'react-redux';
import { showModal } from 'redux/actions/modal/modalActions';

const CovidVaccineLink = () => {
    const dispatch = useDispatch();
    const onExternalLinkClick = (e) => {
        e.persist();
        if (e?.target) {
            dispatch(showModal(e.target.value));
        }
    };
    return (
        <div className="covid-19-vaccine-link__container">
            <div className="covid-19-vaccine-link__text">
                <strong>We Can Do this. </strong>
                Find COVID-19 vaccines near you.&nbsp;
                <button
                    value="https://www.vaccines.gov/ "
                    role="link"
                    className="covid-19-vaccine-link__button"
                    onClick={onExternalLinkClick}>
                    Visit Vaccines.gov
                </button>
            </div>
        </div>
    ); };

export default CovidVaccineLink;
