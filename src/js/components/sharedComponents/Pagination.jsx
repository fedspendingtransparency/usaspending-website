/**
 * Pagination.jsx
 * Created by Lizzie Salita 10/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    onChangePage: PropTypes.func.isRequired,
    pager: PropTypes.object
};

export default class Pagination extends React.Component {
    setPage(page) {
        this.props.onChangePage(page, (page > 0 && page <= this.props.pager.totalPages));
    }

    render() {
        const pager = this.props.pager;

        const rangeStart = ((pager.currentPage - 1) * pager.pageSize) + 1;
        let rangeEnd = pager.currentPage * (pager.pageSize);
        if (pager.currentPage === pager.endPage) {
            rangeEnd = pager.totalItems;
        }
        const resultsText = `${rangeStart}-${rangeEnd} of ${pager.totalItems} results`;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <div className="pagination">
                <div className="results-text">
                    {resultsText}
                </div>
                <ul className="pager">
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <button onClick={() => this.setPage(pager.currentPage - 1)}>{`<`}</button>
                    </li>
                    {pager.firstButton}
                    {pager.prevEllipses}
                    {pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <button onClick={() => this.setPage(page)}>{page}</button>
                        </li>
                    )}
                    {pager.nextEllipses}
                    {pager.lastButton}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <button onClick={() => this.setPage(pager.currentPage + 1)}>{`>`}</button>
                    </li>
                </ul>
            </div>
        );
    }
}

Pagination.propTypes = propTypes;
