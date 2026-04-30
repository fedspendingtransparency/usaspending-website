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
    const iconStyle = { backgroundColor: "red", width: '20px' };
    const textStyle = { backgroundColor: "blue" };

    return (
        <FlexGridRow className={`banner-page-header${className ? ` ${className}` : ''}`}>
            <FlexGridCol
                desktop={6}
                tablet={0}
                mobile={0}>
                <div
                    className="icon-container"
                    style={iconStyle}>
                    <FontAwesomeIcon icon="chevron-left" />
                </div>
            </FlexGridCol>
            <FlexGridCol
                desktop={6}
                tablet={12}
                mobile={12}>
                <div
                    className="text-container"
                    style={textStyle}>
                    <div className="text_kicker">{kicker}</div>
                    <div className="text_title">{title}</div>
                    <div className="text_body">{body}</div>
                </div>
            </FlexGridCol>
        </FlexGridRow>
    );
};

BannerPageHeader.propTypes = propTypes;
export default BannerPageHeader;
