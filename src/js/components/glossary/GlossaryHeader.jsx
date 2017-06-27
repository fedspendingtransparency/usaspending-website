/**
 * GlossaryHeader.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';

import * as Icons from 'components/sharedComponents/icons/Icons';
import GlossarySearchBar from './GlossarySearchBar';

const propTypes = {
    hideGlossary: React.PropTypes.func
};

export default class GlossaryHeader extends React.Component {
    render() {
        return (
            <div className="glossary-header">
                <button
                    className="close-button"
                    aria-label="Close Glossary"
                    title="Close Glossary"
                    onClick={this.props.hideGlossary}>
                    <Icons.Close alt="Close Glossary" />
                </button>
                <h1 className="glossary-title">
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
