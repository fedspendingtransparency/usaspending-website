/**
 * StateCFDASearch.jsx
 * Created by Nick Torres 8/13/2024
 **/

import React from 'react';
import PropTypes from 'prop-types';
import StateCFDAListContainer from "./StateCFDAListContainer";

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
        return (
            <div className="cfda-filter">
                <div className="filter-item-wrap">
                    <StateCFDAListContainer {...this.props} selectCFDA={this.props.selectCFDA} />
                </div>
            </div>
        );
    }
}

StateCFDASearch.propTypes = propTypes;
