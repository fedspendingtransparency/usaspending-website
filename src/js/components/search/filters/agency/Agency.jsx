/**
 * Agency.jsx
 * Created by Emily Gullo 12/22/2016
 **/

import React from 'react';
import PropTypes from 'prop-types';
import AgencyListContainer from 'containers/search/filters/AgencyListContainer';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';

import SelectedAgencies from './SelectedAgencies';

const defaultProps = {
    agencyTypes: [
        "Awarding",
        "Funding"
    ]
};

const propTypes = {
    toggleAgency: PropTypes.func,
    selectedAwardingAgencies: PropTypes.object,
    selectedFundingAgencies: PropTypes.object,
    agencyTypes: PropTypes.array,
    dirtyFunding: PropTypes.symbol,
    dirtyAwarding: PropTypes.symbol
};

export default class Agency extends React.Component {
    componentDidUpdate(prevProps) {
        let showHint = false;
        if (this.props.dirtyFunding && prevProps.dirtyFunding !== this.props.dirtyFunding) {
            showHint = true;
        }
        else if (this.props.dirtyAwarding && prevProps.dirtyAwarding !== this.props.dirtyAwarding) {
            showHint = true;
        }

        if (showHint && this.hint) {
            this.hint.showHint();
        }
    }

    render() {
        const agencies = this.props.agencyTypes.map((type) => {
            let selectedAgencies = {};

            if (type === 'Funding') {
                selectedAgencies = this.props.selectedFundingAgencies;
            }
            else {
                selectedAgencies = this.props.selectedAwardingAgencies;
            }

            return (
                <div className="filter-item-wrap" key={`holder-${type}`}>
                    <AgencyListContainer
                        agencyType={type}
                        toggleAgency={this.props.toggleAgency}
                        selectedAgencies={selectedAgencies} />
                    <SelectedAgencies
                        agencyType={type}
                        selectedAgencies={selectedAgencies}
                        toggleAgency={this.props.toggleAgency} />
                    <SubmitHint
                        ref={(component) => {
                            this.hint = component;
                        }} />
                </div>
            );
        });

        return (
            <div className="agency-filter">
                {agencies}
            </div>
        );
    }
}

Agency.propTypes = propTypes;
Agency.defaultProps = defaultProps;
