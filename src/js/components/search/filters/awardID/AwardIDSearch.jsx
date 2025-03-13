/**
 * AwardIDSearch.jsx
 * Created by michaelbray on 3/2/17.
 */

import React, { useEffect, useState } from 'react';
import { Button } from 'data-transparency-ui';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import PropTypes from 'prop-types';
import { usePrevious } from '../../../../helpers';
import SelectedAwardIDs from './SelectedAwardIDs';

const propTypes = {
    toggleAwardID: PropTypes.func,
    selectedAwardIDs: PropTypes.object,
    dirtyFilters: PropTypes.symbol,
    searchV2: PropTypes.bool
};

const AwardIDSearch = (props) => {
    const { toggleAwardID, selectedAwardIDs, dirtyFilters } = props;

    const [awardID, setAwardID] = useState('');
    const [hint, setHint] = useState(null);
    const prevDirtyFilters = usePrevious(dirtyFilters);

    useEffect(() => {
        if (dirtyFilters && prevDirtyFilters !== dirtyFilters) {
            if (hint) {
                hint.showHint();
            }
        }
    }, [dirtyFilters, prevDirtyFilters, hint]);

    const inputChangeHandler = (e) => {
        setAwardID(e.target.value);
    };

    const applyAwardID = (e) => {
        e.preventDefault();
        toggleAwardID(awardID.toUpperCase());
        setAwardID('');
    };

    const renderSelectedAwardIDs = () => {
        if (selectedAwardIDs.size > 0) {
            return (
                <SelectedAwardIDs
                    selectedAwardIDs={selectedAwardIDs}
                    toggleAwardID={toggleAwardID} />);
        }
        return null;
    };

    return (
        <div className="award-id-filter">
            <div className="filter-item-wrap">
                <div className="award-id-filter-description">
                    Search for an individual ID or a comma-separated list of multiple IDs
                </div>
                <form
                    className="award-id-filter__form"
                    onSubmit={applyAwardID}>
                    <div className="award-id-filter__text-field-wrapper">
                        <input
                            id="search"
                            type="text"
                            className="award-id-filter__text-field"
                            placeholder="Search for an ID..."
                            value={awardID}
                            onChange={inputChangeHandler} />
                    </div>
                    <Button
                        additionalClassnames="award-id-filter__add-button"
                        copy="Add"
                        buttonTitle="Filter by award ID"
                        buttonSize="sm"
                        buttonType="primary"
                        backgroundColor="light"
                        onClick={applyAwardID} />
                </form>

                {renderSelectedAwardIDs()}

                { !props.searchV2 &&
                    <SubmitHint
                        ref={(component) => {
                            setHint(component);
                        }} />
                }
            </div>
        </div>
    );
};

AwardIDSearch.propTypes = propTypes;
export default AwardIDSearch;
