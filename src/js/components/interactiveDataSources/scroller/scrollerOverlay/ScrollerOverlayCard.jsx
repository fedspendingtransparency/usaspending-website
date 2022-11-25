import React from 'react';
import PropTypes from "prop-types";
import { FlexGridRow, FlexGridCol } from 'data-transparency-ui';

const propTypes = {
    icon: PropTypes.object,
    heading: PropTypes.object,
    content: PropTypes.object,
    link: PropTypes.object
};

const ScrollerOverlayCard = ({
    icon, heading, content, overline
}) => (
    <FlexGridRow className="scroller-overlay-card-content" tabIndex="0">
        {icon &&
            <FlexGridCol width={12} desktop={1} className="scroller-overlay-card__icon-wrapper">
                {icon}
            </FlexGridCol>
        }
        {overline &&
            <FlexGridCol width={12} desktop={12} className="scroller-overlay-card__overline-wrapper">
                {overline}
            </FlexGridCol>
        }
        {heading &&
            <FlexGridCol width={12} desktop={icon ? 10 : 12} className="scroller-overlay-card__heading-wrapper">
                {heading}
            </FlexGridCol>
        }
        <FlexGridCol width={12} desktop={12} className="scroller-overlay-card__content-wrapper">
            {content}
        </FlexGridCol>
    </FlexGridRow>
);

ScrollerOverlayCard.propTypes = propTypes;
export default ScrollerOverlayCard;
