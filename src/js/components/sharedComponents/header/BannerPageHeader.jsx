import React from "react";
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    kicker: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    faIcon: PropTypes.string,
    primaryColor: PropTypes.string,
    overrideBackgroundColor: PropTypes.string,
    overrideIconColor: PropTypes.string,
    overrideKickerColor: PropTypes.string,
    className: PropTypes.string
};

const BannerPageHeader = ({
    kicker = 'PROFILES',
    title = 'Federal Response to COVID-19',
    body = 'Need short description here',
    faIcon = "virus-covid",
    primaryColor = '#39215E',
    overrideBackgroundColor,
    overrideIconColor,
    overrideKickerColor,
    className
}) => {
    // if no override, default to primary color
    const backgroundColor = overrideBackgroundColor || primaryColor;
    const iconColor = overrideIconColor || primaryColor;
    const kickerColor = overrideKickerColor || primaryColor;

    return (
        <section
            className={`banner-page-header${className ? ` ${className}` : ''}`}
            style={{ backgroundColor }}>
            <FlexGridRow className="banner-page-header__row">
                <FlexGridCol width="auto" className="icon-column">
                    <div className="icon-container">
                        <FontAwesomeIcon icon={faIcon} color={iconColor} />
                    </div>
                </FlexGridCol>
                <FlexGridCol width="fill" className="text-column">
                    <div className="text-container">
                        <div className="text__kicker" style={{ color: kickerColor }}>
                            {kicker}
                        </div>
                        <div className="text__title">{title}</div>
                        <div className="text__body">{body}</div>
                    </div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

BannerPageHeader.propTypes = propTypes;
export default BannerPageHeader;
