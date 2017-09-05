/**
 * HomepageHeader.jsx
 * Created by Kevin Li 9/5/17
 */

import React from 'react';
import NavBar from 'components/sharedComponents/header/NavBar';

const HomepageHeader = () => {
    const skippedNav = (e) => {
        // don't update the URL due to potential React Router conflicts
        e.preventDefault();
        // scroll to the main-content id
        const yPos = document.querySelector('#main-content').getBoundingClientRect().top;
        window.scrollTo(0, yPos);
    };

    return (
        <div className="site-header">
            <a
                href="#main-content"
                className="skip-nav"
                onClick={skippedNav}>
                    Skip to main content
            </a>
            <header>
                <NavBar homepage={true} />
            </header>
        </div>
    );
};

export default HomepageHeader;
