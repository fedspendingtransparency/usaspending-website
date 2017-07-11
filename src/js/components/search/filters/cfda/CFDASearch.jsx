/**
 * CFDASearch.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';

import CFDAListContainer from 'containers/search/filters/cfda/CFDAListContainer';
import SelectedCFDA from './SelectedCFDA';

const propTypes = {
    selectCFDA: React.PropTypes.func,
    removeCFDA: React.PropTypes.func,
    selectedCFDA: React.PropTypes.object
};

export default class LocationSearch extends React.Component {
    render() {
        let selectedLocations = null;
        if (this.props.selectedCFDA.size > 0) {
            selectedLocations = (<SelectedCFDA
                selectedLocations={this.props.selectedCFDA}
                removeLocation={this.props.removeCFDA} />);
        }

        return (
            <div className="location-filter">
                <div className="filter-item-wrap">
                    <CFDAListContainer {...this.props} selectLocation={this.props.selectCFDA} />
                    {selectedLocations}
                </div>
            </div>
        );
    }
}

CFDASearch.propTypes = propTypes;
