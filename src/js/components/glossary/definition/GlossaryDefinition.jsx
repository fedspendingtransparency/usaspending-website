/**
 * GlossaryDefinition.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'data-transparency-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AngleLeft } from 'components/sharedComponents/icons/Icons';
import { getSocialShareFn } from 'helpers/socialShare';

import DefinitionTabs from './DefinitionTabs';
import ItemDefinition from './ItemDefinition';

const propTypes = {
    glossary: PropTypes.object,
    clearGlossaryTerm: PropTypes.func
};

const GlossaryDropdownOption = ({ icon, title }) => (
    <>
        <FontAwesomeIcon icon={icon} color="black" size="sm" />
        <span>{title}</span>
    </>
);

const pickerOptions = [
    { component: <GlossaryDropdownOption icon="share-alt" title="Copy" />, name: `copy` },
    { component: <GlossaryDropdownOption icon="share-alt" title="Email" />, name: 'email' },
    { component: <GlossaryDropdownOption icon="share-alt" title="Twitter" />, name: 'twitter' },
    { component: <GlossaryDropdownOption icon="share-alt" title="Facebook" />, name: 'facebook' },
    { component: <GlossaryDropdownOption icon="share-alt" title="LinkedIn" />, name: 'linkedin' },
    { component: <GlossaryDropdownOption icon="share-alt" title="Reddit" />, name: 'reddit' }
];

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

    componentWillReceiveProps(nextProps) {
        this.checkDefinitions(nextProps);
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
        }, 3000);
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
        const { slug } = this.props.glossary.term.toJS();
        const url = `https://www.usaspending.gov/#/?glossary=${slug}`;
        const options = pickerOptions.map((option) => ({
            ...option,
            onClick: option.name === 'copy' ? this.getCopyFn : getSocialShareFn(slug, option.name)
        }));
        return (
            <div className="glossary-definition">
                <input id="slug" type="text" className="text" style={{ opacity: 0 }} value={url} />
                <DefinitionTabs
                    hasPlain={this.state.hasPlain}
                    hasOfficial={this.state.hasOfficial}
                    activeTab={this.state.tab}
                    clickedTab={this.clickedTab} />
                <Picker
                    options={options}
                    icon="none"
                    borderType="none"
                    dropdownDirection="left"
                    backgroundColor="#215493"
                    selectedOption="twitter">
                    <FontAwesomeIcon icon="share-alt" color="white" size="lg" />
                </Picker>
                <span className={`copy-confirmation ${this.state.showCopiedConfirmation ? '' : 'hide'}` }><FontAwesomeIcon icon="check-circle" color="#3A8250" /> Copied</span>
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
