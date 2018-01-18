/**
 * PSCSearch.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import PSCListContainer from 'containers/search/filters/psc/PSCListContainer';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SelectedPSC from './SelectedPSC';

const propTypes = {
    selectPSC: PropTypes.func,
    removePSC: PropTypes.func,
    selectedPSC: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

export default class PSCSearch extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    render() {
        let selectedPSC = null;
        if (this.props.selectedPSC.size > 0) {
            selectedPSC = (<SelectedPSC
                selectedPSC={this.props.selectedPSC}
                removePSC={this.props.removePSC} />);
        }

        return (
            <div className="psc-filter">
                <div className="filter-item-wrap">
                    <PSCListContainer {...this.props} selectPSC={this.props.selectPSC} />
                    {selectedPSC}
                    <SubmitHint
                        ref={(component) => {
                            this.hint = component;
                        }} />
                </div>
            </div>
        );
    }
}

PSCSearch.propTypes = propTypes;
