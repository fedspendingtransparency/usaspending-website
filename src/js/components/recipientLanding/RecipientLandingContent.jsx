/**
 * RecipientLandingContent.jsx
 * Created by David Trinh 7/2/18
 */

import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'components/sharedComponents/Pagination';

const propTypes = {
    results: PropTypes.array,
    accountSearchString: PropTypes.string,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    columns: PropTypes.array,
    setAccountSearchString: PropTypes.func,
    onChangePage: PropTypes.func,
    pageNumber: PropTypes.number,
    totalItems: PropTypes.number,
    pageSize: PropTypes.number,
    order: PropTypes.object,
    updateSort: PropTypes.func
};

export default class RecipientLandingContent extends React.Component {
    render() {
        return (
            <div className="landing-page">
                <div className="landing-page__overview">
                    <h2 className="landing-page__title">
                        Recipient Profiles
                    </h2>
                    <div className="landing-page__description">
                    Recipients are any entity that has received federal money in the form of contracts, grants, loans, or other financial assistance. In our Recipient Profiles, you'll find a snapshot of their relationship to the government, as well as with other non-government partners.
                    </div>
                </div>
                <Pagination
                    onChangePage={this.props.onChangePage}
                    pageNumber={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
                <Pagination
                    onChangePage={this.props.onChangePage}
                    pageNumber={this.props.pageNumber}
                    totalItems={this.props.totalItems}
                    pageSize={this.props.pageSize} />
            </div>
        );
    }
}

RecipientLandingContent.propTypes = propTypes;
