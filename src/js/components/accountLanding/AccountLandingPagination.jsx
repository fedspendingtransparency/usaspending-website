/**
 * AccountLandingPagination.jsx
 * Created by Lizzie Salita 8/11/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onChangePage: PropTypes.func.isRequired,
    pager: PropTypes.object
};

export default class AccountLandingPagination extends React.Component {
    setPage(page) {
        this.props.onChangePage(page, (page > 0 && page <= this.props.pager.totalPages));
    }

    render() {
        const pager = this.props.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button onClick={() => this.setPage(pager.currentPage - 1)}>{`<`}</button>
                </li>
                {pager.firstButton}
                {pager.prevEllipses}
                {pager.pages.map((page, index) => (
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <button onClick={() => this.setPage(page)}>{page}</button>
                    </li>
                ))}
                {pager.nextEllipses}
                {pager.lastButton}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button onClick={() => this.setPage(pager.currentPage + 1)}>{`>`}</button>
                </li>
            </ul>
        );
    }
}

AccountLandingPagination.propTypes = propTypes;
