import React from "react";
import { FlexGridCol, FlexGridRow } from "data-transparency-ui";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    kicker: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    backgroundColor: PropTypes.string,
    className: PropTypes.string
};

const BannerPageHeader = ({
    kicker = 'Profiles',
    title = 'Federal Response to COVID-19',
    body = 'Need short description here',
    backgroundColor = '#39215E',
    className
}) => {
    let stuff;

    return (
        <section
            className={`banner-page-header${className ? ` ${className}` : ''}`}
            style={{ backgroundColor }}>
            <FlexGridRow className="banner-page-header__row">
                <FlexGridCol width="auto">
                    <div className="icon-container">
                        <FontAwesomeIcon icon="chevron-left" color={backgroundColor} />
                    </div>
                </FlexGridCol>
                <FlexGridCol width="fill">
                    <div className="text-container">
                        <div className="text_kicker">{kicker}</div>
                        <div className="text_title">{title}</div>
                        <div className="text_body">{body}</div>
                    </div>
                </FlexGridCol>
            </FlexGridRow>
        </section>
    );
};

BannerPageHeader.propTypes = propTypes;
export default BannerPageHeader;
