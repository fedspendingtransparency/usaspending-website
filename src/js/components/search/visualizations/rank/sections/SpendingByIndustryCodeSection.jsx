/**
 * SpendingByIndustryCodeSection.jsx
 * Created by Kevin Li 12/13/16
 **/

import React from 'react';
import PropTypes from 'prop-types';

import RankVisualizationScopeButton from '../RankVisualizationScopeButton';
import RankVisualizationSection from './RankVisualizationSection';

const propTypes = {
    scope: PropTypes.string,
    changeScope: PropTypes.func
};

export default class SpendingByIndustryCodeSection extends React.Component {
    render() {
        return (
            <RankVisualizationSection {...this.props}>
                <div className="visualization-top">
                    <div className="visualization-description">
                        <div className="content">
                            View a list of the top industry codes from highest to lowest. Filter
                            your results more (at left) and watch this graph update automatically.
                            View your results in a bar graph or a tree map.
                        </div>
                    </div>
                    <div className="visualization-period">
                        <div className="content">
                            <ul>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="psc"
                                        label="PSC"
                                        active={this.props.scope === 'psc'}
                                        changeScope={this.props.changeScope} />
                                </li>
                                <li>
                                    <RankVisualizationScopeButton
                                        value="naics"
                                        label="NAICS"
                                        active={this.props.scope === 'naics'}
                                        changeScope={this.props.changeScope} />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}

SpendingByIndustryCodeSection.propTypes = propTypes;
