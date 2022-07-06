/**
 * EquitySpotlightCards.jsx
 * Created by Brian Petway 06/21/22
 */

import React from 'react';
import PropTypes from "prop-types";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';
import SpotlightCard from "../../sharedComponents/cards/SpotlightCard";

const propTypes = {
    content: PropTypes.object
};

const EquitySpotlightCards = (props) => {
    const {
        spotlightCardIcon,
        spotlightCardTitle,
        spotlightCardText,
        spotlightCardLink,
        trackCardIcon,
        trackCardTitle,
        trackCardText,
        trackCardLink
    } = props.content;
    return (
        <section className="equity-spotlight">
            <FlexGridRow className="grid-content">
                <FlexGridCol
                    width={12}
                    desktop={6}
                    className="equity-spotlight__column-one">
                    <SpotlightCard
                        icon={spotlightCardIcon}
                        heading={spotlightCardTitle}
                        content={spotlightCardText}
                        link={spotlightCardLink} />
                </FlexGridCol>
                <FlexGridCol
                    width={12}
                    desktop={6}
                    className="equity-spotlight__column-two">
                    <SpotlightCard
                        icon={trackCardIcon}
                        heading={trackCardTitle}
                        content={trackCardText}
                        link={trackCardLink} />
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

EquitySpotlightCards.PropTypes = propTypes;
export default EquitySpotlightCards;
