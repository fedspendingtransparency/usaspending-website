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
                    <div className="visualization-description">
                        <div className="content">
                            View a list of the top awarding agencies from highest to
                            lowest. Filter your results more (at left) and watch this graph
                            update automatically. View your results in a bar graph or a tree map.
                        </div>
                    </div>
                    <div className={`visualization-period ${this.props.hideSuboptionBar}`}>
                        <div className="content">
                            <ul>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="awarding_agency"
                                        label="Agencies"
                                        active={this.props.scope === 'awarding_agency'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="awarding_subagency"
                                        label="Sub-Agencies"
                                        active={this.props.scope === 'awarding_subagency'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li className="coming-soon">
                                    <RankVisualizationScopeButton
                                        value="office"
                                        label="Offices"
                                        active={this.props.scope === 'office'}
                                        changeScope={this.props.changeScope}
                                        disabled />
                                    <ComingSoonLabel />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}

SpendingByAgencySection.propTypes = propTypes;
SpendingByAgencySection.defaultProps = defaultProps;
