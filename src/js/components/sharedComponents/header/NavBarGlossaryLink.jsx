/**
 * NavBarGlossaryLink.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import Analytics from 'helpers/analytics/Analytics';

import { Glossary } from '../icons/Icons';

const propTypes = {
    toggleGlossary: PropTypes.func
};

export default class NavBarGlossaryLink extends React.Component {
    static logGlossaryButtonEvent() {
        Analytics.event({
            category: 'Glossary',
            action: 'Opened Glossary',
            label: 'Nav Bar Glossary Link'
        });
    }

    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.toggleGlossary();

        // Analytics
        NavBarGlossaryLink.logGlossaryButtonEvent();
    }

    render() {
        return (
            <button
                aria-label="Show Glossary"
                className="full-menu__glossary glossary-nav"
                id="header-glossary-button"
                onClick={this.clickedButton}>
                <div className="glossary-nav__icon">
                    <Glossary alt="Glossary" />
                </div>
                <div className="glossary-nav__label">
                    Glossary
                </div>
            </button>
        );
    }
}

NavBarGlossaryLink.propTypes = propTypes;
