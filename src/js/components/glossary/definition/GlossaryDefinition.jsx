/**
 * GlossaryDefinition.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { AngleLeft } from 'components/sharedComponents/icons/Icons';

import DefinitionTabs from './DefinitionTabs';
import ItemDefinition from './ItemDefinition';

const propTypes = {
    glossary: PropTypes.object,
    clearGlossaryTerm: PropTypes.func
};

export default class GlossaryDefinition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'plain',
            hasPlain: true,
            hasOfficial: true
        };

        this.clickedTab = this.clickedTab.bind(this);
        this.clickedBack = this.clickedBack.bind(this);
    }

    componentDidMount() {
        this.checkDefinitions(this.props);
    }

    componentDidUpdate() {
        this.checkDefinitions(this.props);
    }

    checkDefinitions(props) {
        let hasPlain = false;
        let hasOfficial = false;

        if (props.glossary.term.plain && props.glossary.term.plain !== '') {
            hasPlain = true;
        }
        if (props.glossary.term.official && props.glossary.term.official !== '') {
            hasOfficial = true;
        }

        this.setState({
            hasPlain,
            hasOfficial
        });
    }

    clickedTab(tab) {
        this.setState({
            tab
        });
    }

    clickedBack() {
        this.props.clearGlossaryTerm();
    }

    render() {
        return (
            <div className="glossary-definition">
                <DefinitionTabs
                    hasPlain={this.state.hasPlain}
                    hasOfficial={this.state.hasOfficial}
                    activeTab={this.state.tab}
                    clickedTab={this.clickedTab} />
                <ItemDefinition
                    {...this.props.glossary.term.toJS()}
                    type={this.state.tab} />
                <button
                    className="glossary-back"
                    onClick={this.clickedBack}>
                    <div className="back-content">
                        <AngleLeft alt="Back" />
                        <div className="label">
                            Back
                        </div>
                    </div>
                </button>
            </div>
        );
    }
}

GlossaryDefinition.propTypes = propTypes;
