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
    changeScope: PropTypes.func,
    industryCodeError: PropTypes.bool
};

export default class SpendingByIndustryCodeSection extends React.Component {
    render() {
        return (
            <RankVisualizationSection {...this.props}>
                <div className="visualization-top">
                    <div className="visualization-top__description">
                            View a list of the top Industry Codes from highest to lowest.
                            View your results by NAICS Code or PSC Code, and hover over
                            the bars for more detailed information.
                    </div>
                    <div className="visualization-scope">
                        <RankVisualizationScopeButton
                            value="psc"
                            label="PSC"
                            active={this.props.scope === 'psc'}
                            changeScope={this.props.changeScope} />
                        <RankVisualizationScopeButton
                            value="naics"
                            label="NAICS"
                            active={this.props.scope === 'naics'}
                            changeScope={this.props.changeScope} />
                    </div>
                </div>
            </RankVisualizationSection>
        );
    }
}

SpendingByIndustryCodeSection.propTypes = propTypes;
