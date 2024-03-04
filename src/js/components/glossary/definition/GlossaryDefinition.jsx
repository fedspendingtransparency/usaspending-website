/**
 * GlossaryDefinition.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ShareIcon } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { startCase, isEqual } from "lodash";

import { handleShareOptionClick } from 'helpers/socialShare';

import DefinitionTabs from './DefinitionTabs';
import ItemDefinition from './ItemDefinition';

const propTypes = {
    glossary: PropTypes.object,
    clearGlossaryTerm: PropTypes.func
};

const getGlossaryEmailSubject = (slug) => `USAspending.gov Glossary Term: ${startCase(slug)}`;
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
        const separator = window.location.href.includes('?') ? '&' : '?';
        const slug = `${separator}glossary=${this.props.glossary.term.toJS().slug}`;
        const value = window.location.href.includes("glossary") ? window.location.href : window.location.href + slug;
        if (window.navigator && window.navigator.clipboard && window.navigator.clipboard.writeText) {
            window.navigator.clipboard.writeText(value);
            this.setState({ showCopiedConfirmation: true });
            this.showCopiedConfirmation = window.setTimeout(() => {
                this.setState({ showCopiedConfirmation: false });
            }, 1750);
        }
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
        const slug = this.props.glossary.term.toJS().slug;

        const stripUrl = () => {
            const query = new URL(window.location.href);
            if (query.search !== '') {
                const test = window.location.href.includes("?");
                if (test) {
                    return `${window.location.href}&glossary=`;
                }
            }
            return `${window.location.href}?glossary=`;
        };

        const value = stripUrl();

        const onShareClick = (name) => {
            const emailArgs = {
                subject: getGlossaryEmailSubject(slug),
                body: getGlossaryEmailBody(value + slug)
            };
            handleShareOptionClick(name, slug, emailArgs);
        };

        return (
            <div className="glossary-definition">
                <DefinitionTabs
                    hasPlain={this.state.hasPlain}
                    hasOfficial={this.state.hasOfficial}
                    activeTab={this.state.tab}
                    clickedTab={this.clickedTab} />
                <div className="glossary-definition__column-share-icon">
                    <ShareIcon
                        url={value + slug}
                        tabIndex={0}
                        onShareOptionClick={onShareClick}
                        colors={{ backgroundColor: "#215493", color: "#e2e2e2" }}
                        dropDownDirection="left"
                        noShareText />
                </div>
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
