/**
 * GlossaryDefinition.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { startCase, isEqual } from "lodash";

import { getSocialShareFn, socialShareOptions } from 'helpers/socialShare';

import DefinitionTabs from './DefinitionTabs';
import ItemDefinition from './ItemDefinition';

const propTypes = {
    glossary: PropTypes.object,
    clearGlossaryTerm: PropTypes.func
};

const getGlossaryEmailSubject = (url) => `USAspending.gov Glossary Term: ${startCase(url.split("=")[1])}`;
const getGlossaryEmailBody = (url) => `View the definition of this federal spending term on USAspending.gov: ${url}`;

export default class GlossaryDefinition extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'plain',
            hasPlain: true,
            hasOfficial: true,
            showCopiedConfirmation: false
        };

        this.clickedTab = this.clickedTab.bind(this);
        this.clickedBack = this.clickedBack.bind(this);
        this.getCopyFn = this.getCopyFn.bind(this);
        this.showCopiedConfirmation = null;
    }

    componentDidMount() {
        this.checkDefinitions(this.props);
    }

    componentDidUpdate(prevProps) {
        if (!isEqual(prevProps, this.props)) {
            this.checkDefinitions(this.props);
        }
    }

    componentWillUnmount() {
        if (this.showCopiedConfirmation) {
            window.clearTimeout(this.showCopiedConfirmation);
        }
    }

    getCopyFn() {
        document.getElementById('slug').select();
        document.execCommand("copy");
        this.setState({ showCopiedConfirmation: true });
        this.showCopiedConfirmation = window.setTimeout(() => {
            this.setState({ showCopiedConfirmation: false });
        }, 1750);
    }

    checkDefinitions(props) {
        let hasPlain = false;
        let hasOfficial = false;
        let tab = this.state.tab;

        if (props.glossary.term.plain && props.glossary.term.plain !== '') {
            hasPlain = true;
        }
        if (props.glossary.term.official && props.glossary.term.official !== '') {
            hasOfficial = true;
            if (tab === 'plain' && !hasPlain) {
                tab = 'official';
            }
        }
        if (tab === 'official' && !hasOfficial) {
            tab = 'plain';
        }

        this.setState({
            hasPlain,
            hasOfficial,
            tab
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
        const slug = `?glossary=${this.props.glossary.term.toJS().slug}`;
        const url = `https://www.usaspending.gov/${slug}`;
        const options = socialShareOptions.map((option) => {
            if (option.name === 'copy') {
                return {
                    ...option,
                    onClick: this.getCopyFn
                };
            }
            if (option.name === 'email') {
                const onClick = getSocialShareFn(option.name).bind(null, {
                    subject: getGlossaryEmailSubject(url),
                    body: getGlossaryEmailBody(url)
                });
                return {
                    ...option,
                    onClick
                };
            }
            return {
                ...option,
                onClick: getSocialShareFn(option.name).bind(null, slug)
            };
        });
        return (
            <div className="glossary-definition">
                <input readOnly id="slug" type="text" className="text" style={{ opacity: 0 }} value={url} />
                <DefinitionTabs
                    hasPlain={this.state.hasPlain}
                    hasOfficial={this.state.hasOfficial}
                    activeTab={this.state.tab}
                    clickedTab={this.clickedTab} />
                <Picker
                    options={options}
                    dropdownDirection="left"
                    backgroundColor="#215493"
                    selectedOption="copy"
                    sortFn={() => 1}>
                    <FontAwesomeIcon className="glossary-share-icon" icon="share-alt" color="#e2e2e2" size="lg" />
                </Picker>
                <span className={`copy-confirmation ${this.state.showCopiedConfirmation ? '' : 'hide'}`}><FontAwesomeIcon icon="check-circle" color="#3A8250" /> Copied</span>
                <ItemDefinition
                    {...this.props.glossary.term.toJS()}
                    type={this.state.tab} />
                <button
                    className="glossary-back"
                    onClick={this.clickedBack}>
                    <div className="back-content">
                        <FontAwesomeIcon icon="chevron-left" className="left-chevron-icon" alt="Back" />
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
