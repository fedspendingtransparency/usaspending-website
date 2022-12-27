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
    // eslint-disable-next-line no-shadow
    const clickHandler = (e, index, section) => {
        e.preventDefault();
        selectItem(index, section);
        Analytics.event({
            category: 'About the Data',
            action: 'Link',
            label: 'About the Data'
        });
        console.log('herehere');
    };

    // eslint-disable-next-line no-shadow
    const keyHandler = (e, index, section) => {
        if (e.keyCode === 13) {
            clickHandler(e, index, section);
        }
    };

    const aboutTheDataAnalyticsHandler = () => Analytics.event({
        category: 'About the Data',
        action: 'Link',
        label: 'About the Data'
    });

    return (<>
        <div className="atd__heading">{section.heading}</div>
        <hr />
        {section.fields.map((list, index) => <p key={`atd-list-item-${index}`}><a className="atd__link" role="link" tabIndex={0} onKeyUp={(e) => keyHandler(e, index, section)} onClick={(e) => [clickHandler(e, index, section), aboutTheDataAnalyticsHandler()]}>{list.name}</a></p>)}
    </>);
};

AboutTheDataListView.propTypes = propTypes;
export default AboutTheDataListView;
