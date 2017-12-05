import React from 'react';

import GlossaryContainer from 'containers/glossary/GlossaryContainer';

import WarningBanner from './WarningBanner';
import NavBar from './NavBar';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        // bind functions
        this.skippedNav = this.skippedNav.bind(this);
    }
    skippedNav(e) {
        // don't update the URL due to potential React Router conflicts
        e.preventDefault();
        // scroll to the main-content id
        const mainContent = document.getElementById('main-content');
        const mainFocus = document.getElementById('main-focus');
        const yPos = mainContent.getBoundingClientRect().top;
        window.scrollTo(0, yPos);
        // focus on the element
        if (mainFocus) {
            mainFocus.focus();
        }
    }
    render() {
        return (
            <div className="site-header">
                <a
                    href="#main-content"
                    className="skip-nav"
                    onClick={this.skippedNav}>
                        Skip to main content
                </a>
                <header>
                    <WarningBanner />
                    <NavBar />
                </header>
                <GlossaryContainer />
            </div>
        );
    }
}

