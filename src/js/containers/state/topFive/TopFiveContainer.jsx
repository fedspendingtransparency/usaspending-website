/**
 * TopFiveContainer.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import BaseStateCategoryResult from 'models/v2/state/BaseStateCategoryResult';

import TopFive from 'components/state/topFive/TopFive';

const propTypes = {
    stateId: PropTypes.string,
    category: PropTypes.string
};

export class TopFiveContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            error: false,
            results: []
        };

        this.request = null;
    }

    componentDidMount() {
        this.loadCategory();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.stateId !== this.props.stateId) {
            this.loadCategory();
        }
    }

    dataParams() {
        return {
            category: this.props.category,
            
        }
    }

    loadCategory() {
        if (!this.props.stateId) {
            return;
        }

        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        const params = {

        };

        this.request = SearchHelper.performSpendingByCategorySearch(params);
        this.request.promise
            .then((res) => {
                this.parseResults(res.data.results);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.setState({
                        loading: false,
                        error: true
                    });
                }
            })
    }

    parseResults(data) {
        const parsed = data.map((item, index) => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate(item, index + 1);
            return result;
        });
        this.setState({
            loading: false,
            error: false,
            results: parsed
        });
    }

    render() {
        return (
            <TopFive
                {...this.props}
                results={this.state.results} />
        );
    }
}


export default connect(
    (state) => ({
        stateId: state.stateProfile.overview.id,
        total: state.stateProfile.overview._totalAmount
    })
)(TopFiveContainer);

TopFiveContainer.propTypes = propTypes;
