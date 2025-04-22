import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { Button } from 'data-transparency-ui';
import { Check } from 'components/sharedComponents/icons/Icons';
// import Analytics from 'helpers/analytics/Analytics';
import { setSearchViewSubaward, setSpendingLevel } from "redux/actions/search/searchViewActions";


const propTypes = {
    spendingLevel: PropTypes.string
    // onToggle: PropTypes.func,
    // classname: PropTypes.string
};

const AwardTypeToggle = ({
    spendingLevel
}) => {
    // Subawards Only
    // Transactions Only
    // Grouped by Prime Awards
    const [selected, setSelected] = useState(spendingLevel);
    // const dispatch = useDispatch();
    const onToggle = (e) => {
        e.preventDefault();
        console.log(e);
        // dispatch(setSearchViewSubaward(e === 'subawards'));
        // dispatch(setSpendingLevel(e));
        setSelected(e);

        // if (e === 'subawards') {
        //     Analytics.event({
        //         event: 'search_subaward_dropdown',
        //         category: 'Advanced Search - Search Fields',
        //         action: 'Subawards Search',
        //         gtm: true
        //     });
        // }
    };


    return (
        <div className="award-type-toggle" >
            <Button
                onClick={ () => onToggle()}
                buttonSize="sm"
                buttonType={selected !== "awards" ? "primaryIcon" : "secondary"}
                backgroundColor="light"
                buttonTitle={selected !== "transactions" ? "Subawards Only" : "Transactions Only"}
                copy={selected !== "transactions" ? "Subawards Only" : "Transactions Only"}
                additionalClassnames={selected === "awards" ? "borderless" : ""}
                image={<Check alt="check" />} />
            <Button
                onClick={onToggle}
                buttonSize="sm"
                buttonType={selected === 'awards' ? "primaryIcon" : 'secondary'}
                backgroundColor="light"
                buttonTitle="Grouped by Prime Awards"
                copy="Grouped by Prime Awards"
                additionalClassnames={selected === "awards" ? "" : "borderless"}
                image={<Check alt="check" />} />
        </div>
    );
};

AwardTypeToggle.propTypes = propTypes;
export default AwardTypeToggle;
