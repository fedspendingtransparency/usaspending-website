/**
 * MobileGlossaryButton.jsx
 * Created by Kevin Li 10/2/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    hideMobileNav: PropTypes.func,
    showGlossary: PropTypes.func
};

export default class MobileGlossaryButton extends React.Component {
    constructor(props) {
        super(props);

        this.openGlossary = this.openGlossary.bind(this);
    }

    openGlossary() {
        this.props.hideMobileNav();
        // wait 200ms for exit animations to finish
        setTimeout(() => {
            this.props.showGlossary();
        }, 200);
    }

    render() {
        return (
            <button
                className="mobile-nav-content__glossary"
                title="Glossary"
                onClick={this.openGlossary}>
                Glossary
            </button>
        );
    }
}

MobileGlossaryButton.propTypes = propTypes;
