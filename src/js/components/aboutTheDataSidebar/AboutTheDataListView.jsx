/**
 * AboutTheDataListView.jsx
 * Created by Andrea Blackwell 11/14/22
 */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    section: PropTypes.string
};

const AboutTheDataListView = ({ section }) =>
    <>
        <div className="atd__heading">{section.heading}</div>
        <hr />
        {section.fields.map((list) => <p className="atd__link">{list.name}</p>)}
    </>;

AboutTheDataListView.propTypes = propTypes;
export default AboutTheDataListView;
