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

    // const momContent = (
    //     <ReadMore openIcon="angle-down" closeIcon="angle-up" openPrompt="Read More" closePrompt="Read Less" text={momText} limit="353" additionalFunctionality={additionalFunctionality} />
    // );

    return (
        <section className="main-cards__wrapper">
            {Object.keys(contentObject).map((key) => {
                const card = contentObject[key];
                const cardText = card.readMore ? (<ReadMore openIcon="angle-down" closeIcon="angle-up" openPrompt="Read More" closePrompt="Read Less" text={card.text} limit="353" additionalFunctionality={additionalFunctionality} />) : card.text;
                return (
                    <FlexGridRow className="grid-content">
                        <FlexGridCol
                            width={6}
                            desktop={6}
                            tablet={12}
                            mobile={12}
                            className="equity-main-card__col-one">
                            <EquityMainCard
                                image={<img className="main-cards__svg" role="presentation" src={card.img} alt="" />}
                                imageColor={card.color}
                                heading={<h2>{card.heading}</h2>}
                                text={cardText}
                                button={<ExternalLink url={card.link} onClick={() => analyticsEvent(<h2>{card.text}</h2>)}>See Project&nbsp;&nbsp;</ExternalLink>} />
                        </FlexGridCol>
                        {/*<FlexGridCol*/}
                        {/*    width={6}*/}
                        {/*    desktop={6}*/}
                        {/*    tablet={12}*/}
                        {/*    mobile={12}*/}
                        {/*    className="equity-main-card__col-two">*/}
                        {/*    <EquityMainCard*/}
                        {/*        image={morehouseImg}*/}
                        {/*        imageColor="#339189"*/}
                        {/*        heading={<h2>morehouseHdg</h2>}*/}
                        {/*        text={morehouseText}*/}
                        {/*        button={morehouseBtn} />*/}
                        {/*</FlexGridCol>*/}
                    </FlexGridRow>
                    // <FlexGridRow className="grid-content">
                    //     <FlexGridCol width={6} desktop={6} tablet={12} mobile={12} className="equity-main-card__col-one">
                    //         <EquityMainCard className="card__toExpand" image={kansasImg} imageColor="#fa9441" heading={kansasHdg} text={kansasText} button={kansasBtn} />
                    //     </FlexGridCol>
                    //     <FlexGridCol width={6} desktop={6} tablet={12} mobile={12} className="equity-main-card__col-two">
                    //         <EquityMainCard image={momImg} imageColor="#29abe2" heading={momHdg} text={momContent} button={momBtn} />
                    //     </FlexGridCol>
                    // </FlexGridRow>
                );
            })}
        </section>
    );
};

MainCards.propTypes = propTypes;

export default MainCards;

