/**
 * SpotlightCard.jsx
 * Created by Brian Petway 06/21/2022
 */

import React from 'react';
import PropTypes from "prop-types";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';

const propTypes = {
    icon: PropTypes.object,
    heading: PropTypes.object,
    content: PropTypes.object,
    link: PropTypes.object
};

const SpotlightCard = ({
    icon, heading, content, link
}) => (
    <FlexGridRow className="spotlightCard-content">
        <FlexGridCol mobile={12} tablet={1} desktop={1} className="spotlightCard__icon-wrapper">
            {icon}
        </FlexGridCol>
        <FlexGridCol mobile={12} tablet={10} className="spotlightCard__heading-wrapper">
            {heading}
        </FlexGridCol>
        <FlexGridCol width={12} desktop={12} className="spotlightCard__content-wrapper">
            {content}
        </FlexGridCol>
        <FlexGridCol width={12} desktop={12} className="spotlightCard__link-wrapper">
            {link}
        </FlexGridCol>
    </FlexGridRow>
);

SpotlightCard.propTypes = propTypes;
export default SpotlightCard;
