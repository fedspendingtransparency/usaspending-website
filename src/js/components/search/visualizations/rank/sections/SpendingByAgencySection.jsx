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
    agencyScope: PropTypes.string,
    changeScope: PropTypes.func,
    agencyType: PropTypes.string,
    hideSuboptionBar: PropTypes.string
};

const defaultProps = {
    hideSuboptionBar: ""
};

export default class SpendingByAgencySection extends React.Component {
    render() {
        const agencyValue = `${this.props.agencyType}_agency`;
        const subAgencyValue = `${this.props.agencyType}_subagency`;
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
                    <div className={`visualization-period ${this.props.hideSuboptionBar}`}>
                        <div className="content">
                            <ul>
                                <li>
                                    <RankVisualizationScopeButton
                                        value={agencyValue}
                                        label="Agencies"
                                        active={this.props.agencyScope === agencyValue}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value={subAgencyValue}
                                        label="Sub-Agencies"
                                        active={this.props.agencyScope === subAgencyValue}
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
SpendingByAgencySection.defaultProps = defaultProps;
