/**
 * SummaryBar.jsx
 * Created by David 10/5/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { startCase } from 'lodash';

import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';

const propTypes = {
    selectedAward: PropTypes.object
};

export default class SummaryBar extends React.Component {
    render() {
        const award = this.props.selectedAward;
        let category = startCase(award.category);
        if (category === 'Idv') {
            category = 'Contract';
        }
        return (
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1} id="main-focus">
                        {category}&nbsp;Summary
                    </h1>
                </div>
            </StickyHeader>
        );
    }
}

SummaryBar.propTypes = propTypes;
