/**
 * StateCFDASearch.jsx
 * Created by Nick Torres 8/13/2024
 **/

import React from 'react';
import PropTypes from 'prop-types';

import StateCFDAListContainer from "./StateCFDAListContainer";
import SubmitHint from '../../../sharedComponents/filterSidebar/SubmitHint';
import SelectedCFDA from "../../../search/filters/cfda/SelectedCFDA";

const propTypes = {
    selectCFDA: PropTypes.func,
    removeCFDA: PropTypes.func,
    selectedCFDA: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

export default class StateCFDASearch extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

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
                    <StateCFDAListContainer {...this.props} selectCFDA={this.props.selectCFDA} />
                    {selectedCFDA}
                    <SubmitHint
                        ref={(component) => {
                            this.hint = component;
                        }} />
                </div>
            </div>
        );
    }
}

StateCFDASearch.propTypes = propTypes;
