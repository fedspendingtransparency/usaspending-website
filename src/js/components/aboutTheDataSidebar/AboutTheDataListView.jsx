/**
 * AboutTheDataListView.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    section: PropTypes.object,
    selectItem: PropTypes.func
};

const AboutTheDataListView = ({ section, selectItem }) => {
    // eslint-disable-next-line no-shadow
    const clickHandler = (e, index, section) => {
        e.preventDefault();
        selectItem(index, section);
    };

    return(<>
        <div className="atd__heading">{section.heading}</div>
        <hr />
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        {section.fields.map((list, index) => <p className="atd__link" key={`atd-list-item-${index}`} onClick={(e) => clickHandler(e, index, section)}>{list.name}</p>)}
    </>);
}

AboutTheDataListView.propTypes = propTypes;
export default AboutTheDataListView;
