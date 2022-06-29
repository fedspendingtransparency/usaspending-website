/**
 * MainCards.jsx
 * Created by Nick Torres 06/17/22
 */

import React from 'react';
import PropTypes from 'prop-types';
import { largeScreen } from 'dataMapping/shared/mobileBreakpoints';
import ExternalLink from 'components/sharedComponents/ExternalLink';
import Analytics from 'helpers/analytics/Analytics';

import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import ReadMore from '../../sharedComponents/ReadMore';
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
            }
            else {
                toExpand.style.paddingBottom = "24px";
            }
        }
    };

    const analyticsEvent = (item) => {
        Analytics.event({
            category: 'Data Dives: Equity Covid Spending Page Main Card',
            action: `Clicked ${item} See Project Button`
        });
    };

    const bowieImg = <img className="main-cards__svg" role="presentation" src="../../../../img/top-bowie-state-combined-image.svg" alt="" />;
    const kansasImg = <img className="main-cards__svg" role="presentation" src="../../../../img/top-university-kansas-combined-image.svg" alt="" />;
    const morehouseImg = <img className="main-cards__svg" role="presentation" src="../../../../img/top-morehouse-combined-image.svg" alt="" />;
    const momImg = <img className="main-cards__svg" role="presentation" src="../../../../img/top-mom-project-combined-image.svg" alt="" />;

    const bowieHdg = <h2>Bowie State University</h2>;
    const morehouseHdg = <h2>Morehouse College</h2>;
    const kansasHdg = <h2>University of Kansas Center for Public Partnerships and Research</h2>;
    const momHdg = <h2>The Mom Project</h2>;


    const bowieBtn = (<ExternalLink url={contentObject.bowieLink} onClick={() => analyticsEvent(bowieHdg)}>See Project&nbsp;&nbsp;</ExternalLink>);
    const kansasBtn = (<ExternalLink url={contentObject.kansasLink} onClick={() => analyticsEvent(kansasHdg)}>See Project&nbsp;&nbsp;</ExternalLink>);
    const morehouseBtn = (<ExternalLink url={contentObject.morehouseLink} onClick={() => analyticsEvent(morehouseHdg)}>See Project&nbsp;&nbsp;</ExternalLink>);
    const momBtn = (<ExternalLink url={contentObject.momLink} onClick={() => analyticsEvent(momHdg)}>See Project&nbsp;&nbsp;</ExternalLink>);

    const {
        bowieText, kansasText, momText, morehouseText
    } = contentObject;

    const momContent = (
        <ReadMore openIcon="angle-down" closeIcon="angle-up" openPrompt="Read More" closePrompt="Read Less" text={momText} limit="353" additionalFunctionality={additionalFunctionality} />

    );

    return (
        <section className="main-cards__wrapper">
            <FlexGridRow className="grid-content">
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12} className="equity-main-card__col-one">
                    <EquityMainCard image={bowieImg} imageColor="#ffbe60" heading={bowieHdg} text={bowieText} button={bowieBtn} />
                </FlexGridCol>
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12} className="equity-main-card__col-two">
                    <EquityMainCard image={morehouseImg} imageColor="#339189" heading={morehouseHdg} text={morehouseText} button={morehouseBtn} />
                </FlexGridCol>
            </FlexGridRow>
            <FlexGridRow className="grid-content">
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12} className="equity-main-card__col-one">
                    <EquityMainCard className="card__toExpand" image={kansasImg} imageColor="#fa9441" heading={kansasHdg} text={kansasText} button={kansasBtn} />
                </FlexGridCol>
                <FlexGridCol width={6} desktop={6} tablet={12} mobile={12} className="equity-main-card__col-two">
                    <EquityMainCard image={momImg} imageColor="#29abe2" heading={momHdg} text={momContent} button={momBtn} />
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

MainCards.propTypes = propTypes;

export default MainCards;

