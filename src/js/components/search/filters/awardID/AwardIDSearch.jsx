/**
 * AwardIDSearch.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';

import AwardIDListContainer from 'containers/search/filters/awardID/AwardIDListContainer';
import SelectedAwardIDs from './SelectedAwardIDs';

const propTypes = {
    toggleAwardID: PropTypes.func,
    selectedAwardIDs: PropTypes.object
};

export default class AwardIDSearch extends React.Component {
    render() {
        let selectedAwardIDs = null;
        if (this.props.selectedAwardIDs.size > 0) {
            selectedAwardIDs = (<SelectedAwardIDs
                selectedAwardIDs={this.props.selectedAwardIDs}
                toggleAwardID={this.props.toggleAwardID} />);
        }

        return (
            <div className="award-id-filter">
                <div className="filter-item-wrap">
                    <AwardIDListContainer
                        {...this.props}
                        toggleAwardID={this.props.toggleAwardID} />
                    {selectedAwardIDs}
                </div>
            </div>
        );
    }
}

AwardIDSearch.propTypes = propTypes;
