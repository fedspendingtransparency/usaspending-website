import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Button } from 'data-transparency-ui';
import { Check } from 'components/sharedComponents/icons/Icons';
import FeatureFlag from '../FeatureFlag';


const propTypes = {
    spendingLevel: PropTypes.string,
    onToggle: PropTypes.func
};

const AwardTypeToggle = ({
    spendingLevel,
    onToggle
}) => {
    const [selected, setSelected] = useState(spendingLevel);
    const nonGroup = spendingLevel === "transactions" ? "transactions" : "subawards";
    // const dispatch = useDispatch();

    const onToggleClick = (type) => {
        setSelected(type);
        if (onToggle) {
            onToggle();
        }
    };


    return (
        <FeatureFlag>
            <div className="award-type-toggle" >
                <Button
                    onClick={() => onToggleClick(nonGroup)}
                    buttonSize="sm"
                    buttonType={selected === nonGroup ? "primaryIcon" : "secondary"}
                    backgroundColor="light"
                    imageAlignment="left"
                    buttonTitle={selected !== "transactions" ? "Subawards Only" : "Transactions Only"}
                    copy={selected !== "transactions" ? "Subawards Only" : "Transactions Only"}
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
        </FeatureFlag>
    );
};

AwardTypeToggle.propTypes = propTypes;
export default AwardTypeToggle;
