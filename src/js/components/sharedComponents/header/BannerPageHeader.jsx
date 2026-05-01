import React, { useContext } from "react";
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IsMobileContext from "context/IsMobileContext";

const propTypes = {
    kicker: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    faIcon: PropTypes.string,
    primaryColor: PropTypes.string,
    secondaryColor: PropTypes.string,
    overrideBackgroundColor: PropTypes.string,
    overrideIconColor: PropTypes.string,
    overrideKickerColor: PropTypes.string,
    overrideBoxOneColor: PropTypes.string,
    overrideBoxTwoColor: PropTypes.string,
    className: PropTypes.string
};

const BannerPageHeader = ({
    kicker = 'KICKER',
    title = 'This is the Title',
    body = 'Body: Need short description here',
    faIcon = 'chevron-up',
    primaryColor = 'blue',
    secondaryColor = 'cornflowerblue',
    overrideBackgroundColor,
    overrideIconColor,
    overrideKickerColor,
    overrideBoxOneColor,
    overrideBoxTwoColor,
    className
}) => {
    const { isTablet } = useContext(IsMobileContext);

    // if no override, default to primary color
    const bannerColor = overrideBackgroundColor || primaryColor;
    const iconColor = overrideIconColor || primaryColor;
    const kickerColor = overrideKickerColor || primaryColor;

    // if no override, default to secondary color
    const boxOneColor = overrideBoxOneColor || secondaryColor;
    const boxTwoColor = overrideBoxTwoColor || secondaryColor;

    return (
        <section
            className={`banner-page-header${className ? ` ${className}` : ''}`}
            style={{ backgroundColor: bannerColor }}>
            <FlexGridRow className="banner-page-header__row">
                { !isTablet &&
                    <FlexGridCol width="auto" className="icon-column">
                        <div className="accent-box-one" style={{ backgroundColor: boxOneColor }} />
                        <div className="accent-box-two" style={{ backgroundColor: boxTwoColor }} />
                        <div className="icon-container">
                            <FontAwesomeIcon icon={faIcon} color={iconColor} />
                        </div>
                    </FlexGridCol>
                }
                <FlexGridCol width="fill" className="text-column">
                    <div className="text-container">
                        { isTablet &&
                            <div className="icon-container__mobile">
                                <FontAwesomeIcon icon={faIcon} color={iconColor} />
                            </div>
                        }
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
