/**
 * AboutTheDataListView.jsx
 * Created by Andrea Blackwell 11/14/22
 */
import React from 'react';
import PropTypes from 'prop-types';
import schema from 'dataMapping/aboutTheDataSchemas/aboutTheData';

const propTypes = {
    children: PropTypes.element,
    onClose: PropTypes.func
};


const AboutTheDataListView = () => {
    console.log(schema);
    return schema.collections.map((section) =>
        <>
            <h1>{section.label}</h1>
            {section.fields.map((list) => <p>{list.title}</p>)}
        </>);
};

AboutTheDataListView.propTypes = propTypes;
export default AboutTheDataListView;
