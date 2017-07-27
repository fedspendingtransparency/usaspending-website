/**
 * PSCSearch.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import PSCListContainer from 'containers/search/filters/psc/PSCListContainer';
import SelectedPSC from './SelectedPSC';

const propTypes = {
    selectPSC: PropTypes.func,
    removePSC: PropTypes.func,
    selectedPSC: PropTypes.object
};

export default class PSCSearch extends React.Component {
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
                    <p>Product/Service Code (PSC)</p>
                    <PSCListContainer {...this.props} selectPSC={this.props.selectPSC} />
                    {selectedPSC}
                </div>
            </div>
        );
    }
}

PSCSearch.propTypes = propTypes;
