/**
 * SpendingByAgencySection.jsx
 * Created by Kevin Li 5/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import RankVisualizationScopeButton from '../RankVisualizationScopeButton';

import RankVisualizationSection from './RankVisualizationSection';

const propTypes = {
    scope: PropTypes.string,
    changeScope: PropTypes.func,
    hideSuboptionBar: PropTypes.string
};

const defaultProps = {
    hideSuboptionBar: ""
};

export default class SpendingByAgencySection extends React.Component {
    render() {
        return (
            <RankVisualizationSection {...this.props}>
                <div className="visualization-top">
                    <div className="visualization-top__description">
                        View a list of the top Agencies from highest to lowest.
                        View your results by Awarding Agency, Sub Agency, or Office, and hover over the bars
                        for more detailed information.
                    </div>
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
                        <div className="coming-soon">
                            <RankVisualizationScopeButton
                                value="office"
                                label="Offices"
                                active={this.props.scope === 'office'}
                                changeScope={this.props.changeScope}
                                disabled />
                            <ComingSoonLabel />
                        </div>
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}

SpendingByAgencySection.propTypes = propTypes;
SpendingByAgencySection.defaultProps = defaultProps;
