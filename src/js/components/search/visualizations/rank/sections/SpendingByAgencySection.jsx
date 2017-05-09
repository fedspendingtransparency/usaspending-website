/**
 * SpendingByAgencySection.jsx
 * Created by Kevin Li 5/4/17
 */

import React from 'react';

import ComingSoonLabel from 'components/sharedComponents/ComingSoonLabel';
import RankVisualizationScopeButton from '../RankVisualizationScopeButton';

import RankVisualizationSection from './RankVisualizationSection';

const propTypes = {
    agencyScope: React.PropTypes.string,
    changeScope: React.PropTypes.func,
    agencyType: React.PropTypes.string
};

export default class SpendingByAgencySection extends React.Component {
    render() {
        return (
            <RankVisualizationSection {...this.props}>
                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            View a list of the top {this.props.agencyType} agencies from highest to
                            lowest. Filter your results more (at left) and watch this graph
                            update automatically. View your results in a bar graph or a tree map.
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="toptier"
                                        label="Agencies"
                                        active={this.props.agencyScope === 'toptier'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="subtier"
                                        label="Sub-Agencies"
                                        active={this.props.agencyScope === 'subtier'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li className="coming-soon">
                                    <RankVisualizationScopeButton
                                        value="office"
                                        label="Offices"
                                        active={this.props.agencyScope === 'office'}
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
