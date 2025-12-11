import React from "react";
import { TooltipWrapper } from "data-transparency-ui";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { updateNewAwardsOnlySelected } from "redux/actions/search/searchFilterActions";
import { NewAwardsTooltip } from "../tooltips/AdvancedSearchTooltip";
import NewTooltip from "./NewTooltip";

const propTypes = { activeClassDR: PropTypes.string };

const NewAwardsFilter = ({ activeClassDR }) => {
    const {
        filterNewAwardsOnlySelected, filterNewAwardsOnlyActive
    } = useSelector((state) => state.filters);
    const spendingLevel = useSelector((state) => state.searchView.spendingLevel);
    const dispatch = useDispatch();

    const newAwardsClick = (e) => {
        dispatch(updateNewAwardsOnlySelected(e.target.checked));
    };

    const enterKeyToggleHandler = (e) => {
        if (e.key === 'Enter') {
            const isSelected = !filterNewAwardsOnlySelected;
            dispatch(updateNewAwardsOnlySelected(isSelected));
        }
    };

    const isSubAward = spendingLevel === "subawards";
    const checkboxClassname = `new-awards-checkbox ${
        isSubAward || !filterNewAwardsOnlyActive ? 'not-active' : ''
    }`;
    const spanClassname = `new-awards-label ${
        isSubAward || !filterNewAwardsOnlyActive ? 'not-active' : ''
    }`;

    return (
        (
            <div className={`new-awards-wrapper ${activeClassDR}`}>
                <label htmlFor="new-awards-checkbox">
                    <input
                        type="checkbox"
                        className={checkboxClassname}
                        id="new-awards-checkbox"
                        value="new-awards-checkbox"
                        disabled={isSubAward || !filterNewAwardsOnlyActive}
                        checked={filterNewAwardsOnlySelected && !isSubAward}
                        onChange={newAwardsClick}
                        onKeyUp={(e) => enterKeyToggleHandler(e)} />
                    <span className={spanClassname}>
                        Show New Awards Only
                    </span>
                </label>
                <TooltipWrapper
                    icon="info"
                    tooltipComponent={<NewAwardsTooltip />} />
                <NewTooltip tooltipComponent={<NewAwardsTooltip />} />
            </div>
        )
    );
};

NewAwardsFilter.propTypes = propTypes;
export default NewAwardsFilter;
