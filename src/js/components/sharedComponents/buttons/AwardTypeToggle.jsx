import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { Button } from 'data-transparency-ui';
import { Check } from 'components/sharedComponents/icons/Icons';


const propTypes = {
    spendingLevel: PropTypes.string,
    onToggle: PropTypes.func
};

const AwardTypeToggle = ({
    spendingLevel,
    onToggle
}) => {
    const [selected, setSelected] = useState(spendingLevel);
    const nonGroup = useSelector((state) => state.searchView.spendingLevel);

    const onToggleClick = (type) => {
        setSelected(type);
        if (onToggle) {
            onToggle();
        }
    };


    return (
        <div className="award-type-toggle" >
            <Button
                onClick={() => onToggleClick(nonGroup)}
                buttonSize="sm"
                buttonType={selected === nonGroup ? "primaryIcon" : "secondary"}
                backgroundColor="light"
                imageAlignment="left"
                buttonTitle={nonGroup !== "transactions" ? "Subawards Only" : "Transactions Only"}
                copy={nonGroup !== "transactions" ? "Subawards Only" : "Transactions Only"}
                additionalClassnames={selected === "awards" ? "borderless" : ""}
                image={<Check alt="check" />} />
            <Button
                onClick={() => onToggleClick('awards')}
                buttonSize="sm"
                buttonType={selected === 'awards' ? "primaryIcon" : 'secondary'}
                backgroundColor="light"
                imageAlignment="left"
                buttonTitle="Grouped by Prime Awards"
                copy="Grouped by Prime Awards"
                additionalClassnames={selected === "awards" ? "" : "borderless"}
                image={<Check alt="check" />} />
        </div>
    );
};

AwardTypeToggle.propTypes = propTypes;
export default AwardTypeToggle;
