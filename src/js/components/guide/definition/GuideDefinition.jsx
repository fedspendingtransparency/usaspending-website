/**
 * GuideDefinition.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';

import { AngleLeft } from 'components/sharedComponents/icons/Icons';

import DefinitionTabs from './DefinitionTabs';
import ItemDefinition from './ItemDefinition';

export default class GuideDefinition extends React.Component {
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

    componentWillReceiveProps(nextProps) {
        this.checkDefinitions(nextProps);
    }

    checkDefinitions(props) {
        let hasPlain = false;
        let hasOfficial = false;

        if (props.guide.term.plain !== '') {
            hasPlain = true;
        }
        if (props.guide.term.official !== '') {
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
        this.props.clearGuideTerm();
    }

    render() {
        return (
            <div className="guide-definition">
                <DefinitionTabs
                    hasPlain={this.state.hasPlain}
                    hasOfficial={this.state.hasOfficial}
                    activeTab={this.state.tab}
                    clickedTab={this.clickedTab} />
                <ItemDefinition
                    {...this.props.guide.term.toJS()}
                    type={this.state.tab} />
                <button
                    className="guide-back"
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
