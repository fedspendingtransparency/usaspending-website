/**
 * Card.jsx
 * Created by Brian Petway 03/30/2022
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

const Card = ({
    icon, heading, content, link
}) => (
    <FlexGridRow className="card-content">
        <FlexGridCol width={12} desktop={1} className="card__icon-wrapper">
            {icon}
        </FlexGridCol>
        <FlexGridCol width={12} desktop={10} className="card__heading-wrapper">
            {heading}
        </FlexGridCol>
        <FlexGridCol width={12} desktop={12} className="card__content-wrapper">
            {content}
        </FlexGridCol>
        <FlexGridCol width={12} desktop={12} className="card__link-wrapper">
            {link}
        </FlexGridCol>
    </FlexGridRow>
);

Card.propTypes = propTypes;
export default Card;
