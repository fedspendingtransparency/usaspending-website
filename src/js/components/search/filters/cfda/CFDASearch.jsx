/**
 * CFDASearch.jsx
 * Created by Emily Gullo 07/10/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import CFDAListContainer from 'containers/search/filters/cfda/CFDAListContainer';
import SelectedCFDA from './SelectedCFDA';

const propTypes = {
    selectCFDA: PropTypes.func,
    removeCFDA: PropTypes.func,
    selectedCFDA: PropTypes.object
};

export default class CFDASearch extends React.Component {
    render() {
        let selectedCFDA = null;
        if (this.props.selectedCFDA.size > 0) {
            selectedCFDA = (<SelectedCFDA
                selectedCFDA={this.props.selectedCFDA}
                removeCFDA={this.props.removeCFDA} />);
        }

        return (
            <div className="cfda-filter">
                <div className="filter-item-wrap">
                    <CFDAListContainer {...this.props} selectCFDA={this.props.selectCFDA} />
                    {selectedCFDA}
                </div>
            </div>
        );
    }
}

CFDASearch.propTypes = propTypes;
