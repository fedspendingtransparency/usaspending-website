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
    id: PropTypes.string,
    code: PropTypes.string,
    total: PropTypes.number,
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
        if (prevProps.id !== this.props.id) {
            this.loadCategory();
        }
    }

    dataParams() {
        return {
            category: this.props.category,
            filters: {
                place_of_performance_scope: 'domestic',
                place_of_performance_locations: [
                    {
                        country: 'USA',
                        state: this.props.code
                    }
                ]
            },
            limit: 5,
            page: 1
        }
    }

    loadCategory() {
        if (!this.props.code) {
            this.setState({
                loading: false,
                error: true
            });
            return;
        }

        if (this.request) {
            this.request.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        this.request = SearchHelper.performSpendingByCategorySearch(this.dataParams());
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
        id: state.stateProfile.overview.id,
        code: state.stateProfile.overview.code,
        total: state.stateProfile.overview._totalAmount
    })
)(TopFiveContainer);

TopFiveContainer.propTypes = propTypes;
