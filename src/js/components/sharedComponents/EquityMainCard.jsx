/**
 * EquityMainCard.jsx
 * Created by Nick Torres 06/15/2022
 */

import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';

const propTypes = {
    image: PropTypes.object,
    heading: PropTypes.object,
    text: oneOfType([PropTypes.element, PropTypes.string, PropTypes.object]),
    button: PropTypes.object,
    imageColor: PropTypes.string
};

const EquityMainCard = ({
    image, heading, text, button, imageColor
}) => (
    <FlexGridRow className="equity-main-card-content">
        <FlexGridCol width={6} desktop={12} tablet={12} mobile={12} className="equityMainCard__image-wrapper">
            <div className="equityMainCard__image-background" style={{ backgroundColor: imageColor }}>
                {image}
            </div>
        </FlexGridCol>
        <div className="equityMainCard__content-wrapper">
            <FlexGridCol width={6} desktop={12} tablet={12} mobile={12} className="equityMainCard__heading-wrapper">
                {heading}
            </FlexGridCol>
            <FlexGridCol width={6} desktop={12} tablet={12} mobile={12} className="equityMainCard__text-wrapper">
                {text}
            </FlexGridCol>
            <FlexGridCol width={6} desktop={12} tablet={12} mobile={12} className="equityMainCard__button-wrapper">
                {button}
            </FlexGridCol>
        </div>
    </FlexGridRow>
);

EquityMainCard.propTypes = propTypes;
export default EquityMainCard;
