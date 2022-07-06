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
import MainCard from './MainCard';

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

    return (
        <section className="main-cards__wrapper">
            <FlexGridRow className="grid-content">
                {Object.keys(contentObject).map((key, index) => {
                    const card = contentObject[key];
                    const cardContent = card.text.length > 353 ? (<ReadMore openIcon="angle-down" closeIcon="angle-up" openPrompt="Read More" closePrompt="Read Less" text={card.text} limit="353" additionalFunctionality={additionalFunctionality} />) : card.text;
                    return (
                        <FlexGridCol
                            width={6}
                            desktop={6}
                            tablet={12}
                            mobile={12}
                            className={index % 2 === 0 ? `equity-main-card__col-one` : `equity-main-card__col-two`}>
                            <MainCard
                                image={<img className="main-cards__svg" role="presentation" src={card.img} alt="" />}
                                imageColor={card.color}
                                heading={<h2>{card.heading}</h2>}
                                text={cardContent}
                                button={<ExternalLink url={card.link} onClick={() => analyticsEvent(<h2>{card.text}</h2>)}>See Project&nbsp;&nbsp;</ExternalLink>} />
                        </FlexGridCol>
                    );
                })}
            </FlexGridRow>
        </section>
    );
};

MainCards.propTypes = propTypes;

export default MainCards;

