/**
 * AwardIDSearch.jsx
 * Created by michaelbray on 3/2/17.
 */

import React from 'react';
import PropTypes from 'prop-types';
import IndividualSubmit from 'components/search/filters/IndividualSubmit';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SelectedAwardIDs from './SelectedAwardIDs';

const propTypes = {
    toggleAwardID: PropTypes.func,
    selectedAwardIDs: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

export default class AwardIDSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            awardID: ''
        };

        this.changedInput = this.changedInput.bind(this);
        this.applyAwardID = this.applyAwardID.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.dirtyFilters && prevProps.dirtyFilters !== this.props.dirtyFilters) {
            if (this.hint) {
                this.hint.showHint();
            }
        }
    }

    changedInput(e) {
        this.setState({ awardID: e.target.value });
    }

    applyAwardID(e) {
        e.preventDefault();
        this.props.toggleAwardID(this.state.awardID.toUpperCase());
        this.setState({
            awardID: ''
        });
    }

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
                    <form
                        className="award-id-filter-item-wrap"
                        onSubmit={this.applyAwardID}>
                        <input
                            id="search"
                            type="text"
                            className="award-id-input"
                            placeholder="PIID, FAIN, or URI"
                            value={this.state.awardID}
                            onChange={this.changedInput} />
                        <IndividualSubmit
                            className="award-id-submit"
                            onClick={this.applyAwardID}
                            label="Filter by award ID" />
                    </form>
                    {selectedAwardIDs}
                    <SubmitHint
                        ref={(component) => {
                            this.hint = component;
                        }} />
                </div>
            </div>
        );
    }
}

AwardIDSearch.propTypes = propTypes;
