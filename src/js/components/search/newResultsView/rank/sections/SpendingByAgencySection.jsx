/**
 * SpendingByAgencySection.jsx
 * Created by Kevin Li 5/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { getAtdDefcText } from "helpers/aboutTheDataSidebarHelper";
import RankVisualizationScopeButton from '../RankVisualizationScopeButton';
import RankVisualizationSection from './RankVisualizationSection';
import GlossaryLink from '../../../../sharedComponents/GlossaryLink';
import ReadMore from '../../../../sharedComponents/ReadMore';

const propTypes = {
    scope: PropTypes.string,
    changeScope: PropTypes.func,
    hideSuboptionBar: PropTypes.string,
    subward: PropTypes.bool,
    togglePicker: PropTypes.func,
    showPicker: PropTypes.bool
};

const defaultProps = {
    hideSuboptionBar: ""
};

export default class SpendingByAgencySection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: null
        };
    }

    componentDidUpdate() {
        if (!this.state.expanded || this.state.expanded === null) {
            const elem = document.querySelector(".read-more__preview-lines");
            elem?.classList.add("line-clamp");
        }
    }
    render() {
        return (
            <RankVisualizationSection {...this.props}>
                <div className="visualization-top">
                    <div className={`visualization-scope ${this.props.hideSuboptionBar}`}>
                        <RankVisualizationScopeButton
                            value="awarding_agency"
                            label="Agencies"
                            active={this.props.scope === 'awarding_agency'}
                            changeScope={this.props.changeScope} />
                        <RankVisualizationScopeButton
                            value="awarding_subagency"
                            label="Sub-Agencies"
                            active={this.props.scope === 'awarding_subagency'}
                            changeScope={this.props.changeScope} />
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}

SpendingByAgencySection.propTypes = propTypes;
SpendingByAgencySection.defaultProps = defaultProps;
