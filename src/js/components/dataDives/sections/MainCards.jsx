/**
 * MainCards.jsx
 * Created by Nick Torres 06/17/22
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import { showModal } from 'redux/actions/modal/modalActions';
import ReadMoreUpdated from '../../sharedComponents/ReadMoreUpdated';
import EquityMainCard from '../../sharedComponents/EquityMainCard';

const propTypes = {
    contentObject: PropTypes.object.isRequired
};

const MainCards = ({ contentObject }) => {
    const dispatch = useDispatch();
    const onExternalLinkClick = (e) => {
        e.persist();
        if (e?.target) {
            dispatch(showModal(e.target.parentNode.getAttribute('data-href') || e.target.getAttribute('data-href') || e.target.value));
        }
    };

    const bowieImg = <img className="main-cards__svg" src="../../../../img/top-bowie-state-combined-image.svg" alt="" />;
    const kansasImg = <img className="main-cards__svg" src="../../../../img/top-university-kansas-combined-image.svg" alt="" />;
    const morehouseImg = <img className="main-cards__svg" src="../../../../img/top-morehouse-combined-image.svg" alt="" />;
    const momImg = <img className="main-cards__svg" src="../../../../img/top-mom-project-combined-image.svg" alt="" />;


    const bowieHdg = <h2>Bowie State University</h2>;
    const morehouseHdg = <h2>Morehouse College</h2>;
    const kansasHdg = <h2>University of Kansas Center for Public Partnerships and Research</h2>;
    const momHdg = <h2>The Mom Project</h2>;

    const bowieBtn = (
        <button
            value={contentObject.bowieLink}
            role="link"
            onClick={onExternalLinkClick}>
    See Project{' '}
            <span
                data-href={contentObject.bowieLink}
                className="usa-button-link__icon">
                <FontAwesomeIcon data-href={contentObject.bowieLink} icon="external-link-alt" />
            </span>
        </button>);
    const kansasBtn = (
        <button
            value={contentObject.kansasLink}
            role="link"
            onClick={onExternalLinkClick}>
    See Project{' '}
            <span
                data-href={contentObject.kansasLink}
                className="usa-button-link__icon">
                <FontAwesomeIcon data-href={contentObject.kansasLink} icon="external-link-alt" />
            </span>
        </button>);
    const morehouseBtn = (
        <button
            value={contentObject.morehouseLink}
            role="link"
            onClick={onExternalLinkClick}>
    See Project{' '}
            <span
                data-href={contentObject.morehouseLink}
                className="usa-button-link__icon">
                <FontAwesomeIcon data-href={contentObject.morehouseLink} icon="external-link-alt" />
            </span>
        </button>);
    const momBtn = (
        <button
            value={contentObject.momLink}
            role="link"
            onClick={onExternalLinkClick}>
    See Project{' '}
            <span
                data-href={contentObject.momLink}
                className="usa-button-link__icon">
                <FontAwesomeIcon data-href={contentObject.momLink} icon="external-link-alt" />
            </span>
        </button>);

    const {
        bowieText, kansasText, momText, morehouseText
    } = contentObject;

    const momContent = (
        <ReadMoreUpdated text={momText} limit="353" />
    );

    return (
        <section className="main-cards__wrapper">
            <FlexGridRow>
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12}>
                    <EquityMainCard image={bowieImg} imageColor="#ffbe60" heading={bowieHdg} text={bowieText} button={bowieBtn} />
                </FlexGridCol>
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12}>
                    <EquityMainCard image={morehouseImg} imageColor="#339189" heading={morehouseHdg} text={morehouseText} button={morehouseBtn} />
                </FlexGridCol>
            </FlexGridRow>
            <FlexGridRow>
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12}>
                    <EquityMainCard image={kansasImg} imageColor="#fa9441" heading={kansasHdg} text={kansasText} button={kansasBtn} />
                </FlexGridCol>
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12}>
                    <EquityMainCard image={momImg} imageColor="#29abe2" heading={momHdg} text={momContent} button={momBtn} />
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

MainCards.propTypes = propTypes;

export default MainCards;

