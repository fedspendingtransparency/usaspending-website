/**
 * AboutTheDataListView.jsx
 * Created by Andrea Blackwell 11/14/22
 */

import React from 'react';
import PropTypes from 'prop-types';
import Analytics from 'helpers/analytics/Analytics';

const propTypes = {
    section: PropTypes.object,
    selectItem: PropTypes.func
};

const AboutTheDataListView = ({ section, selectItem }) => {
    const clickHandler = (e, index, section, list) => {
        e.preventDefault();
        selectItem(index, section);
        Analytics.event({
            event: 'atd_entry_name',
            category: 'About the Data',
            action: `Clicked ${list.name}`
        });
    };

    const keyHandler = (e, index, section) => {
        if (e.key === 'Enter') {
            clickHandler(e, index, section);
        }
    };

    return (
        <>
            <div className="atd__heading">{section.heading}</div>
            <hr />
            {section.fields.map((list, index) => (
                <p key={`atd-list-item-${index}`}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                        className="atd__link"
                        role="link"
                        tabIndex={0}
                        onKeyUp={(e) => keyHandler(e, index, section)}
                        onClick={(e) => clickHandler(e, index, section, list)}>
                        {list.name}
                    </a>
                </p>
            ))}
        </>
    );
};

AboutTheDataListView.propTypes = propTypes;
export default AboutTheDataListView;
