/**
 * Pagination.jsx
 * Created by Lizzie Salita 10/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { range } from 'lodash';

const propTypes = {
    onChangePage: PropTypes.func.isRequired,
    pageNumber: PropTypes.number,
    totalItems: PropTypes.number,
    pageSize: PropTypes.number
};

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.getPager = this.getPager.bind(this);
        this.setPage = this.setPage.bind(this);
        this.generatePageButtons = this.generatePageButtons.bind(this);
    }

    getPager() {
        const totalItems = this.props.totalItems;
        const currentPage = this.props.pageNumber;
        const pageSize = this.props.pageSize;

        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage;
        let endPage;
        let prevEllipses = (<span className="pagination-ellipsis">...</span>);
        let nextEllipses = (<span className="pagination-ellipsis">...</span>);
        let firstButton = (
            <li>
                <button onClick={() => this.setPage(1)}>{1}</button>
            </li>
        );
        let lastButton = (
            <li>
                <button onClick={() => this.setPage(totalPages)}>{totalPages}</button>
            </li>
        );
        if (totalPages < 5) {
            // fewer than 5 total pages, so show all
            startPage = 1;
            endPage = totalPages;
            prevEllipses = '';
            nextEllipses = '';
            firstButton = '';
            lastButton = '';
        }
        else {
            startPage = currentPage - 1;
            endPage = currentPage + 1;

            if (currentPage < 4) {
                prevEllipses = '';
                firstButton = '';
                if (currentPage === 1) {
                    startPage = currentPage;
                    endPage = currentPage + 2;
                }
                else if (currentPage === 3) {
                    startPage = 1;
                    endPage = currentPage;
                }
            }
            else if (currentPage > (totalPages - 3)) {
                nextEllipses = '';
                lastButton = '';
                if (currentPage === totalPages) {
                    startPage = currentPage - 2;
                    endPage = currentPage;
                }
                else if (currentPage === (totalPages - 2)) {
                    startPage = currentPage;
                    endPage = totalPages;
                }
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + (pageSize - 1), (totalItems - 1));

        // create an array of pages to repeat in the pager control
        const pages = range(startPage, endPage + 1);

        // return an object with all pager properties
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages,
            prevEllipses,
            nextEllipses,
            firstButton,
            lastButton
        };
    }

    setPage(page) {
        this.props.onChangePage(page);
    }

    generatePageButtons(pages, totalPages) {
        return (pages.map((page, index) =>
            (<li key={index} className={this.props.pageNumber === page ? 'active' : ''}>
                <button onClick={() => this.setPage(page, totalPages)}>{page}</button>
             </li>)
        ));
    }

    render() {
        const pager = this.getPager();

        const rangeStart = ((pager.currentPage - 1) * pager.pageSize) + 1;
        let rangeEnd = pager.currentPage * (pager.pageSize);
        if (pager.currentPage === pager.endPage) {
            rangeEnd = pager.totalItems;
        }
        const resultsText = `${rangeStart}-${rangeEnd} of ${this.props.totalItems} results`;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }
        const pageButtons = this.generatePageButtons(pager.pages, pager.totalPages);

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
                    {pageButtons}
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
