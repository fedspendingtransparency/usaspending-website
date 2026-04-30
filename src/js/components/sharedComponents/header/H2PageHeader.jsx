import React from "react";
import PropTypes from "prop-types";
import { FlexGridCol } from 'data-transparency-ui';

const propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    className: PropTypes.string
};

const H2PageHeader = ({ title, subtitle, className = "" }) => (
    <FlexGridCol width={9} className={`h2-page-header ${className}`} >
        <h2 className="h2-page-header__title">{title}</h2>
        <div className="h2-page-header__subtitle">{subtitle}</div>
    </FlexGridCol>
);

H2PageHeader.propTypes = propTypes;
export default H2PageHeader;
