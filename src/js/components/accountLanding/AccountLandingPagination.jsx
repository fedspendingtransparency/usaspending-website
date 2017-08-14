/**
 * AccountLandingPagination.jsx
 * Created by Lizzie Salita 8/11/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';

const propTypes = {
    items: PropTypes.array.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
};

const defaultProps = {
    initialPage: 1
};

export default class AccountLandingPagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pager: {} };
    }

    componentWillMount() {
        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }
    }

    componentDidUpdate(prevProps) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        const items = this.props.items;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, 3);

        // get new page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager(totalItems, currentPage, pageSize) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage;
        let endPage;
        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        }
        else if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        }
        else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        }
        else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + (pageSize - 1), (totalItems - 1));

        // create an array of pages to repeat in the pager control
        const pages = range(startPage, endPage + 1);

        // return object with all pager properties
        return {
            totalItems,
            currentPage,
            pageSize,
            totalPages,
            startPage,
            endPage,
            startIndex,
            endIndex,
            pages
        };
    }

    render() {
        const pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <ul className="pagination">
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button onClick={() => this.setPage(1)}>First</button>
                </li>
                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <button onClick={() => this.setPage(pager.currentPage - 1)}>Previous</button>
                </li>
                {pager.pages.map((page, index) =>
                    <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                        <button onClick={() => this.setPage(page)}>{page}</button>
                    </li>
                )}
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button onClick={() => this.setPage(pager.currentPage + 1)}>Next</button>
                </li>
                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <button onClick={() => this.setPage(pager.totalPages)}>Last</button>
                </li>
            </ul>
        );
    }
}

AccountLandingPagination.propTypes = propTypes;
AccountLandingPagination.defaultProps = defaultProps;
