/**
 * SummaryBar.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { startCase } from 'lodash';

import StickyHeader from 'components/sharedComponents/stickyHeader/StickyHeader';
import InfoSnippet from './InfoSnippet';

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
        const id = award.id;
        let parentSnippet = null;
        if (category === 'Contract') {
            const parent = award.parentAwardDetails.piid;
            parentSnippet = (
                <InfoSnippet
                    label="Parent Award ID"
                    value={parent} />
            );
        }

        return (
            <StickyHeader>
                <div className="sticky-header__title">
                    <h1 tabIndex={-1} id="main-focus">
                        {category}&nbsp;Summary
                    </h1>
                </div>
                <div className="sticky-header__options">
                    <div className="summary-status">
                        <ul className="summary-status-items">
                            <InfoSnippet
                                label="Award ID"
                                value={id} />
                            {parentSnippet}
                        </ul>
                    </div>
                </div>
            </StickyHeader>
        );
    }
}

SummaryBar.propTypes = propTypes;
