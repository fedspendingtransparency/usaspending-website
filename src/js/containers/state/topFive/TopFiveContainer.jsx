/**
 * TopFiveContainer.jsx
 * Created by Kevin Li 5/15/18
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as SearchHelper from 'helpers/searchHelper';
import BaseStateCategoryResult from 'models/v2/state/BaseStateCategoryResult';

import TopFive from 'components/state/topFive/TopFive';

const propTypes = {
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
        if (prevProps.code !== this.props.code) {
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
        };
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
                this.parseResults(res.data.results, res.data.category);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    console.log(err);
                    this.setState({
                        loading: false,
                        error: true
                    });
                }
            });
    }

    parseResults(data, type) {
        const parsed = data.map((item, index) => {
            const result = Object.create(BaseStateCategoryResult);
            result.populate(item, index + 1);

            // use a special naming template for DUNS
            if (type === 'recipient_duns') {
                result.nameTemplate = (code, name) => {
                    if (code) {
                        return `${name} (${code})`;
                    }
                    return name;
                };
            }
            else if (type === 'awarding_agency' || type === 'awarding_subagency') {
                result.nameTemplate = (code, name) => {
                    if (code) {
                        return `${name} (${code})`;
                    }
                    return name;
                };
            }
            else if (type === 'county' || type === 'district') {
                result.nameTemplate = (code, name) => (name);
            }

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
                category={this.props.category}
                total={this.props.total}
                {...this.state} />
        );
    }
}


export default connect(
    (state) => ({
        code: state.stateProfile.overview.code,
        total: state.stateProfile.overview._totalAmount
    })
)(TopFiveContainer);

TopFiveContainer.propTypes = propTypes;
