/**
 * MobileDropdownItem.jsx
 * Created by Kevin Li 10/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as redirectHelper from 'helpers/redirectHelper';

import DropdownComingSoon from '../DropdownComingSoon';

const propTypes = {
    active: PropTypes.bool,
    comingSoon: PropTypes.bool,
    url: PropTypes.string,
    title: PropTypes.string,
    hideMobileNav: PropTypes.func,
    externalLink: PropTypes.bool
};

export default class MobileDropdownItem extends React.Component {
    constructor(props) {
        super(props);

        this.redirect = this.redirect.bind(this);
    }

    redirect() {
        redirectHelper.showRedirectModal(this.props.url);
        this.props.hideMobileNav();
    }

    render() {
        let activeClass = '';
        if (this.props.active) {
            activeClass = 'mobile-dropdown__link_active';
        }

        let comingSoonClass = '';
        let comingSoonDecorator = null;
        if (this.props.comingSoon) {
            comingSoonClass = 'mobile-dropdown__item_coming-soon';
            comingSoonDecorator = (
                <div className="mobile-dropdown__coming-soon">
                    <DropdownComingSoon />
                </div>
            );
        }

        let link = (
            <li className={`mobile-dropdown__item ${comingSoonClass}`}>
                <a
                    href={this.props.url}
                    className={`mobile-dropdown__link ${activeClass}`}
                    onClick={this.props.hideMobileNav}>
                    {this.props.title}
                </a>
                {comingSoonDecorator}
            </li>
        );

        if (this.props.externalLink) {
            // Trigger the redirect modal
            link = (
                <li className={`mobile-dropdown__item ${comingSoonClass}`}>
                    <button
                        className={`mobile-dropdown__link ${activeClass}`}
                        onClick={this.redirect}>
                        {this.props.title}
                    </button>
                    {comingSoonDecorator}
                </li>
            );
        }

        return link;
    }
}

MobileDropdownItem.propTypes = propTypes;
