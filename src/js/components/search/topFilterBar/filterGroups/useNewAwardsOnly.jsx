/**
 * useNewAwardsOnly.jsx
 * Created by Brian Petway 07/10/2023
 */
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { updateNewAwardsOnlySelected } from "../../../../redux/actions/search/searchFilterActions";

const propTypes = { name: PropTypes.string };

const useNewAwardsOnly = () => {
    const dispatch = useDispatch();
    const newAwards = useSelector((state) => state.filters.filterNewAwardsOnlySelected);
    const newAwardsApplied = useSelector(
        (state) => state.appliedFilters.filters.filterNewAwardsOnlySelected
    );

    const toggleFilter = (value) => {
        dispatch(updateNewAwardsOnlySelected(!value));
    };

    return newAwardsApplied && {
        value: newAwards,
        title: 'Show New Awards Only',
        toggleFilter,
        staged: newAwards
    };
};

useNewAwardsOnly.propTypes = propTypes;
export default useNewAwardsOnly;
