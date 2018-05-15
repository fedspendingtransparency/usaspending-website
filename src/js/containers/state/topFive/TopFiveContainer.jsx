/**
 * TopFiveContainer.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as StateHelper from 'helpers/stateHelper';

import TopFive from 'components/state/topFive/TopFive';

const propTypes = {
    stateId: PropTypes.string
};

export class TopFiveContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            results: []
        };
    }

    componentDidMount() {
        this.loadCategory('awarding_agency');
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stateId !== this.props.stateId) {
            this.loadCategory('awarding_agency');
        }
    }

    loadCategory(type) {
        if (!this.props.stateId) {
            return;
        }

        StateHelper.fetchTopFive(this.props.stateId, type);
    }

    render() {
        return (
            <TopFive
                {...this.props} />
        );
    }
}


export default connect(
    (state) => ({
        stateId: state.stateProfile.overview.id

    })
)(TopFiveContainer);

TopFiveContainer.propTypes = propTypes;
