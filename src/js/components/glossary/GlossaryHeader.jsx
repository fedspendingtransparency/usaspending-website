/**
 * GlossaryHeader.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';
import GlossarySearchBar from './GlossarySearchBar';

const propTypes = {
    closeGlossary: PropTypes.func
};

export default class GlossaryHeader extends React.Component {
    componentDidMount() {
        if (this.closeButton) {
            this.closeButton.focus();
        }
    }
    render() {
        return (
            <div className="glossary-header">
                <div
                    role="navigation"
                    aria-label="Glossary navigation">
                    <button
                        className="close-button"
                        id="glossary-close-button"
                        aria-label="Close Glossary"
                        title="Close Glossary"
                        onClick={this.props.closeGlossary}
                        ref={(button) => {
                            this.closeButton = button;
                        }}>
                        <Icons.Close alt="Close Glossary" />
                    </button>
                </div>
                <h1
                    id="glossary-title"
                    className="glossary-title"
                    tabIndex={-1}>
                    Glossary
                </h1>

                <GlossarySearchBar {...this.props} />

                <div className="glossary-example">
                    Example: &quot;Obligation&quot;
                </div>
            </div>
        );
    }
}

GlossaryHeader.propTypes = propTypes;
