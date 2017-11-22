/**
  * CFDASearchContainer.jsx
  * Created by Emily Gullo 07/10/2017
  **/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as searchFilterActions from 'redux/actions/search/searchFilterActions';

import CFDASearch from 'components/search/filters/cfda/CFDASearch';

const propTypes = {
    updateSelectedCFDA: PropTypes.func
};

const ga = require('react-ga');

export class CFDASearchContainer extends React.Component {
    static logCFDAFilterEvent(place) {
        ga.event({
            category: 'Search Page Filter Applied',
            action: `Applied CFDA Filter`,
            label: place.toLowerCase()
        });
    }

    constructor(props) {
        super(props);

        // Bind functions
        this.selectCFDA = this.selectCFDA.bind(this);
        this.removeCFDA = this.removeCFDA.bind(this);
    }

    selectCFDA(cfda, isValid) {
        // If cfda exists and is valid
        if (cfda !== null && isValid) {
            const updateParams = {};
            updateParams.cfda = cfda;
            this.props.updateSelectedCFDA(updateParams);

            // Analytics
            CFDASearchContainer.logCFDAFilterEvent(cfda.program_number);
        }
    }

    removeCFDA(cfda) {
        const updateParams = {};
        updateParams.cfda = cfda;
        this.props.updateSelectedCFDA(updateParams);
    }

    render() {
        return (
            <CFDASearch
                {...this.props}
                selectCFDA={this.selectCFDA}
                removeCFDA={this.removeCFDA} />
        );
    }
}

CFDASearchContainer.propTypes = propTypes;

export default connect(
    (state) => ({ selectedCFDA: state.filters.selectedCFDA }),
    (dispatch) => bindActionCreators(searchFilterActions, dispatch)
)(CFDASearchContainer);
