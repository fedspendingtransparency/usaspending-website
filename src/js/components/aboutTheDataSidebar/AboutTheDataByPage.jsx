/**
 * AboutTheDataByPage.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React from 'react';
import PropTypes from "prop-types";

const propTypes = {
    section: PropTypes.string
};

const AboutTheDataByPage = ({ section }) => <><div className="atd__heading">{section.label}</div><hr /></>;

AboutTheDataByPage.propTypes = propTypes;
export default AboutTheDataByPage;
