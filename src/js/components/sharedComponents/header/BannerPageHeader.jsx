import React from "react";
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    kicker: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    className: PropTypes.string
};

const BannerPageHeader = ({
    kicker = 'Profiles',
    title = 'Federal Response to COVID-19',
    body = 'Need short description here',
    className
}) => {
    const iconStyle = { backgroundColor: "red" };
    const textStyle = { backgroundColor: "blue" };

    return (
        <FlexGridRow className="grid-content">
            <FlexGridCol
                desktop={6}
                tablet={0}
                mobile={0}>
                <div
                    className={`icon-container${className ? ` ${className}` : ''}`}
                    style={iconStyle}>
                    <FontAwesomeIcon icon="chevron-left" />
                </div>
            </FlexGridCol>
            <FlexGridCol
                desktop={6}
                tablet={12}
                mobile={12}>
                <div
                    className={`text-container ${className ? ` ${className}` : ''}`}
                    style={textStyle}>
                    <div className={`${className}__column-two-kicker`}>{kicker}</div>
                    <div className={`${className}__column-two-title`}>{title}</div>
                    <div className={`${className}__column-two-body`}>{body}</div>
                </div>
            </FlexGridCol>
        </FlexGridRow>
    );
};

BannerPageHeader.propTypes = propTypes;
export default BannerPageHeader;
