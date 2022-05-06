/**
 * AccountObjectClassContainer.jsx
 * Created by Kevin Li 3/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as accountFilterActions from 'redux/actions/account/accountFilterActions';

import * as AccountHelper from 'apis/account';

import ObjectClassFilter from 'components/account/filters/objectClass/ObjectClassFilter';

const propTypes = {
    accountId: PropTypes.number,
    toggleObjectClass: PropTypes.func,
    setAvailableObjectClasses: PropTypes.func,
    bulkObjectClassesChange: PropTypes.func
};

export class AccountObjectClassContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            available: []
        };

        this.availableRequest = null;

        // bind functions
        this.updateFilter = this.updateFilter.bind(this);
        this.updateMajorFilter = this.updateMajorFilter.bind(this);
    }

    componentDidMount() {
        this.loadAvailableOCs(this.props.accountId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.accountId !== this.props.accountId) {
            this.loadAvailableOCs(this.props.accountId);
        }
    }

    loadAvailableOCs(id) {
        if (this.availableRequest) {
            this.availableRequest.cancel();
        }

        this.setState({
            loading: true,
            error: false
        });

        this.availableRequest = AccountHelper.fetchAvailableObjectClasses(id);
        this.availableRequest.promise
            .then((res) => {
                this.parseAvailableOCs(res.data.results);
                this.setState({
                    loading: false,
                    error: false
                });
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    this.availableRequest = null;
                    console.log(err);
                    this.setState({
                        loading: false,
                        error: true
                    });
                }
            });
    }

    parseAvailableOCs(data) {
        const definitions = {};
        const children = {};
        data.forEach((major) => {
            definitions[`${major.id}`] = major.name;
            const childIds = [];
            major.minor_object_class.forEach((minor) => {
                definitions[`${minor.id}`] = minor.name;
                childIds.push(`${minor.id}`);
            });

            children[`${major.id}`] = childIds;
        });

        this.props.setAvailableObjectClasses({
            definitions,
            children,
            values: data
        });
    }

    updateFilter(code) {
        this.props.toggleObjectClass(code.value);
    }

    updateMajorFilter(action) {
        this.props.bulkObjectClassesChange(action);
    }

    render() {
        return (
            <ObjectClassFilter
                {...this.props}
                updateMajorFilter={this.updateMajorFilter}
                updateFilter={this.updateFilter} />
        );
    }
}

AccountObjectClassContainer.propTypes = propTypes;

export default connect(
    (state) => ({
        accountId: state.account.account.id,
        selectedCodes: state.account.filters.objectClass,
        availableObjectClasses: state.account.filterOptions.objectClass
    }),
    (dispatch) => bindActionCreators(accountFilterActions, dispatch)
)(AccountObjectClassContainer);
