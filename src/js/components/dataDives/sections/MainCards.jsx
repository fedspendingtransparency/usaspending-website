/**
 * MainCards.jsx
 * Created by Nick Torres 06/17/22
 */

import React from 'react';
import PropTypes from 'prop-types';
import { largeScreen } from 'dataMapping/shared/mobileBreakpoints';
import ExternalLink from 'components/sharedComponents/ExternalLink';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import ReadMoreUpdated from '../../sharedComponents/ReadMoreUpdated';
import EquityMainCard from '../../sharedComponents/EquityMainCard';

const propTypes = {
    contentObject: PropTypes.object.isRequired
};

const MainCards = ({ contentObject }) => {
    const additionalFunctionality = (expanded) => {
        if (window.innerWidth >= largeScreen) {
            const toExpand = document.querySelector(".card__toExpand");
            if (!expanded) {
                toExpand.style.paddingBottom = "116px";
            } else {
                toExpand.style.paddingBottom = "24px";
            }
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

    const bowieBtn = (<ExternalLink url={contentObject.bowieLink}>See Project</ExternalLink>);
    const kansasBtn = (<ExternalLink url={contentObject.kansasLink}>See Project</ExternalLink>);
    const morehouseBtn = (<ExternalLink url={contentObject.morehouseLink}>See Project</ExternalLink>);
    const momBtn = (<ExternalLink url={contentObject.momLink}>See Project</ExternalLink>);

    const {
        bowieText, kansasText, momText, morehouseText
    } = contentObject;

    const momContent = (
        <ReadMoreUpdated text={momText} limit="353" additionalFunctionality={additionalFunctionality} />
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
                    <EquityMainCard className="card__toExpand" image={kansasImg} imageColor="#fa9441" heading={kansasHdg} text={kansasText} button={kansasBtn} />
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

